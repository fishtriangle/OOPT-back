import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ErrorModel {
  @Field(() => Boolean, { nullable: true })
  isError?: boolean | null;

  @Field({ nullable: true })
  message?: string | null;
}
