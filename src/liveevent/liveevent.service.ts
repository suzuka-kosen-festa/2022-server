import { Injectable } from '@nestjs/common';
import { LiveEvent, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { dateSort, filterAndGetInterval, formatEvent } from './lib/format';
import { EventInterval, SeparationEventList } from '../types/liveevent';

@Injectable()
export class LiveeventService {
   constructor(private readonly prisma: PrismaService) {}

   async getAll(): Promise<SeparationEventList> {
      const allData = await this.prisma.liveEvent.findMany();
      const object = formatEvent(allData);

      return object;
   }

   async getByDate(where: Prisma.LiveEventWhereInput): Promise<SeparationEventList | null> {
      const allData = await this.prisma.liveEvent.findMany({
         select: {
            title: true,
            venue: true,
            descriptions: true,
            date: true,
            stage: true,
            start_time: true,
            end_time: true,
         },
      });

      const filterData = dateSort(allData, where.date as string);
      return formatEvent(filterData);
   }

   async getEventInterval(where: Prisma.LiveEventWhereInput): Promise<EventInterval> {
      const allData = await this.prisma.liveEvent.findMany();
      const filterData = dateSort(allData, where.date as string);
      return filterAndGetInterval(filterData);
   }

   async getNearTime(): Promise<LiveEvent[]> {
      // replaceせんくてもいい方法あったら教えてください
      // -> yyyy-MM-dd 形式で出るformatがあれば教えてください
      const date = new Date().toLocaleString('ja', { timeZone: 'Asia/Tokyo' });
      const now = date.replace(/\//g, '-');
      const allData = await this.prisma.liveEvent.findMany({
         select: {
            title: true,
            venue: true,
            descriptions: true,
            date: true,
            stage: true,
            start_time: true,
            end_time: true,
         },
      });
      const sortData = (
         allData.flatMap((data) => {
            return now < data.date ? data : [];
         }) as LiveEvent[]
      ).sort((a, b) => {
         return a.start_time > b.start_time ? 1 : -1;
      });

      return sortData.slice(0, 4);
   }

   async getById(where: Prisma.LiveEventWhereUniqueInput): Promise<LiveEvent | []> {
      return this.prisma.liveEvent.findUnique({
         where,
      });
   }

   async create(data: Prisma.LiveEventCreateInput): Promise<LiveEvent> {
      return this.prisma.liveEvent.create({
         data,
      });
   }

   async createMany(data: Prisma.LiveEventCreateManyInput): Promise<Prisma.BatchPayload> {
      return this.prisma.liveEvent.createMany({ data });
   }

   async update(params: {
      where: Prisma.LiveEventWhereUniqueInput;
      data: Prisma.LiveEventUpdateInput;
   }): Promise<LiveEvent> {
      return this.prisma.liveEvent.update(params);
   }

   async delete(where: Prisma.LiveEventWhereUniqueInput): Promise<LiveEvent> {
      return this.prisma.liveEvent.delete({
         where,
      });
   }

   async deleteAll(): Promise<Prisma.BatchPayload> {
      return this.prisma.liveEvent.deleteMany();
   }
}
