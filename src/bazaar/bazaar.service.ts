import { Injectable } from '@nestjs/common';
import { Bazaar, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BazaarWithoutId } from '../types/bazaar';

@Injectable()
export class BazaarService {
   constructor(private readonly prisma: PrismaService) {}

   async getAll(): Promise<Bazaar[]> {
      return this.prisma.bazaar.findMany();
   }

   async getByType(grouptype: Prisma.BazaarWhereInput): Promise<BazaarWithoutId[]> {
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

   async getById (where : Prisma.BazaarWhereUniqueInput) : Promise<Bazaar>{
      return this.prisma.bazaar.findUnique({where})
   } 

   async create(data: Prisma.BazaarCreateInput): Promise<Bazaar> {
      return this.prisma.bazaar.create({ data });
   }

   async update(where: Prisma.BazaarWhereUniqueInput, data: Prisma.BazaarUpdateInput): Promise<Bazaar> {
      return this.prisma.bazaar.update({
         where,
         data,
      });
   }

   async delete(where: Prisma.BazaarWhereUniqueInput): Promise<Bazaar> {
      return this.prisma.bazaar.delete({ where });
   }
}
