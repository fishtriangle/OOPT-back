import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Root,
  InputType,
  Field,
  Int,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ContactModel } from './contact.model.js';
import { ErrorModel } from '../error.model.js';
import { PrismaService } from '../prisma.service.js';
import { MasterModel } from '../master/master.model.js';
import { ServiceModel } from '../service/service.model.js';

@InputType()
class ContactUniqueInput {
  @Field({ nullable: true })
  id: number;
}

@InputType()
class ContactCreateInput {
  @Field({ nullable: true })
  description: string;

  @Field()
  parent: string;

  @Field((type) => Int)
  parentId: number;
}

@InputType()
class ContactUpdateInput {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  parent: string;

  @Field((type) => Int, { nullable: true })
  parentId: number;
}

@Resolver(ContactModel)
export class ContactResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  // @ResolveField()
  // getMaster(@Root() contact: ContactModel): Promise<MasterModel | null> {
  //   return this.prismaService.contact
  //     .findUnique({
  //       where: {
  //         id: contact.id,
  //       },
  //     })
  //     .master();
  // }
  //
  // @ResolveField()
  // getService(@Root() contact: ContactModel): Promise<ServiceModel | null> {
  //   return this.prismaService.contact
  //     .findUnique({
  //       where: {
  //         id: contact.id,
  //       },
  //     })
  //     .service();
  // }

  @Query((returns) => [ContactModel] || ErrorModel, { nullable: true })
  async getAllContacts(@Context() ctx): Promise<ContactModel[] | ErrorModel> {
    try {
      return this.prismaService.contact.findMany();
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Query((returns) => ContactModel || ErrorModel, { nullable: true })
  async getContact(
    @Args('contactUniqueInput') contactUniqueInput: ContactUniqueInput,
  ): Promise<ContactModel | ErrorModel> {
    try {
      return this.prismaService.contact.findUnique({
        where: {
          id: contactUniqueInput.id || undefined,
        },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => ContactModel || ErrorModel)
  async updateContact(
    @Args('data') data: ContactUpdateInput,
    @Context() ctx,
  ): Promise<ContactModel | ErrorModel> {
    try {
      return this.prismaService.contact.update({
        where: { id: data.id || undefined },
        data,
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => ContactModel || ErrorModel)
  async deleteContact(
    @Args('id') id: number,
    @Context() ctx,
  ): Promise<ContactModel | ErrorModel> {
    try {
      return this.prismaService.contact.delete({
        where: { id },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => ContactModel || ErrorModel)
  async createContact(
    @Args('data') data: ContactCreateInput,
    @Context() ctx,
  ): Promise<ContactModel | ErrorModel> {
    try {
      const parent = { [data.parent]: { connect: { id: data.parentId } } };
      return this.prismaService.contact.create({
        data: {
          description: data.description || undefined,
          ...parent,
        },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }
}
