import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class PhotoModel {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Field((type) => Int)
  id: number;

  @ApiProperty({
    example: './path/to/smallImage.jpg',
    description: 'Путь к меньшему изображению',
  })
  @Field({ nullable: true })
  small?: string | null;

  @ApiProperty({
    example: './path/to/largeImage.jpg',
    description: 'Путь к большому изображению',
  })
  @Field({ nullable: true })
  large?: string | null;

  @ApiProperty({
    example: 'Лосось - это красное золото Камчатки',
    description: 'Описание изображения',
  })
  @Field({ nullable: true })
  description?: string | null;

  @ApiProperty({ example: 'Лосось', description: 'Альтернативный текст' })
  @Field()
  alt: string;
}
