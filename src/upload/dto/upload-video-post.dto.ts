import { ApiProperty } from '@nestjs/swagger';

export class UploadVideoPostDto {
  @ApiProperty({
    example: 'Лосось - это красное золото Камчатки',
    description: 'Описание видео',
  })
  readonly description: string;

  @ApiProperty({ example: 'Лосось', description: 'Альтернативный текст' })
  readonly alt: string;

  @ApiProperty({
    example: 'Town',
    description: 'Наименование родительской модели',
  })
  readonly parent: string;

  @ApiProperty({
    example: 3,
    description: 'Номер экземпляра родительской модели',
  })
  readonly parentId: number;
}
