import { Injectable } from '@nestjs/common';
import { OB, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ObService {
   constructor(private readonly prisma: PrismaService) {}

   async getall(): Promise<OB[]> {
      return this.prisma.oB.findMany();
   }

   async create(data: Prisma.OBCreateInput): Promise<OB> {
      return this.prisma.oB.create({ data });
   }

   async checkObExist(uuid: Prisma.OBWhereUniqueInput): Promise<OB> {
      return this.prisma.oB.findUnique({
         where: uuid,
      });
   }
}
