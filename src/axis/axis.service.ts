import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Axis, Prisma } from '@prisma/client';

@Injectable()
export class AxisService {
  constructor(private prisma: PrismaService) {}

  async axis(
    axisWhereUniqueInput: Prisma.AxisWhereUniqueInput,
  ): Promise<Axis | null> {
    return this.prisma.axis.findUnique({
      where: axisWhereUniqueInput,
    });
  }

  async axises(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AxisWhereUniqueInput;
    where?: Prisma.AxisWhereInput;
    orderBy?: Prisma.AxisOrderByWithRelationInput;
  }): Promise<Axis[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.axis.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAxis(data: Prisma.AxisCreateInput): Promise<Axis> {
    return this.prisma.axis.create({
      data,
    });
  }

  async updateAxis(params: {
    where: Prisma.AxisWhereUniqueInput;
    data: Prisma.AxisUpdateInput;
  }): Promise<Axis> {
    const { where, data } = params;
    return this.prisma.axis.update({
      data,
      where,
    });
  }

  async deleteAxis(where: Prisma.AxisWhereUniqueInput): Promise<Axis> {
    return this.prisma.axis.delete({
      where,
    });
  }
}
