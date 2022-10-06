import { Injectable } from '@nestjs/common';
import { Prisma, Sponsor } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SponsorService {
  constructor(private readonly prisma : PrismaService){}

  async getAllSponsor() : Promise<Sponsor[]>{
    return this.prisma.sponsor.findMany()
  }
  
  async createSponsor(data : Prisma.SponsorCreateInput) : Promise<Sponsor>{
    return this.prisma.sponsor.create({data})
  }

  async deleteSponsor(wehere: Prisma.SponsorWhereUniqueInput) : Promise<Sponsor>{
    return this.prisma.sponsor.delete({where: wehere})
  }
}