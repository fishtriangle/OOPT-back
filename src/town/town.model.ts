import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PhotoModel } from '../photo/photo.model.js';
import { VideoModel } from '../video/video.model.js';
import { AxisModel } from '../axis/axis.model.js';
import { PointModel } from '../point/point.model.js';
import OoptModel from '../oopt/oopt.model.js';

@ObjectType()
export class TownModel {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  title?: string | null;

  @Field({ nullable: true })
  description?: string | null;

  @Field((type) => [PointModel], { nullable: 'itemsAndList' })
  points?: PointModel[] | null;

  @Field((type) => [AxisModel], { nullable: true })
  axis?: AxisModel[] | null;

  @Field((type) => [PhotoModel], { nullable: 'itemsAndList' })
  photos?: PhotoModel[] | null;

  @Field((type) => [VideoModel], { nullable: 'itemsAndList' })
  videos?: VideoModel[] | null;

  @Field((type) => Boolean)
  disabled: boolean;
}
