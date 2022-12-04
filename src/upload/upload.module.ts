import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from '../prisma.service';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
  imports: [FilesModule],
})
export class UploadModule {}
