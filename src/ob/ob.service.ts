import { Injectable } from '@nestjs/common';
import { OB, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ObService {
   constructor(private readonly prisma: PrismaService) {}

   async getAllOb(): Promise<OB[]> {
      return this.prisma.oB.findMany();
   }

   async getAllHistory(): Promise<OB[]> {
      return this.prisma.oB.findMany({
         include: {
            History: {
               select: {
                  timeStamp: true,
               },
            },
         },
      });
   }

   async updateTimeStamp(where: Prisma.OBWhereUniqueInput): Promise<OB> {
      return this.prisma.oB.update({
         data: {
            History: {
               create: {},
            },
         },
         where: where,
         include: {
            History: true,
         },
      });
   }

   async createOb(data: Prisma.OBCreateInput): Promise<OB> {
      return this.prisma.oB.create({ data });
   }

   async checkObExist(uuid: Prisma.OBWhereUniqueInput): Promise<OB | null> {
      await this.updateTimeStamp(uuid);
      return this.prisma.oB.findUnique({
         where: uuid,
         include: {
            History: {
               select: {
                  timeStamp: true,
               },
            },
         },
      });
   }

   async deleteOb(where: Prisma.OBWhereUniqueInput): Promise<OB> {
      return this.prisma.oB.delete({ where: where });
   }
}
