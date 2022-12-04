import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TownModel } from '../town/town.model.js';
import { TrackModel } from '../track/track.model.js';
import { PointModel } from '../point/point.model.js';
import { AxisModel } from '../axis/axis.model.js';
import { MasterModel } from '../master/master.model.js';
import { ServiceModel } from '../service/service.model.js';
import { HolidayModel } from '../holiday/holiday.model.js';
import { PhotoModel } from '../photo/photo.model.js';
import { VideoModel } from '../video/video.model.js';

@ObjectType()
export default class OoptModel {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  title?: string | null;

  @Field({ nullable: true })
  description?: string | null;

  @Field((type) => [PhotoModel], { nullable: 'itemsAndList' })
  photos?: PhotoModel[] | null;

  @Field((type) => [VideoModel], { nullable: 'itemsAndList' })
  videos?: VideoModel[] | null;

  @Field((type) => [TownModel], { nullable: 'itemsAndList' })
  towns?: TownModel[] | null;

  @Field((type) => [PointModel], { nullable: 'itemsAndList' })
  points?: PointModel[] | null;

  @Field((type) => [TrackModel], { nullable: 'itemsAndList' })
  tracks?: TrackModel[] | null;

  @Field((type) => [AxisModel], { nullable: 'itemsAndList' })
  borders?: AxisModel[] | null;

  @Field((type) => [MasterModel], { nullable: 'itemsAndList' })
  masters?: MasterModel[] | null;

  @Field((type) => [ServiceModel], { nullable: 'itemsAndList' })
  services?: ServiceModel[] | null;

  @Field((type) => [HolidayModel], { nullable: 'itemsAndList' })
  holidays?: HolidayModel[] | null;
}
