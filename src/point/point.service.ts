import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Point, Prisma } from '@prisma/client';

@Injectable()
export class PointService {
  constructor(private prisma: PrismaService) {}

  async point(
    pointWhereUniqueInput: Prisma.PointWhereUniqueInput,
  ): Promise<Point | null> {
    return this.prisma.point.findUnique({
      where: pointWhereUniqueInput,
    });
  }

  async points(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PointWhereUniqueInput;
    where?: Prisma.PointWhereInput;
    orderBy?: Prisma.PointOrderByWithRelationInput;
  }): Promise<Point[]> {
    const { skip, take, cursor, where, orderBy } = params;
    console.log('123');
    return this.prisma.point.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPoint(data: Prisma.PointCreateInput): Promise<Point> {
    return this.prisma.point.create({
      data,
    });
  }

  async updatePoint(params: {
    where: Prisma.PointWhereUniqueInput;
    data: Prisma.PointUpdateInput;
  }): Promise<Point> {
    const { where, data } = params;
    return this.prisma.point.update({
      data,
      where,
    });
  }

  async deletePoint(where: Prisma.PointWhereUniqueInput): Promise<Point> {
    return this.prisma.point.delete({
      where,
    });
  }
}
