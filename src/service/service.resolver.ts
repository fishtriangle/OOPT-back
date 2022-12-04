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
import OoptModel from '../oopt/oopt.model.js';
import { PhotoModel } from '../photo/photo.model.js';
import { VideoModel } from '../video/video.model.js';
import { ServiceModel } from './service.model.js';
import { ErrorModel } from '../error.model.js';
import { ContactModel } from '../contact/contact.model.js';

@InputType()
class ServiceUniqueInput {
  @Field({ nullable: true })
  id: number;
}

@InputType()
class ServiceCreateInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Int)
  parentId: number;
}

@InputType()
class ServiceUpdateInput {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Int)
  parentId: number;
}

@Resolver(ServiceModel)
export class ServiceResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  // @ResolveField()
  // async getContact(
  //   @Root() service: ServiceModel,
  //   @Context() ctx,
  // ): Promise<ContactModel[] | ErrorModel> {
  //   try {
  //     return this.prismaService.service
  //       .findUnique({
  //         where: {
  //           id: service.id,
  //         },
  //       })
  //       .contacts();
  //   } catch (e) {
  //     return {
  //       isError: true,
  //       message: e.message,
  //     };
  //   }
  // }
  //
  // @ResolveField()
  // async getPhotos(
  //   @Root() service: ServiceModel,
  //   @Context() ctx,
  // ): Promise<PhotoModel[] | ErrorModel> {
  //   try {
  //     return this.prismaService.service
  //       .findUnique({
  //         where: {
  //           id: service.id,
  //         },
  //       })
  //       .photos();
  //   } catch (e) {
  //     return {
  //       isError: true,
  //       message: e.message,
  //     };
  //   }
  // }
  //
  // @ResolveField()
  // async getVideos(
  //   @Root() service: ServiceModel,
  //   @Context() ctx,
  // ): Promise<VideoModel[] | ErrorModel> {
  //   try {
  //     return this.prismaService.service
  //       .findUnique({
  //         where: {
  //           id: service.id,
  //         },
  //       })
  //       .videos();
  //   } catch (e) {
  //     return {
  //       isError: true,
  //       message: e.message,
  //     };
  //   }
  // }
  //
  // @ResolveField()
  // getOOPT(@Root() service: ServiceModel): Promise<OoptModel | null> {
  //   return this.prismaService.service
  //     .findUnique({
  //       where: {
  //         id: service.id,
  //       },
  //     })
  //     .belongs();
  // }

  @Query((returns) => [ServiceModel] || ErrorModel, { nullable: true })
  async getAllServices(@Context() ctx): Promise<ServiceModel[] | ErrorModel> {
    try {
      return this.prismaService.service.findMany({
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

  @Query((returns) => ServiceModel || ErrorModel, { nullable: true })
  async getService(
    @Args('serviceUniqueInput') serviceUniqueInput: ServiceUniqueInput,
  ): Promise<ServiceModel | ErrorModel> {
    try {
      return this.prismaService.service.findUnique({
        where: {
          id: serviceUniqueInput.id,
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

  @Mutation((returns) => ServiceModel || ErrorModel)
  async updateService(
    @Args('data') data: ServiceUpdateInput,
    @Context() ctx,
  ): Promise<ServiceModel | ErrorModel> {
    try {
      return this.prismaService.service.update({
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

  @Mutation((returns) => ServiceModel || ErrorModel)
  async deleteService(
    @Args('id') id: number,
    @Context() ctx,
  ): Promise<ServiceModel | ErrorModel> {
    try {
      const service = this.prismaService.service.findUnique({
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

      if (service.photos) {
        errors.push('Фотографии');
      }
      if (service.videos) {
        errors.push('Видео');
      }
      if (service.contacts) {
        errors.push('Контактная информация');
      }
      if (errors.length > 0) {
        throw new Error(
          `Для удаления Сервисной компании необходимо сначала удалить все объекты из разделов: ${errors.join(
            ', ',
          )}!`,
        );
      }

      return this.prismaService.service.delete({
        where: { id },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => ServiceModel || ErrorModel)
  async createService(
    @Args('data') data: ServiceCreateInput,
    @Context() ctx,
  ): Promise<ServiceModel | ErrorModel> {
    try {
      return this.prismaService.service.create({
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
