import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OOPT, Prisma } from '@prisma/client';

@Injectable()
export class OoptService {
  constructor(private prisma: PrismaService) {}

  async oopt(
    ooptWhereUniqueInput: Prisma.OOPTWhereUniqueInput,
  ): Promise<OOPT | null> {
    return this.prisma.oOPT.findUnique({
      where: ooptWhereUniqueInput,
    });
  }

  async oopts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OOPTWhereUniqueInput;
    where?: Prisma.OOPTWhereInput;
    orderBy?: Prisma.OOPTOrderByWithRelationInput;
  }): Promise<OOPT[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.oOPT.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createOOPT(data: Prisma.OOPTCreateInput): Promise<OOPT> {
    return this.prisma.oOPT.create({
      data,
    });
  }

  async updateOOPT(params: {
    where: Prisma.OOPTWhereUniqueInput;
    data: Prisma.OOPTUpdateInput;
  }): Promise<OOPT> {
    const { where, data } = params;
    return this.prisma.oOPT.update({
      data,
      where,
    });
  }

  async deleteOOPT(where: Prisma.OOPTWhereUniqueInput): Promise<OOPT> {
    return this.prisma.oOPT.delete({
      where,
    });
  }
}
