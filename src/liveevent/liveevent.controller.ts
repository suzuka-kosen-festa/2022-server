// eslint-disable-next-line no-redeclare
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LiveEvent, Prisma } from '@prisma/client';
import { CreateEventDto, UpdateEventDto } from './dto/liveEvent.sto';
import {
   EventIntervalEntity,
   LiveEventEntity,
   LiveEventWithIdEntity,
   SeparationEventListEntity,
} from './entity/liveEvent.entity';
import { LiveeventService } from './liveevent.service';
import { EventInterval, SeparationEventList } from '../types/liveevent';

@ApiTags('LiveEvent')
@Controller('liveevent')
export class LiveeventController {
   constructor(private readonly service: LiveeventService) {}

   @Get()
   @ApiOperation({ summary: '全件取得' })
   @ApiOkResponse({ type: SeparationEventListEntity })
   async getAllEvent(): Promise<SeparationEventList | {}> {
      return this.service.getAll();
   }

   @Get('near')
   @ApiOperation({ summary: '直近4件取得' })
   @ApiOkResponse({ type: LiveEventEntity, isArray: true })
   async getNearEvent(): Promise<LiveEvent[]> {
      return this.service.getNearTime();
   }

   @Get(':date')
   @ApiOperation({ summary: 'dateで取得' })
   @ApiOkResponse({ type: LiveEventWithIdEntity })
   async getEventBydate(@Param('date') date: string) {
      return this.service.getByDate({ date });
   }

   @Get('interval/:date')
   @ApiOperation({ summary: 'イベントの間隔を取得' })
   @ApiOkResponse({ type: EventIntervalEntity })
   async getEventInterval(@Param('date') date: string): Promise<EventInterval> {
      return this.service.getEventInterval({ date });
   }

   @Get('/id/:id')
   @ApiOperation({ summary: 'id指定で取得' })
   @ApiOkResponse({ type: LiveEventWithIdEntity })
   async getEvent(@Param('id') id: string): Promise<LiveEvent | []> {
      return this.service.getById({ id: Number(id) });
   }

   // @Post()
   // @ApiOperation({ summary: 'レコード作成' })
   // @ApiOkResponse({ type: LiveEventWithIdEntity })
   // async createEvent(@Body() data: CreateEventDto): Promise<LiveEvent> {
   //    return this.service.create(data);
   // }

   // @Post('many')
   // @ApiOperation({ summary: 'レコードを複数作成' })
   // async createManyEvent(@Body() data: Prisma.LiveEventCreateManyInput): Promise<Prisma.BatchPayload> {
   //    return this.service.createMany(data);
   // }

   // @Put(':id')
   // @ApiOperation({ summary: 'レコード更新' })
   // @ApiOkResponse({ type: LiveEventWithIdEntity })
   // async updateEvent(@Param('id') id: string, @Body() data: UpdateEventDto): Promise<LiveEvent> {
   //    return this.service.update({
   //       where: {
   //          id: Number(id),
   //       },
   //       data: {
   //          ...data,
   //       },
   //    });
   // }

   // @Delete('/id/:id')
   // @ApiOperation({ summary: 'レコード削除' })
   // @ApiOkResponse({ type: LiveEventWithIdEntity })
   // async deleteEvent(@Param('id') id: string): Promise<LiveEvent> {
   //    return this.service.delete({
   //       id: Number(id),
   //    });
   // }

   // @Delete('/all')
   // @ApiOperation({ summary: 'レコードの全削除' })
   // async deleteAllEvent(): Promise<Prisma.BatchPayload> {
   //    return this.service.deleteAll();
   // }
}
