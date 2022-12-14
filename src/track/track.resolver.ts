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
import { TrackModel } from './track.model.js';
import { ErrorModel } from '../error.model.js';

@InputType()
class TrackUniqueInput {
  @Field({ nullable: true })
  id: number;
}

@InputType()
class TrackCreateInput {
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

  @Field((type) => Int)
  parentId: number;

  @Field((type) => Boolean, { nullable: true })
  disabled: boolean;
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

  @Field((type) => Boolean, { nullable: true })
  disabled: boolean;
}

@Resolver(TrackModel)
export class TrackResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query((returns) => [TrackModel] || ErrorModel, { nullable: true })
  async getAllTracks(@Context() ctx): Promise<TrackModel[] | ErrorModel> {
    try {
      return this.prismaService.track.findMany({
        include: {
          axises: true,
          photos: true,
          videos: true,
          stops: {
            include: {
              axis: true,
            },
          },
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
      return this.prismaService.track.findUnique({
        where: {
          id: trackUniqueInput.id || undefined,
        },
        include: {
          axises: true,
          photos: true,
          videos: true,
          stops: {
            include: {
              axis: true,
            },
          },
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
      const result = await this.prismaService.track.update({
        where: { id: data.id || undefined },
        data,
      });
      return result;
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
      const track = await this.prismaService.track.findUnique({
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

      if (track.photos.length > 0) {
        errors.push('Фотографии');
      }
      if (track.videos.length > 0) {
        errors.push('Видео');
      }
      if (track.axises.length > 0) {
        errors.push('Поворотные точки');
      }
      if (track.stops.length > 0) {
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
