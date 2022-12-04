import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Town, Prisma } from '@prisma/client';

@Injectable()
export class TownService {
  constructor(private prisma: PrismaService) {}

  async town(
    townWhereUniqueInput: Prisma.TownWhereUniqueInput,
  ): Promise<Town | null> {
    return this.prisma.town.findUnique({
      where: townWhereUniqueInput,
    });
  }

  async towns(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TownWhereUniqueInput;
    where?: Prisma.TownWhereInput;
    orderBy?: Prisma.TownOrderByWithRelationInput;
  }): Promise<Town[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.town.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTown(data: Prisma.TownCreateInput): Promise<Town> {
    return this.prisma.town.create({
      data,
    });
  }

  async updateTown(params: {
    where: Prisma.TownWhereUniqueInput;
    data: Prisma.TownUpdateInput;
  }): Promise<Town> {
    const { where, data } = params;
    return this.prisma.town.update({
      data,
      where,
    });
  }

  async deleteTown(where: Prisma.TownWhereUniqueInput): Promise<Town> {
    return this.prisma.town.delete({
      where,
    });
  }
}
