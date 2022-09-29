import { Injectable } from '@nestjs/common';
import { Guest, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GuestService {
  constructor( private readonly prisma : PrismaService){}

  // ゲストは単独で存在してはいけないため(ホストとなるレコードが必要)、必要な関数はこれだけ

  // Guestのデータの全件取得
  async getAllGuests() : Promise<Guest[]> {
    return this.prisma.guest.findMany()
  }

  //uuidの照合
  async checkGuestExist(data : Prisma.GuestWhereUniqueInput): Promise<Guest>{
    return this.prisma.guest.findUnique({
      where: data
    })
  }
}
