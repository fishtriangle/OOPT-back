import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PhotoModel } from '../photo/photo.model.js';
import { VideoModel } from '../video/video.model.js';
import { AxisModel } from '../axis/axis.model.js';

@ObjectType()
export class PointModel {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  title?: string | null;

  @Field({ nullable: true })
  description?: string | null;

  @Field((type) => [AxisModel], { nullable: 'itemsAndList' })
  axis?: AxisModel[] | null;

  @Field((type) => [PhotoModel], { nullable: 'itemsAndList' })
  photos?: PhotoModel[] | null;

  @Field((type) => [VideoModel], { nullable: 'itemsAndList' })
  videos?: VideoModel[] | null;

  @Field({ nullable: true })
  route?: string | null;
}
