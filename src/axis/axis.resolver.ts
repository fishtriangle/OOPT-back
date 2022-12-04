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
import { PrismaService } from '../prisma.service.js';
import OoptModel from '../oopt/oopt.model.js';
import { TownModel } from '../town/town.model.js';
import { AxisModel } from './axis.model.js';
import { ErrorModel } from '../error.model.js';
import { PointModel } from '../point/point.model.js';
import { TrackModel } from '../track/track.model.js';

@InputType()
class AxisUniqueInput {
  @Field({ nullable: true })
  id: number;
}

@InputType()
class AxisCreateInput {
  @Field()
  title: string;

  @Field((type) => Int, { nullable: true })
  axisX: number;

  @Field((type) => Int, { nullable: true })
  axisY: number;

  @Field()
  parent: string;

  @Field((type) => Int)
  parentId: number;
}

@InputType()
class AxisUpdateInput {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field((type) => Int, { nullable: true })
  axisX: number;

  @Field((type) => Int, { nullable: true })
  axisY: number;
}

@Resolver(AxisModel)
export class AxisResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  // @ResolveField()
  // getTown(@Root() axis: AxisModel): Promise<TownModel | null> {
  //   return this.prismaService.axis
  //     .findUnique({
  //       where: {
  //         id: axis.id,
  //       },
  //     })
  //     .town();
  // }
  //
  // @ResolveField()
  // getOOPT(@Root() axis: AxisModel): Promise<OoptModel | null> {
  //   return this.prismaService.axis
  //     .findUnique({
  //       where: {
  //         id: axis.id,
  //       },
  //     })
  //     .oopt();
  // }
  //
  // @ResolveField()
  // getPoint(@Root() axis: AxisModel): Promise<PointModel | null> {
  //   return this.prismaService.axis
  //     .findUnique({
  //       where: {
  //         id: axis.id,
  //       },
  //     })
  //     .point();
  // }
  //
  // @ResolveField()
  // getTrack(@Root() axis: AxisModel): Promise<TrackModel | null> {
  //   return this.prismaService.axis
  //     .findUnique({
  //       where: {
  //         id: axis.id,
  //       },
  //     })
  //     .track();
  // }

  @Query((returns) => [AxisModel] || ErrorModel, { nullable: true })
  async getAllAxises(@Context() ctx): Promise<AxisModel[] | ErrorModel> {
    try {
      return this.prismaService.axis.findMany();
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Query((returns) => AxisModel || ErrorModel, { nullable: true })
  async getAxis(
    @Args('axisUniqueInput') axisUniqueInput: AxisUniqueInput,
  ): Promise<AxisModel | ErrorModel> {
    try {
      return this.prismaService.axis.findUnique({
        where: {
          id: axisUniqueInput.id || undefined,
        },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => AxisModel || ErrorModel)
  async updateAxis(
    @Args('data') data: AxisUpdateInput,
    @Context() ctx,
  ): Promise<AxisModel | ErrorModel> {
    try {
      return this.prismaService.axis.update({
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

  @Mutation((returns) => AxisModel || ErrorModel)
  async deleteAxis(
    @Args('id') id: number,
    @Context() ctx,
  ): Promise<AxisModel | ErrorModel> {
    try {
      return this.prismaService.axis.delete({
        where: { id },
      });
    } catch (e) {
      return {
        isError: true,
        message: e.message,
      };
    }
  }

  @Mutation((returns) => AxisModel || ErrorModel)
  async createAxis(
    @Args('data') data: AxisCreateInput,
    @Context() ctx,
  ): Promise<AxisModel | ErrorModel> {
    try {
      const parent = { [data.parent]: { connect: { id: data.parentId } } };
      return this.prismaService.axis.create({
        data: {
          title: data.title || undefined,
          axisY: data.axisY || undefined,
          axisX: data.axisX || undefined,
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
