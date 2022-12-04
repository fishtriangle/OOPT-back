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
import OoptModel from './oopt.model.js';
import { PhotoModel } from '../photo/photo.model.js';
import { VideoModel } from '../video/video.model.js';
import { TownModel } from '../town/town.model.js';
import { PointModel } from '../point/point.model.js';
import { TrackModel } from '../track/track.model.js';
import { AxisModel } from '../axis/axis.model.js';
import { MasterModel } from '../master/master.model.js';
import { ServiceModel } from '../service/service.model.js';
import { HolidayModel } from '../holiday/holiday.model.js';
import { ErrorModel } from '../error.model.js';

@InputType()
class OoptUniqueInput {
  @Field({ nullable: true })
  id: number;
}

@InputType()
class OoptCreateInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;
}

@InputType()
class OoptUpdateInput {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;
}

@Resolver(OoptModel)
export class OoptResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query((returns) => [OoptModel] || ErrorModel, { nullable: true })
  async getAllOOPTs(@Context() ctx): Promise<OoptModel[] | ErrorModel> {
    try {
      return this.prismaService.oOPT.findMany({
        include: {
          towns: true,
          photos: true,
          videos: true,
          points: true,
          tracks: true,
          borders: true,
          masters: true,
          services: true,
          holidays: true,
        },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Query((returns) => OoptModel || ErrorModel, { nullable: true })
  async getOOPT(
    @Args('ooptUniqueInput') ooptUniqueInput: OoptUniqueInput,
  ): Promise<OoptModel | ErrorModel> {
    try {
      return this.prismaService.oOPT.findUnique({
        where: {
          id: ooptUniqueInput.id || undefined,
        },
        include: {
          towns: true,
          photos: true,
          videos: true,
          points: true,
          tracks: true,
          borders: true,
          masters: true,
          services: true,
          holidays: true,
        },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => OoptModel || ErrorModel)
  async updateOOPT(
    @Args('data') data: OoptUpdateInput,
    @Context() ctx,
  ): Promise<OoptModel | ErrorModel> {
    try {
      return this.prismaService.oOPT.update({
        where: { id: data.id || undefined },
        data: {
          title: data.title,
          description: data.description,
        },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => OoptModel || ErrorModel)
  async deleteOOPT(
    @Args('id') id: number,
    @Context() ctx,
  ): Promise<OoptModel | ErrorModel> {
    try {
      const oopt = this.prismaService.oOPT.findUnique({
        where: {
          id: id || undefined,
        },
        include: {
          photos: true,
          videos: true,
          towns: true,
          points: true,
          tracks: true,
          borders: true,
          masters: true,
          services: true,
          holidays: true,
        },
      });
      const errors = [];

      if (oopt.photos) {
        errors.push('Фотографии');
      }
      if (oopt.videos) {
        errors.push('Видео');
      }
      if (oopt.towns) {
        errors.push('Населенные пункты');
      }
      if (oopt.points) {
        errors.push('Точки интереса');
      }
      if (oopt.tracks) {
        errors.push('Маршруты');
      }
      if (oopt.masters) {
        errors.push('Мастера');
      }
      if (oopt.services) {
        errors.push('Сервисные компании');
      }
      if (oopt.holidays) {
        errors.push('Праздники');
      }
      if (errors.length > 0) {
        throw new Error(
          `Для удаления ООПТ небходимо сначала удалить все объекты из разделов: ${errors.join(
            ', ',
          )}!`,
        );
      }

      return this.prismaService.oOPT.delete({
        where: { id },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => OoptModel || ErrorModel)
  async createOOPT(
    @Args('data') data: OoptCreateInput,
    @Context() ctx,
  ): Promise<OoptModel | ErrorModel> {
    try {
      return this.prismaService.oOPT.create({
        data: {
          title: data.title,
          description: data.description,
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
