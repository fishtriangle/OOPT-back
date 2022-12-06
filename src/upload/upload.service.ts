import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Photo, Video, Prisma } from '@prisma/client';
import { UploadPhotoPostDto } from './dto/upload-photo-post.dto';
import { UploadVideoPostDto } from './dto/upload-video-post.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class UploadService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
  ) {}

  // async uploadPhotoPost(data: UploadPhotoPostDto, image: any): Promise<Photo> {
  //   const fileNames = await this.filesService.createVideoFile(image);
  //   const photoPost = await this.prisma.photo.create({
  //     data: {
  //       // small: fileNames.small || undefined,
  //       // large: fileNames.large || undefined,
  //       description: data.description || undefined,
  //       alt: data.alt || undefined,
  //     },
  //   });
  //   return photoPost;
  // }

  uploadPhotoPost(data: UploadPhotoPostDto, image: any): Promise<Photo> {
    const parent = {
      [data.parent]: { connect: { id: Number(data.parentId) } },
    };
    return this.filesService
      .createPhotoFile(image)
      .then((fileNames) =>
        this.prisma.photo
          .create({
            data: {
              small: fileNames.small || undefined,
              large: fileNames.large || undefined,
              description: data.description || undefined,
              alt: data.alt || undefined,
              ...parent,
            },
          })
          .then((photoPost) => photoPost),
      )
      .catch((err) => {
        console.error(err);
        throw new HttpException(
          'Произошла сохранения в БД',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  uploadVideoPost(data: UploadVideoPostDto, video: any): Promise<Video> {
    const parent = { [data.parent]: { connect: { id: data.parentId } } };
    return this.filesService
      .createVideoFile(video)
      .then((fileName) =>
        this.prisma.video
          .create({
            data: {
              path: fileName || undefined,
              description: data.description || undefined,
              alt: data.alt || undefined,
              ...parent,
            },
          })
          .then((videoPost) => videoPost),
      )
      .catch((err) => {
        console.error(err);
        throw new HttpException(err.response, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
