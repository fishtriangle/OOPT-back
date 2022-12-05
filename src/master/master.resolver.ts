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
import { MasterModel } from './master.model.js';
import { ErrorModel } from '../error.model.js';

@InputType()
class MasterUniqueInput {
  @Field({ nullable: true })
  id: number;
}

@InputType()
class MasterCreateInput {
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
class MasterUpdateInput {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Int, { nullable: true })
  parentId: number;

  @Field((type) => Boolean, { nullable: true })
  disabled: boolean;
}

@Resolver(MasterModel)
export class MasterResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query((returns) => [MasterModel] || ErrorModel, { nullable: true })
  async getAllMasters(@Context() ctx): Promise<MasterModel[] | ErrorModel> {
    try {
      return this.prismaService.master.findMany({
        include: {
          contacts: true,
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

  @Query((returns) => MasterModel || ErrorModel, { nullable: true })
  async getMaster(
    @Args('masterUniqueInput') masterUniqueInput: MasterUniqueInput,
  ): Promise<MasterModel | ErrorModel> {
    try {
      return this.prismaService.master.findUnique({
        where: {
          id: masterUniqueInput.id || undefined,
        },
        include: {
          contacts: true,
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

  @Mutation((returns) => MasterModel || ErrorModel)
  async updateMaster(
    @Args('data') data: MasterUpdateInput,
    @Context() ctx,
  ): Promise<MasterModel | ErrorModel> {
    try {
      return this.prismaService.master.update({
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

  @Mutation((returns) => MasterModel || ErrorModel)
  async deleteMaster(
    @Args('id') id: number,
    @Context() ctx,
  ): Promise<MasterModel | ErrorModel> {
    try {
      const master = await this.prismaService.master.findUnique({
        where: {
          id: id || undefined,
        },
        include: {
          photos: true,
          videos: true,
          contacts: true,
        },
      });
      const errors = [];

      if (master.photos.length > 0) {
        errors.push('Фотографии');
      }
      if (master.videos.length > 0) {
        errors.push('Видео');
      }
      if (master.contacts.length > 0) {
        errors.push('Контактная информация');
      }
      if (errors.length > 0) {
        throw new Error(
          `Для удаления информации о Мастере необходимо сначала удалить все объекты из разделов: ${errors.join(
            ', ',
          )}!`,
        );
      }

      return this.prismaService.master.delete({
        where: { id },
      });
    } catch (e) {
      console.error(e);
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => MasterModel || ErrorModel)
  async createMaster(
    @Args('data') data: MasterCreateInput,
    @Context() ctx,
  ): Promise<MasterModel | ErrorModel> {
    try {
      return this.prismaService.master.create({
        data: {
          title: data.title || undefined,
          description: data.description || undefined,
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
