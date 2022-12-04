import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class VideoModel {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Field((type) => Int)
  id: number;

  @ApiProperty({
    example: './path/to/video.mp4',
    description: 'Путь к видео',
  })
  @Field({ nullable: true })
  path?: string | null;

  @ApiProperty({
    example:
      'Домашние вулканы - неотъемлемый аттрибут Петропавловска-Камчатского',
    description: 'Описание видео',
  })
  @Field({ nullable: true })
  description?: string | null;

  @ApiProperty({
    example: 'Домашние вулканы',
    description: 'Альтернативный текст',
  })
  @Field()
  alt: string;
}
