import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContactModel {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  description?: string | null;
}
