import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from './prisma.service.js';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { OoptResolver } from './oopt/oopt.resolver.js';
import { TownResolver } from './town/town.resolver.js';
import { TrackResolver } from './track/track.resolver.js';
import { PointResolver } from './point/point.resolver.js';
import { AxisResolver } from './axis/axis.resolver.js';
import { MasterResolver } from './master/master.resolver.js';
import { ServiceResolver } from './service/service.resolver.js';
import { ContactResolver } from './contact/contact.resolver.js';
import { HolidayResolver } from './holiday/holiday.resolver.js';
import { PhotoResolver } from './photo/photo.resolver.js';
import { VideoResolver } from './video/video.resolver.js';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UploadModule,
    FilesModule,
  ],
  controllers: [UploadController],
  providers: [
    PrismaService,
    OoptResolver,
    TownResolver,
    TrackResolver,
    PointResolver,
    AxisResolver,
    MasterResolver,
    ServiceResolver,
    ContactResolver,
    HolidayResolver,
    PhotoResolver,
    VideoResolver,
    UploadService,
  ],
})
export class AppModule {}
