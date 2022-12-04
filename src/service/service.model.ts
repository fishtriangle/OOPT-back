import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PhotoModel } from '../photo/photo.model.js';
import { VideoModel } from '../video/video.model.js';
import { ContactModel } from '../contact/contact.model.js';

@ObjectType()
export class ServiceModel {
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

  @Field((type) => [ContactModel], { nullable: 'itemsAndList' })
  contacts?: ContactModel[] | null;
}
