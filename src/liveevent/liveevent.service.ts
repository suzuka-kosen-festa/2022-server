import { Injectable } from '@nestjs/common';
import { LiveEvent, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { formatEvent } from './lib/format';
import { SeparationEventList } from './types';

@Injectable()
export class LiveeventService {
   constructor(private readonly prisma: PrismaService) {}

   async getAll(): Promise<SeparationEventList> {
      const allData = await this.prisma.liveEvent.findMany();
      const object = formatEvent(
         allData.sort((a, b) => {
            return a.start_time > b.start_time ? 1 : -1;
         }),
      );

      return object;
   }

   async getByDate(date: Prisma.LiveEventWhereInput): Promise<LiveEvent[]> {
      return this.prisma.liveEvent.findMany({ where: date });
   }

   async getNearTime(): Promise<SeparationEventList> {
      // replaceせんくてもいい方法あったら教えてください
      // -> yyyy-MM-dd 形式で出るformatがあれば教えてください
      const date = new Date().toLocaleString('ja', { timeZone: 'Asia/Tokyo' });
      const now = date.replace(/\//g, '-');
      const allData = await this.prisma.liveEvent.findMany();
      const sortData = (
         allData.flatMap((data) => {
            return now < data.date ? data : [];
         }) as LiveEvent[]
      ).sort((a, b) => {
         return a.start_time > b.start_time ? 1 : -1;
      });

      const object = formatEvent(sortData.slice(0, 4));

      return object;
   }

   async getById(where: Prisma.SponsorCompanyWhereUniqueInput): Promise<LiveEvent | null> {
      return this.prisma.liveEvent.findUnique({
         where,
      });
   }

   async create(data: Prisma.LiveEventCreateInput): Promise<LiveEvent> {
      return this.prisma.liveEvent.create({
         data,
      });
   }

   async update(params: {
      where: Prisma.LiveEventWhereUniqueInput;
      data: Prisma.LiveEventUpdateInput;
   }): Promise<LiveEvent> {
      const { where, data } = params;
      return this.prisma.liveEvent.update({
         where,
         data,
      });
   }

   async delete(where: Prisma.LiveEventWhereUniqueInput): Promise<LiveEvent> {
      return this.prisma.liveEvent.delete({
         where,
      });
   }
}
