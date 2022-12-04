import { Field, Int, ObjectType } from '@nestjs/graphql';
import OoptModel from '../oopt/oopt.model.js';
import { PointModel } from '../point/point.model.js';
import { AxisModel } from '../axis/axis.model.js';
import { PhotoModel } from '../photo/photo.model.js';
import { VideoModel } from '../video/video.model.js';

@ObjectType()
export class TrackModel {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  title?: string | null;

  @Field({ nullable: true })
  description?: string | null;

  @Field({ nullable: true })
  length?: string | null;

  @Field((type) => [AxisModel], { nullable: 'itemsAndList' })
  axises?: AxisModel[] | null;

  @Field((type) => [PhotoModel], { nullable: 'itemsAndList' })
  photos?: PhotoModel[] | null;

  @Field((type) => [VideoModel], { nullable: 'itemsAndList' })
  videos?: VideoModel[] | null;

  @Field((type) => [PointModel], { nullable: 'itemsAndList' })
  stops?: PointModel[] | null;

  @Field({ nullable: true })
  type?: string | null;

  @Field({ nullable: true })
  transport?: string | null;

  @Field({ nullable: true })
  timeInTrack?: string | null;

  @Field({ nullable: true })
  season?: string | null;

  @Field({ nullable: true })
  water?: string | null;
}
