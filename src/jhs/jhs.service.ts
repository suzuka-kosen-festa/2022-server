import { Injectable } from '@nestjs/common';
import { JHStudent, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JhsService {
  constructor(private readonly prisma : PrismaService){}

  // async getAllJhs
  
  async createJhs(data : Prisma.JHStudentCreateInput): Promise<JHStudent> {
    return this.prisma.jHStudent.create({
      data
    })
  }

}
