/* eslint-disable no-redeclare */
import { Injectable } from '@nestjs/common';
import { History } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma : PrismaService){}

  async getAll() : Promise<History[]>{
    return this.prisma.history.findMany()
  }
}
