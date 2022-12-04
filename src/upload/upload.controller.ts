import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UploadPhotoPostDto } from './dto/upload-photo-post.dto';
import { UploadService } from './upload.service';
import { UploadVideoPostDto } from './dto/upload-video-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhotoModel } from '../photo/photo.model';
import { VideoModel } from '../video/video.model';
import { ValidationPipe } from '../pipes/validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Upload files on server')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @ApiOperation({ summary: 'Загрузка на сервер Фотографии с описанием' })
  @ApiResponse({ status: 200, type: PhotoModel })
  @UsePipes(ValidationPipe)
  @Post('photo')
  @UseInterceptors(FileInterceptor('image'))
  uploadPhoto(@Body() photoDto: UploadPhotoPostDto, @UploadedFile() image) {
    return this.uploadService.uploadPhotoPost(photoDto, image);
  }

  @ApiOperation({ summary: 'Загрузка на сервер Видео с описанием' })
  @ApiResponse({ status: 200, type: VideoModel })
  @UsePipes(ValidationPipe)
  @Post('video')
  @UseInterceptors(FileInterceptor('video'))
  uploadVideo(@Body() videoDto: UploadVideoPostDto, @UploadedFile() video) {
    return this.uploadService.uploadVideoPost(videoDto, video);
  }
}
