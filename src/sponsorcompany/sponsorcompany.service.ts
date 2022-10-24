import { Injectable } from '@nestjs/common';
import { Prisma, SponsorCompany } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SponsorcompanyService {
   constructor(private readonly prisma: PrismaService) {}

   async getAll(): Promise<SponsorCompany[]> {
      return this.prisma.sponsorCompany.findMany();
   }

   async getById(where: Prisma.SponsorCompanyWhereUniqueInput): Promise<SponsorCompany | null> {
      return this.prisma.sponsorCompany.findUnique({
         where,
      });
   }

   async create(data: Prisma.SponsorCompanyCreateInput): Promise<SponsorCompany> {
      return this.prisma.sponsorCompany.create({
         data,
      });
   }

   async createMany(data: Prisma.SponsorCompanyCreateManyInput): Promise<Prisma.BatchPayload> {
      return this.prisma.sponsorCompany.createMany({ data });
   }

   async update(params: {
      where: Prisma.SponsorCompanyWhereUniqueInput;
      data: Prisma.SponsorCompanyUpdateInput;
   }): Promise<SponsorCompany> {
      const { where, data } = params;
      return this.prisma.sponsorCompany.update({
         where,
         data,
      });
   }

   async delete(where: Prisma.SponsorCompanyWhereUniqueInput): Promise<SponsorCompany> {
      return this.prisma.sponsorCompany.delete({
         where,
      });
   }

   async deleteAll(): Promise<Prisma.BatchPayload> {
      return this.prisma.sponsorCompany.deleteMany();
   }
}
