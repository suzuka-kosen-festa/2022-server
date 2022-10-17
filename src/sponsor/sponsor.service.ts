import { Injectable } from '@nestjs/common';
import { Prisma, Sponsor } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SponsorService {
   constructor(private readonly prisma: PrismaService) {}

   async getAllSponsor(): Promise<Sponsor[]> {
      return this.prisma.sponsor.findMany();
   }

   async createSponsor(data: Prisma.SponsorCreateInput): Promise<Sponsor> {
      return this.prisma.sponsor.create({ data });
   }

   async checkSponsorExist(where: Prisma.SponsorWhereUniqueInput): Promise<Sponsor | null> {
      await this.updateTimeStamp(where);
      return this.prisma.sponsor.findUnique({
         where: where,
         include: {
            History: {
               select: {
                  timeStamp: true,
               },
            },
         },
      });
   }

   async searchByName(name: Prisma.SponsorWhereInput): Promise<Sponsor[] | null> {
      return this.prisma.sponsor.findMany({
         where: name,
      });
   }

   async getAllHistory(): Promise<Sponsor[]> {
      return this.prisma.sponsor.findMany({
         include: {
            History: {
               select: {
                  timeStamp: true,
               },
            },
         },
      });
   }

   async updateTimeStamp(where: Prisma.SponsorWhereUniqueInput): Promise<Sponsor> {
      return this.prisma.sponsor.update({
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

   async deleteSponsor(where: Prisma.SponsorWhereUniqueInput): Promise<Sponsor> {
      return this.prisma.sponsor.delete({ where: where });
   }
}
