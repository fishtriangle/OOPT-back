import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UploadPhotoPostDto {
  @ApiProperty({
    example: 'Лосось - это красное золото Камчатки',
    description: 'Описание изображения',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;

  @ApiProperty({ example: 'Лосось', description: 'Альтернативный текст' })
  @IsString({ message: 'Должно быть строкой' })
  readonly alt: string;

  @ApiProperty({
    example: 'Town',
    description: 'Наименование родительской модели',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly parent: string;

  @ApiProperty({
    example: 3,
    description: 'Номер экземпляра родительской модели',
  })
  readonly parentId: string;
}
