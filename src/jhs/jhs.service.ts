import { Injectable } from '@nestjs/common';
import { Guest, JHStudent, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JhsService {
   constructor(private readonly prisma: PrismaService) {}

   async getAllJhs(): Promise<
      (JHStudent & {
         parents: Guest[];
      })[]
   > {
      return this.prisma.jHStudent.findMany({
         include: {
            parents: true,
         },
      });
   }

   async checkJhsExist(uuid: Prisma.JHStudentWhereUniqueInput): Promise<JHStudent | null> {
      await this.updateTimeStamp(uuid);
      return this.prisma.jHStudent.findUnique({
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

   async getAllHistory(): Promise<JHStudent[]> {
      return this.prisma.jHStudent.findMany({
         include: {
            History: {
               select: {
                  timeStamp: true,
               },
            },
         },
      });
   }

   async updateTimeStamp(where: Prisma.JHStudentWhereUniqueInput): Promise<JHStudent> {
      return this.prisma.jHStudent.update({
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

   async createJhs(data: Prisma.JHStudentCreateInput): Promise<JHStudent> {
      return this.prisma.jHStudent.create({
         data,
      });
   }

   async updateJhs(params: {
      where: Prisma.JHStudentWhereUniqueInput;
      data: Prisma.JHStudentUpdateInput;
   }): Promise<JHStudent> {
      const { where, data } = params;
      return this.prisma.jHStudent.update({
         where: where,
         data: data,
         include: {
            parents: true,
         },
      });
   }

   async deleteJhs(where: Prisma.JHStudentWhereUniqueInput): Promise<JHStudent> {
      return this.prisma.jHStudent.delete({ where: where });
   }
}
