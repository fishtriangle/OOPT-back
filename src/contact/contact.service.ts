import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Contact, Prisma } from '@prisma/client';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async contact(
    contactWhereUniqueInput: Prisma.ContactWhereUniqueInput,
  ): Promise<Contact | null> {
    return this.prisma.contact.findUnique({
      where: contactWhereUniqueInput,
    });
  }

  async contacts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ContactWhereUniqueInput;
    where?: Prisma.ContactWhereInput;
    orderBy?: Prisma.ContactOrderByWithRelationInput;
  }): Promise<Contact[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.contact.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createContact(data: Prisma.ContactCreateInput): Promise<Contact> {
    return this.prisma.contact.create({
      data,
    });
  }

  async updateContact(params: {
    where: Prisma.ContactWhereUniqueInput;
    data: Prisma.ContactUpdateInput;
  }): Promise<Contact> {
    const { where, data } = params;
    return this.prisma.contact.update({
      data,
      where,
    });
  }

  async deleteContact(where: Prisma.ContactWhereUniqueInput): Promise<Contact> {
    return this.prisma.contact.delete({
      where,
    });
  }
}
