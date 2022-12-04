import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'node:fs/promises';
import * as uuid from 'uuid';
import * as _ from 'lodash';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
  createVideoFile(file): Promise<string> {
    const fileType = _.last(file.originalname.split('.'));
    const fileName = `${uuid.v4()}.${fileType}`;
    const filePath = path.resolve(__dirname, '..', 'static');

    return fs
      .readdir(path.resolve(__dirname, '..'))
      .then((content) => {
        if (content.indexOf('static') < 0) {
          fs.mkdir(filePath, { recursive: true });
        }
      })
      .then(() => {
        fs.writeFile(path.join(filePath, fileName), file.buffer);
      })
      .then(() => fileName)
      .catch((err) => {
        console.error(err);
        throw new HttpException(
          'Произошла ошибка записи файла',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  createPhotoFile(file): Promise<{ small: string; large: string }> {
    const fileType = 'jpg';
    const uuidIndex = uuid.v4();
    const fileNameSmall = `${uuidIndex}-small.${fileType}`;
    const fileNameLarge = `${uuidIndex}-large.${fileType}`;
    const filePath = path.resolve(__dirname, '..', 'static');
    const paths = {
      small: fileNameSmall,
      large: fileNameLarge,
    };

    return fs
      .readdir(path.resolve(__dirname, '..'))
      .then((content) => {
        if (content.indexOf('static') < 0) {
          fs.mkdir(filePath, { recursive: true });
        }
      })
      .then(() => {
        sharp(file.buffer)
          .resize(400, 255)
          .jpeg() // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .toFile(path.join(filePath, fileNameSmall), (err) =>
            console.error(err),
          );
      })
      .then(() => {
        sharp(file.buffer)
          .resize(1920, 1080)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          .jpeg() // @ts-ignore
          .toFile(path.join(filePath, fileNameLarge), (err) =>
            console.error(err),
          );
      })
      .then(() => paths)
      .catch((err) => {
        console.error(err);
        throw new HttpException(
          'Произошла ошибка записи файла',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
