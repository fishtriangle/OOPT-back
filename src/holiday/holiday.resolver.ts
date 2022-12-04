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
import { HolidayModel } from './holiday.model.js';
import { ErrorModel } from '../error.model.js';

@InputType()
class HolidayUniqueInput {
  @Field({ nullable: true })
  id: number;
}

@InputType()
class HolidayCreateInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Int)
  parentId: number;
}

@InputType()
class HolidayUpdateInput {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field((type) => Int)
  parentId: number;
}

@Resolver(HolidayModel)
export class HolidayResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  // @ResolveField()
  // async getPhotos(
  //   @Root() holiday: HolidayModel,
  //   @Context() ctx,
  // ): Promise<PhotoModel[] | ErrorModel> {
  //   try {
  //     return this.prismaService.holiday
  //       .findUnique({
  //         where: {
  //           id: holiday.id,
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
  //   @Root() holiday: HolidayModel,
  //   @Context() ctx,
  // ): Promise<VideoModel[] | ErrorModel> {
  //   try {
  //     return this.prismaService.holiday
  //       .findUnique({
  //         where: {
  //           id: holiday.id,
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
  // getOOPT(@Root() holiday: HolidayModel): Promise<OoptModel | null> {
  //   return this.prismaService.holiday
  //     .findUnique({
  //       where: {
  //         id: holiday.id,
  //       },
  //     })
  //     .belongs();
  // }

  @Query((returns) => [HolidayModel] || ErrorModel, { nullable: true })
  async getAllHolidays(@Context() ctx): Promise<HolidayModel[] | ErrorModel> {
    try {
      return this.prismaService.holiday.findMany({
        include: {
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

  @Query((returns) => HolidayModel || ErrorModel, { nullable: true })
  async getHoliday(
    @Args('holidayUniqueInput') holidayUniqueInput: HolidayUniqueInput,
  ): Promise<HolidayModel | ErrorModel> {
    try {
      return this.prismaService.holiday.findUnique({
        where: {
          id: holidayUniqueInput.id || undefined,
        },
        include: {
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

  @Mutation((returns) => HolidayModel || ErrorModel)
  async updateHoliday(
    @Args('data') data: HolidayUpdateInput,
    @Context() ctx,
  ): Promise<HolidayModel | ErrorModel> {
    try {
      return this.prismaService.holiday.update({
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

  @Mutation((returns) => HolidayModel || ErrorModel)
  async deleteHoliday(
    @Args('id') id: number,
    @Context() ctx,
  ): Promise<HolidayModel | ErrorModel> {
    try {
      const holiday = this.prismaService.holiday.findUnique({
        where: {
          id: id || undefined,
        },
        include: {
          photos: true,
          videos: true,
        },
      });
      const errors = [];

      if (holiday.photos) {
        errors.push('Фотографии');
      }
      if (holiday.videos) {
        errors.push('Видео');
      }
      if (errors.length > 0) {
        throw new Error(
          `Для удаления информации о Празнике необходимо сначала удалить все объекты из разделов: ${errors.join(
            ', ',
          )}!`,
        );
      }

      return this.prismaService.holiday.delete({
        where: { id },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => HolidayModel || ErrorModel)
  async createHoliday(
    @Args('data') data: HolidayCreateInput,
    @Context() ctx,
  ): Promise<HolidayModel | ErrorModel> {
    try {
      return this.prismaService.holiday.create({
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
