import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';
import * as _ from 'lodash';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToInstance(metadata.metatype, value);
    const errors = await validate(obj);
    const typeErrors = [];

    if (value.fieldname === 'video') {
      const fileType = _.last(value.originalname.split('.'));
      if (fileType !== 'mp4') {
        typeErrors.push(
          `${value.originalname} - Не корректный тип видеофайла, поддерживается только mp4 формат`,
        );
      }
    }

    if (value.fieldname === 'image') {
      const fileType = _.last(value.originalname.split('.'));
      if (!(fileType === 'jpg' || fileType === 'png')) {
        typeErrors.push(
          `${value.originalname} - Не корректный тип изображения, поддерживается только jpg и png формат`,
        );
      }
    }

    if (errors.length || typeErrors.length) {
      const textValidation = errors.map(
        (error) =>
          `${error.property} - ${Object.values(error.constraints).join(', ')}`,
      );
      const messages = [...textValidation, ...typeErrors];
      throw new ValidationException(messages);
    }

    return value;
  }
}
