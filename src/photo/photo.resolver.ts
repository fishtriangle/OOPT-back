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
  ObjectType,
} from '@nestjs/graphql';
import { Stream } from 'stream';
// import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
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
import * as Path from 'path';
import * as fs from 'node:fs/promises';
import path from 'path';
// import { createSmallImgFile } from '../utils/utils';

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

  // @ResolveField()
  // getOOPT(@Root() photo: PhotoModel): Promise<OoptModel | null> {
  //   return this.prismaService.photo
  //     .findUnique({
  //       where: {
  //         id: photo.id,
  //       },
  //     })
  //     .oopt();
  // }
  //
  // @ResolveField()
  // getTown(@Root() photo: PhotoModel): Promise<TownModel | null> {
  //   return this.prismaService.photo
  //     .findUnique({
  //       where: {
  //         id: photo.id,
  //       },
  //     })
  //     .town();
  // }
  //
  // @ResolveField()
  // getPoint(@Root() photo: PhotoModel): Promise<PointModel | null> {
  //   return this.prismaService.photo
  //     .findUnique({
  //       where: {
  //         id: photo.id,
  //       },
  //     })
  //     .point();
  // }
  //
  // @ResolveField()
  // getTrack(@Root() photo: PhotoModel): Promise<TrackModel | null> {
  //   return this.prismaService.photo
  //     .findUnique({
  //       where: {
  //         id: photo.id,
  //       },
  //     })
  //     .track();
  // }
  //
  // @ResolveField()
  // getMaster(@Root() photo: PhotoModel): Promise<MasterModel | null> {
  //   return this.prismaService.photo
  //     .findUnique({
  //       where: {
  //         id: photo.id,
  //       },
  //     })
  //     .master();
  // }
  //
  // @ResolveField()
  // getService(@Root() photo: PhotoModel): Promise<ServiceModel | null> {
  //   return this.prismaService.photo
  //     .findUnique({
  //       where: {
  //         id: photo.id,
  //       },
  //     })
  //     .service();
  // }
  //
  // @ResolveField()
  // getHoliday(@Root() photo: PhotoModel): Promise<HolidayModel | null> {
  //   return this.prismaService.photo
  //     .findUnique({
  //       where: {
  //         id: photo.id,
  //       },
  //     })
  //     .holiday();
  // }

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
      console.log('0');
      const filePath = path.resolve(__dirname, '..', 'static');
      console.log('1');
      const { small, large } = await this.prismaService.photo.findUnique({
        where: { id },
      });
      console.log('2');
      fs.rm(path.join(filePath, small));
      fs.rm(path.join(filePath, large));
      console.log('3');
      return this.prismaService.photo.delete({
        where: { id },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  // @Mutation((returns) => Boolean)
  // async createPhoto(
  //   @Args({ name: 'file', type: () => GraphQLUpload })
  //   { createReadStream, filename }: FileUpload,
  //   @Context() ctx,
  // ): // (
  // //   @Args({name: 'file', type: () => GraphQLUpload}),
  // //   @Context() ctx,
  // // ):
  // Promise<boolean> {
  //   try {
  //     return new Promise(async (resolve, reject) =>
  //       createReadStream()
  //         .pipe(fs.createWriteStream(`./${filename}`))
  //         .on('finish', () => resolve(true))
  //         .on('error', () => reject(false)),
  //     );
  // console.log('1');
  // const { createReadStream, filename } = await data.image;
  // // const small = await createSmallImgFile(image);
  // console.log('2');
  // return new Promise(async (resolve) => {
  //   createReadStream()
  //     .pipe(
  //       fs.createWriteStream(
  //         Path.join(process.cwd(), `./src/upload/${filename}`),
  //       ),
  //     )
  //     .on('finish', () => {
  //       this.prismaService.photo.create({
  //         data: {
  //           small: filename || undefined,
  //           large: filename || undefined,
  //           description: data.description || undefined,
  //           alt: data.alt || undefined,
  //         },
  //       });
  //       return resolve({
  //         image: filename,
  //         description: data.description,
  //         alt: data.alt,
  //       });
  //     })
  //     .on('error', () => {
  //       new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
  //     });
  // });
  //   } catch (e) {
  //     return false;
  //     // {
  //     //   isError: true,
  //     //   message: e.message,
  //     // };
  //   }
  // }
}
