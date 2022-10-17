import { Injectable } from '@nestjs/common';
import { LiveEvent, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LiveeventService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<LiveEvent[]> {
     return this.prisma.liveEvent.findMany();
  }

  async getById(where: Prisma.SponsorCompanyWhereUniqueInput): Promise<LiveEvent | null> {
     return this.prisma.liveEvent.findUnique({
        where,
     });
  }

  async create(data: Prisma.LiveEventCreateInput): Promise<LiveEvent> {
     return this.prisma.liveEvent.create({
        data,
     });
  }

  async update(params: {
     where: Prisma.LiveEventWhereUniqueInput,
     data: Prisma.LiveEventUpdateInput
  }): Promise<LiveEvent> {
     const { where, data } = params;
     return this.prisma.liveEvent.update({
        where,
        data,
     });
  }

  async delete(where: Prisma.LiveEventWhereUniqueInput): Promise<LiveEvent> {
     return this.prisma.liveEvent.delete({
        where,
     });
  }
}
