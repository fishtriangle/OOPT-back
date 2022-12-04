import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Holiday, Prisma } from '@prisma/client';

@Injectable()
export class HolidayService {
  constructor(private prisma: PrismaService) {}

  async holiday(
    holidayWhereUniqueInput: Prisma.HolidayWhereUniqueInput,
  ): Promise<Holiday | null> {
    return this.prisma.holiday.findUnique({
      where: holidayWhereUniqueInput,
    });
  }

  async holidays(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.HolidayWhereUniqueInput;
    where?: Prisma.HolidayWhereInput;
    orderBy?: Prisma.HolidayOrderByWithRelationInput;
  }): Promise<Holiday[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.holiday.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createHoliday(data: Prisma.HolidayCreateInput): Promise<Holiday> {
    return this.prisma.holiday.create({
      data,
    });
  }

  async updateHoliday(params: {
    where: Prisma.HolidayWhereUniqueInput;
    data: Prisma.HolidayUpdateInput;
  }): Promise<Holiday> {
    const { where, data } = params;
    return this.prisma.holiday.update({
      data,
      where,
    });
  }

  async deleteHoliday(where: Prisma.HolidayWhereUniqueInput): Promise<Holiday> {
    return this.prisma.holiday.delete({
      where,
    });
  }
}
