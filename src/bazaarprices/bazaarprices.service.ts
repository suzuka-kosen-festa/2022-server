import { Injectable } from '@nestjs/common';
import { BazaarPrices, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BazaarpricesService {
   constructor(private readonly prisma: PrismaService) {}

   async getAll(): Promise<BazaarPrices[]> {
      return this.prisma.bazaarPrices.findMany();
   }

   async getById(where: Prisma.BazaarPricesWhereUniqueInput): Promise<BazaarPrices | null> {
      return this.prisma.bazaarPrices.findUnique({ where });
   }

   async update(params: {
      where: Prisma.BazaarPricesWhereUniqueInput;
      data: Prisma.BazaarPricesUpdateInput;
   }): Promise<BazaarPrices> {
      const { where, data } = params;
      return this.prisma.bazaarPrices.update({ where, data });
   }

   async delete(where: Prisma.BazaarPricesWhereUniqueInput): Promise<BazaarPrices> {
      return this.prisma.bazaarPrices.delete({ where });
   }
}
