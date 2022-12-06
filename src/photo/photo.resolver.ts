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
  ObjectType,
} from '@nestjs/graphql';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import OoptModel from '../oopt/oopt.model.js';
import { PhotoModel } from './photo.model.js';
import { ErrorModel } from '../error.model.js';
import { TownModel } from '../town/town.model.js';
import { PointModel } from '../point/point.model.js';
import { TrackModel } from '../track/track.model.js';
import { MasterModel } from '../master/master.model.js';
import { ServiceModel } from '../service/service.model.js';
import { HolidayModel } from '../holiday/holiday.model.js';
import * as fs from 'node:fs/promises';
import { join } from 'node:path';

@InputType()
class PhotoUniqueInput {
  @Field({ nullable: true })
  id: number;
}

@ObjectType()
export class PhotoOutput {
  @Field(() => String)
  description: string;
  @Field(() => String)
  alt: string;
  @Field(() => String)
  small: string;
  @Field(() => String)
  large: string;
}

@InputType()
class PhotoUpdateInput {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  alt: string;
}

@Resolver(PhotoModel)
export class PhotoResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query((returns) => [PhotoModel] || ErrorModel, { nullable: true })
  async getAllPhotos(@Context() ctx): Promise<PhotoModel[] | ErrorModel> {
    try {
      return this.prismaService.photo.findMany();
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Query((returns) => PhotoModel || ErrorModel, { nullable: true })
  async getPhoto(
    @Args('photoUniqueInput') photoUniqueInput: PhotoUniqueInput,
  ): Promise<PhotoModel | ErrorModel> {
    try {
      return this.prismaService.photo.findUnique({
        where: {
          id: photoUniqueInput.id || undefined,
        },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => PhotoModel || ErrorModel)
  async updatePhoto(
    @Args('data') data: PhotoUpdateInput,
    @Context() ctx,
  ): Promise<PhotoModel | ErrorModel> {
    try {
      return this.prismaService.photo.update({
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

  @Mutation((returns) => PhotoModel || ErrorModel)
  async deletePhoto(
    @Args('id') id: number,
    @Context() ctx,
  ): Promise<PhotoModel | ErrorModel> {
    try {
      const filePath = [...__dirname.split('/').slice(0, -1), 'static'].join(
        '/',
      );
      const { small, large } = await this.prismaService.photo.findUnique({
        where: { id },
      });
      await fs.rm(join(filePath, small));
      await fs.rm(join(filePath, large));
      const result = await this.prismaService.photo.delete({
        where: { id },
      });
      return result;
    } catch (e) {
      console.log(e);
      return {
        isError: true,
        message: e.message,
      };
    }
  }
}
