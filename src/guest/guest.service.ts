import { Injectable } from '@nestjs/common';
import { Guest, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GuestService {
   constructor(private readonly prisma: PrismaService) {}

   // ゲストは単独で存在してはいけないため(ホストとなるレコードが必要)、createは作らない

   // Guestのデータの全件取得
   async getAllGuests(): Promise<Guest[]> {
      return this.prisma.guest.findMany();
   }

   async getAllHistory(): Promise<Guest[]> {
      return this.prisma.guest.findMany({
         include: {
            History: {
               select: {
                  timeStamp: true,
               },
            },
         },
      });
   }

   async updateTimeStamp(where: Prisma.GuestWhereUniqueInput): Promise<Guest> {
      return this.prisma.guest.update({
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

   //uuidの照合
   async checkGuestExist(uuid: Prisma.GuestWhereUniqueInput): Promise<Guest | null> {
      await this.updateTimeStamp(uuid);
      return this.prisma.guest.findUnique({
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

   async deleteGuest(where: Prisma.GuestWhereUniqueInput): Promise<Guest> {
      return this.prisma.guest.delete({ where: where });
   }
}
