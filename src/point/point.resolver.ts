import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Root,
  InputType,
  Field,
  Int,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { PointModel } from './point.model.js';
import { ErrorModel } from '../error.model.js';

@InputType()
class PointUniqueInput {
  @Field({ nullable: true })
  id: number;
}

@InputType()
class PointCreateInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  route: string;

  @Field()
  parent: string;

  @Field((type) => Int)
  parentId: number;

  @Field((type) => Boolean, { nullable: true })
  disabled: boolean;
}

@InputType()
class PointUpdateInput {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  route: string;

  @Field((type) => Boolean, { nullable: true })
  disabled: boolean;
}

@Resolver(PointModel)
export class PointResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query((returns) => [PointModel] || ErrorModel, { nullable: true })
  async getAllPoints(@Context() ctx): Promise<PointModel[] | ErrorModel> {
    try {
      return this.prismaService.point.findMany({
        include: {
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

  @Query((returns) => PointModel || ErrorModel, { nullable: true })
  async getPoint(
    @Args('pointUniqueInput') pointUniqueInput: PointUniqueInput,
  ): Promise<PointModel | ErrorModel> {
    try {
      return this.prismaService.point.findUnique({
        where: {
          id: pointUniqueInput.id || undefined,
        },
        include: {
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

  @Mutation((returns) => PointModel || ErrorModel)
  async updatePoint(
    @Args('data') data: PointUpdateInput,
    @Context() ctx,
  ): Promise<PointModel | ErrorModel> {
    try {
      return this.prismaService.point.update({
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

  @Mutation((returns) => PointModel || ErrorModel)
  async deletePoint(
    @Args('id') id: number,
    @Context() ctx,
  ): Promise<PointModel | ErrorModel> {
    try {
      const point = await this.prismaService.point.findUnique({
        where: {
          id: id || undefined,
        },
        include: {
          photos: true,
          videos: true,
          axis: true,
        },
      });
      const errors = [];

      if (point.photos.length > 0) {
        errors.push('Фотографии');
      }
      if (point.videos.length > 0) {
        errors.push('Видео');
      }
      if (point.axis.length > 0) {
        errors.push('Координаты');
      }
      if (errors.length > 0) {
        throw new Error(
          `Для удаления Точки интереса небходимо сначала удалить все объекты из разделов: ${errors.join(
            ', ',
          )}!`,
        );
      }

      return this.prismaService.point.delete({
        where: { id },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => PointModel || ErrorModel)
  async createPoint(
    @Args('data') data: PointCreateInput,
    @Context() ctx,
  ): Promise<PointModel | ErrorModel> {
    try {
      const parent = { [data.parent]: { connect: { id: data.parentId } } };
      return this.prismaService.point.create({
        data: {
          title: data.title || undefined,
          description: data.description || undefined,
          route: data.route || undefined,
          ...parent,
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
