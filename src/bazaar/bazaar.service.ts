import { Injectable } from '@nestjs/common';
import { Bazaar, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BazaarWithId, BazaarWithoutId } from '../types/bazaar';

@Injectable()
export class BazaarService {
   constructor(private readonly prisma: PrismaService) {}

   async getAll(): Promise<BazaarWithId[] | []> {
      return this.prisma.bazaar.findMany({
         include: {
            prices: true,
         },
      });
   }

   async getByType(grouptype: Prisma.BazaarWhereInput): Promise<BazaarWithoutId[] | []> {
      return this.prisma.bazaar.findMany({
         where: grouptype,
         select: {
            name: true,
            descriptions: true,
            image: true,
            prices: true,
            group: true,
            group_type: true,
         },
      });
   }

   async getById(where: Prisma.BazaarWhereUniqueInput): Promise<Bazaar | null> {
      return this.prisma.bazaar.findUnique({ where });
   }

   async create(data: Prisma.BazaarCreateInput): Promise<Bazaar> {
      return this.prisma.bazaar.create({ data, include: { prices: true } });
   }

   async createMany(data: Prisma.BazaarCreateManyInput): Promise<Prisma.BatchPayload> {
      return this.prisma.bazaar.createMany({ data });
   }

   async update(params: { where: Prisma.BazaarWhereUniqueInput; data: Prisma.BazaarUpdateInput }): Promise<Bazaar> {
      const { where, data } = params;
      return this.prisma.bazaar.update({
         where,
         data,
         include: {
            prices: true,
         },
      });
   }

   async delete(where: Prisma.BazaarWhereUniqueInput): Promise<Bazaar> {
      return this.prisma.bazaar.delete({ where });
   }

   async deleteAll(): Promise<Prisma.BatchPayload> {
      return this.prisma.bazaar.deleteMany();
   }
}
