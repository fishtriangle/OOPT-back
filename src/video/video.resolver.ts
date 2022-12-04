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
import { VideoModel } from './video.model.js';
import { ErrorModel } from '../error.model.js';
import { TownModel } from '../town/town.model.js';
import { PointModel } from '../point/point.model.js';
import { TrackModel } from '../track/track.model.js';
import { MasterModel } from '../master/master.model.js';
import { ServiceModel } from '../service/service.model.js';
import { HolidayModel } from '../holiday/holiday.model.js';

@InputType()
class VideoUniqueInput {
  @Field({ nullable: true })
  id: number;
}

@InputType()
class VideoCreateInput {
  @Field({ nullable: true })
  description: string;

  @Field()
  path: string;

  @Field({ nullable: true })
  alt: string;
}

@InputType()
class VideoUpdateInput {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  description: string;

  @Field()
  path: string;

  @Field({ nullable: true })
  alt: string;
}

@Resolver(VideoModel)
export class VideoResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  // @ResolveField()
  // getOOPT(@Root() video: VideoModel): Promise<OoptModel | null> {
  //   return this.prismaService.video
  //     .findUnique({
  //       where: {
  //         id: video.id,
  //       },
  //     })
  //     .oopt();
  // }
  //
  // @ResolveField()
  // getTown(@Root() video: VideoModel): Promise<TownModel | null> {
  //   return this.prismaService.video
  //     .findUnique({
  //       where: {
  //         id: video.id,
  //       },
  //     })
  //     .town();
  // }
  //
  // @ResolveField()
  // getPoint(@Root() video: VideoModel): Promise<PointModel | null> {
  //   return this.prismaService.video
  //     .findUnique({
  //       where: {
  //         id: video.id,
  //       },
  //     })
  //     .point();
  // }
  //
  // @ResolveField()
  // getTrack(@Root() video: VideoModel): Promise<TrackModel | null> {
  //   return this.prismaService.video
  //     .findUnique({
  //       where: {
  //         id: video.id,
  //       },
  //     })
  //     .track();
  // }
  //
  // @ResolveField()
  // getMaster(@Root() video: VideoModel): Promise<MasterModel | null> {
  //   return this.prismaService.video
  //     .findUnique({
  //       where: {
  //         id: video.id,
  //       },
  //     })
  //     .master();
  // }
  //
  // @ResolveField()
  // getService(@Root() video: VideoModel): Promise<ServiceModel | null> {
  //   return this.prismaService.video
  //     .findUnique({
  //       where: {
  //         id: video.id,
  //       },
  //     })
  //     .service();
  // }
  //
  // @ResolveField()
  // getHoliday(@Root() video: VideoModel): Promise<HolidayModel | null> {
  //   return this.prismaService.video
  //     .findUnique({
  //       where: {
  //         id: video.id,
  //       },
  //     })
  //     .holiday();
  // }

  @Query((returns) => [VideoModel] || ErrorModel, { nullable: true })
  async getAllVideos(@Context() ctx): Promise<VideoModel[] | ErrorModel> {
    try {
      return this.prismaService.video.findMany();
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Query((returns) => VideoModel || ErrorModel, { nullable: true })
  async getVideo(
    @Args('videoUniqueInput') videoUniqueInput: VideoUniqueInput,
  ): Promise<VideoModel | ErrorModel> {
    try {
      return this.prismaService.video.findUnique({
        where: {
          id: videoUniqueInput.id || undefined,
        },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => VideoModel || ErrorModel)
  async updateVideo(
    @Args('data') data: VideoUpdateInput,
    @Context() ctx,
  ): Promise<VideoModel | ErrorModel> {
    try {
      return this.prismaService.video.update({
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

  @Mutation((returns) => VideoModel || ErrorModel)
  async deleteVideo(
    @Args('id') id: number,
    @Context() ctx,
  ): Promise<VideoModel | ErrorModel> {
    try {
      return this.prismaService.video.delete({
        where: { id },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => VideoModel || ErrorModel)
  async createVideo(
    @Args('data') data: VideoCreateInput,
    @Context() ctx,
  ): Promise<VideoModel | ErrorModel> {
    try {
      return this.prismaService.video.create({
        data,
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }
}
