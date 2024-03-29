import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Photo, Prisma } from '@prisma/client';

@Injectable()
export class PhotoService {
  constructor(private prisma: PrismaService) {}

  async photo(
    photoWhereUniqueInput: Prisma.PhotoWhereUniqueInput,
  ): Promise<Photo | null> {
    return this.prisma.photo.findUnique({
      where: photoWhereUniqueInput,
    });
  }

  async photos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PhotoWhereUniqueInput;
    where?: Prisma.PhotoWhereInput;
    orderBy?: Prisma.PhotoOrderByWithRelationInput;
  }): Promise<Photo[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.photo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPhoto(data: Prisma.PhotoCreateInput): Promise<Photo> {
    return this.prisma.photo.create({
      data,
    });
  }

  async updatePhoto(params: {
    where: Prisma.PhotoWhereUniqueInput;
    data: Prisma.PhotoUpdateInput;
  }): Promise<Photo> {
    const { where, data } = params;
    return this.prisma.photo.update({
      data,
      where,
    });
  }

  async deletePhoto(where: Prisma.PhotoWhereUniqueInput): Promise<Photo> {
    return this.prisma.photo.delete({
      where,
    });
  }
}
