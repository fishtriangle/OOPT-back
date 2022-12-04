import { Buffer } from 'node:buffer';
import sharp from 'sharp';
import { HttpException, HttpStatus } from '@nestjs/common';

export const convertStringToBuffer = (string) => {
  const arr = string.split(',');
  return Buffer.from(arr[1], 'base64');
};

export const convertImgToSmall = async (img) => {
  const rawImg = await convertStringToBuffer(img);
  await sharp(rawImg)
    .resize(400, 225)
    .jpeg()
    .toFile('output.jpg')
    .catch((err) => console.error(err));
  return 'data';
};

// export const createSmallImgFile: Promise<string> = async (img) => {
//   try {
//   } catch (e) {
//     throw new HttpException(
//       'Произошла ошибка при записи файла',
//       HttpStatus.INTERNAL_SERVER_ERROR,
//     );
//   }
// };
