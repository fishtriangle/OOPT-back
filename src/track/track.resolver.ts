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
import OoptModel from '../oopt/oopt.model.js';
import { PhotoModel } from '../photo/photo.model.js';
import { VideoModel } from '../video/video.model.js';
import { PointModel } from '../point/point.model.js';
import { TrackModel } from './track.model.js';
import { AxisModel } from '../axis/axis.model.js';
import { ErrorModel } from '../error.model.js';

@InputType()
class TrackUniqueInput {
  @Field({ nullable: true })
  id: number;
}

@InputType()
class TrackCreateInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  length: string;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  transport: string;

  @Field({ nullable: true })
  timeInTrack: string;

  @Field({ nullable: true })
  season: string;

  @Field({ nullable: true })
  water: string;

  @Field((type) => Int)
  parentId: number;
}

@InputType()
class TrackUpdateInput {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  length: string;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  transport: string;

  @Field({ nullable: true })
  timeInTrack: string;

  @Field({ nullable: true })
  season: string;

  @Field({ nullable: true })
  water: string;
}

@Resolver(TrackModel)
export class TrackResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  // @ResolveField()
  // async getAxises(
  //   @Root() track: TrackModel,
  //   @Context() ctx,
  // ): Promise<AxisModel[] | ErrorModel> {
  //   try {
  //     return this.prismaService.track
  //       .findUnique({
  //         where: {
  //           id: track.id,
  //         },
  //       })
  //       .axises();
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
  //   @Root() track: TrackModel,
  //   @Context() ctx,
  // ): Promise<PhotoModel[] | ErrorModel> {
  //   try {
  //     return this.prismaService.track
  //       .findUnique({
  //         where: {
  //           id: track.id,
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
  //   @Root() track: TrackModel,
  //   @Context() ctx,
  // ): Promise<VideoModel[] | ErrorModel> {
  //   try {
  //     return this.prismaService.track
  //       .findUnique({
  //         where: {
  //           id: track.id,
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
  // async getStops(
  //   @Root() track: TrackModel,
  //   @Context() ctx,
  // ): Promise<PointModel[] | ErrorModel> {
  //   try {
  //     return this.prismaService.track
  //       .findUnique({
  //         where: {
  //           id: track.id,
  //         },
  //       })
  //       .stops();
  //   } catch (e) {
  //     return {
  //       isError: true,
  //       message: e.message,
  //     };
  //   }
  // }
  //
  // @ResolveField()
  // getOopt(@Root() track: TrackModel): Promise<OoptModel | null> {
  //   return this.prismaService.track
  //     .findUnique({
  //       where: {
  //         id: track.id,
  //       },
  //     })
  //     .oopt();
  // }

  @Query((returns) => [TrackModel] || ErrorModel, { nullable: true })
  async getAllTracks(@Context() ctx): Promise<TrackModel[] | ErrorModel> {
    try {
      return this.prismaService.track.findMany({
        include: {
          axises: true,
          photos: true,
          videos: true,
          stops: true,
        },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Query((returns) => TrackModel || ErrorModel, { nullable: true })
  async getTrack(
    @Args('trackUniqueInput') trackUniqueInput: TrackUniqueInput,
  ): Promise<TrackModel | ErrorModel> {
    try {
      console.log('1');
      return this.prismaService.track.findUnique({
        where: {
          id: trackUniqueInput.id || undefined,
        },
        include: {
          axises: true,
          photos: true,
          videos: true,
          stops: true,
        },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => TrackModel || ErrorModel)
  async updateTrack(
    @Args('data') data: TrackUpdateInput,
    @Context() ctx,
  ): Promise<TrackModel | ErrorModel> {
    try {
      return this.prismaService.track.update({
        where: { id: data.id || undefined },
        data: {
          title: data.title || undefined,
          description: data.description || undefined,
          length: data.length || undefined,
          type: data.type || undefined,
          transport: data.transport || undefined,
          timeInTrack: data.timeInTrack || undefined,
          season: data.season || undefined,
          water: data.water || undefined,
        },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => TrackModel || ErrorModel)
  async deleteTrack(
    @Args('id') id: number,
    @Context() ctx,
  ): Promise<TrackModel | ErrorModel> {
    try {
      const track = this.prismaService.track.findUnique({
        where: {
          id: id || undefined,
        },
        include: {
          photos: true,
          videos: true,
          axises: true,
          stops: true,
        },
      });
      const errors = [];

      if (track.photos) {
        errors.push('Фотографии');
      }
      if (track.videos) {
        errors.push('Видео');
      }
      if (track.axises) {
        errors.push('Поворотные точки');
      }
      if (track.stops) {
        errors.push('Стоянки');
      }
      if (errors.length > 0) {
        throw new Error(
          `Для удаления Маршрута небходимо сначала удалить все объекты из разделов: ${errors.join(
            ', ',
          )}!`,
        );
      }

      return this.prismaService.track.delete({
        where: { id },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => TrackModel || ErrorModel)
  async createTrack(
    @Args('data') data: TrackCreateInput,
    @Context() ctx,
  ): Promise<TrackModel | ErrorModel> {
    try {
      return this.prismaService.track.create({
        data: {
          title: data.title || undefined,
          description: data.description || undefined,
          length: data.length || undefined,
          type: data.type || undefined,
          transport: data.transport || undefined,
          timeInTrack: data.timeInTrack || undefined,
          season: data.season || undefined,
          water: data.water || undefined,
          oopt: { connect: { id: data.parentId } },
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
