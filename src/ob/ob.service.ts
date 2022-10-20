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

   async searchByName(name: Prisma.OBWhereInput): Promise<OB[] | null> {
      return this.prisma.oB.findMany({
         where: name,
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

   async update(params : { where: Prisma.OBWhereUniqueInput ,data : Prisma.OBUpdateInput}) : Promise<OB>{
      return this.prisma.oB.update(params)
   }

   async createMany(data : Prisma.OBCreateManyInput) : Promise<Prisma.BatchPayload> {
      return this.prisma.oB.createMany({data})
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

   async deleteAll(): Promise<Prisma.BatchPayload> {
      return this.prisma.oB.deleteMany();
   }
}
