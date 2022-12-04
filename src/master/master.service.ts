import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Master, Prisma } from '@prisma/client';

@Injectable()
export class MasterService {
  constructor(private prisma: PrismaService) {}

  async master(
    masterWhereUniqueInput: Prisma.MasterWhereUniqueInput,
  ): Promise<Master | null> {
    return this.prisma.master.findUnique({
      where: masterWhereUniqueInput,
    });
  }

  async masters(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MasterWhereUniqueInput;
    where?: Prisma.MasterWhereInput;
    orderBy?: Prisma.MasterOrderByWithRelationInput;
  }): Promise<Master[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.master.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createMaster(data: Prisma.MasterCreateInput): Promise<Master> {
    return this.prisma.master.create({
      data,
    });
  }

  async updateMaster(params: {
    where: Prisma.MasterWhereUniqueInput;
    data: Prisma.MasterUpdateInput;
  }): Promise<Master> {
    const { where, data } = params;
    return this.prisma.master.update({
      data,
      where,
    });
  }

  async deleteMaster(where: Prisma.MasterWhereUniqueInput): Promise<Master> {
    return this.prisma.master.delete({
      where,
    });
  }
}
