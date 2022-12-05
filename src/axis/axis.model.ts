import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AxisModel {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  title?: string | null;

  @Field((type) => Int)
  axisX: number;

  @Field((type) => Int)
  axisY: number;

  @Field((type) => Boolean)
  disabled: boolean;
}
