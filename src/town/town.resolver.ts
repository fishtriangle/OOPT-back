import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  InputType,
  Field,
  Int,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { TownModel } from './town.model.js';
import { ErrorModel } from '../error.model.js';

@InputType()
class TownUniqueInput {
  @Field({ nullable: true })
  id: number;
}

@InputType()
class TownCreateInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Int)
  parentId: number;

  @Field((type) => Boolean, { nullable: true })
  disabled: boolean;
}

@InputType()
class TownUpdateInput {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Boolean, { nullable: true })
  disabled: boolean;
}

@Resolver(TownModel)
export class TownResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query((returns) => [TownModel] || ErrorModel, { nullable: true })
  async getAllTowns(@Context() ctx): Promise<TownModel[] | ErrorModel> {
    try {
      return this.prismaService.town.findMany({
        include: {
          points: true,
          axis: true,
          photos: true,
          videos: true,
        },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Query((returns) => TownModel || ErrorModel, { nullable: true })
  async getTown(
    @Args('townUniqueInput') townUniqueInput: TownUniqueInput,
  ): Promise<TownModel | ErrorModel> {
    try {
      return this.prismaService.town.findUnique({
        where: {
          id: townUniqueInput.id || undefined,
        },
        include: {
          points: true,
          axis: true,
          photos: true,
          videos: true,
        },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => TownModel || ErrorModel)
  async updateTown(
    @Args('data') data: TownUpdateInput,
    @Context() ctx,
  ): Promise<TownModel | ErrorModel> {
    try {
      return this.prismaService.town.update({
        where: { id: data.id || undefined },
        data,
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => TownModel || ErrorModel)
  async deleteTown(
    @Args('id') id: number,
    @Context() ctx,
  ): Promise<TownModel | ErrorModel> {
    try {
      const town = await this.prismaService.town.findUnique({
        where: {
          id: id || undefined,
        },
        include: {
          photos: true,
          videos: true,
          axis: true,
          points: true,
        },
      });
      const errors = [];

      if (town.photos.length > 0) {
        errors.push('Фотографии');
      }
      if (town.videos.length > 0) {
        errors.push('Видео');
      }
      if (town.axis.length > 0) {
        errors.push('Координаты');
      }
      if (town.points.length > 0) {
        errors.push('Точки интереса');
      }
      if (errors.length > 0) {
        throw new Error(
          `Для удаления Населенного пункта небходимо сначала удалить все объекты из разделов: ${errors.join(
            ', ',
          )}!`,
        );
      }

      return this.prismaService.town.delete({
        where: { id },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => TownModel || ErrorModel)
  async createTown(
    @Args('data') data: TownCreateInput,
    @Context() ctx,
  ): Promise<TownModel | ErrorModel> {
    try {
      return this.prismaService.town.create({
        data: {
          title: data.title || undefined,
          description: data.description || undefined,
          axis: {
            create: {
              axisX: 0,
              axisY: 0,
              title: '',
            },
          },
          belongs: { connect: { id: data.parentId } },
        },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }
}
