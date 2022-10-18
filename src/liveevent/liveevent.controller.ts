// eslint-disable-next-line no-redeclare
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LiveEvent } from '@prisma/client';
import { CreateEventDto, UpdateEventDto } from './dto/liveEvent.sto';
import { LiveEventWithIdEntity, SeparationEventListEntity } from './entity/liveEvent.entity';
import { LiveeventService } from './liveevent.service';
import { SeparationEventList } from './types';

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
   @ApiOkResponse({ type: SeparationEventListEntity })
   async getNearEvent(): Promise<SeparationEventList> {
      return this.service.getNearTime();
   }

   @Get(':id')
   @ApiOperation({ summary: 'id指定で取得' })
   @ApiOkResponse({ type: LiveEventWithIdEntity })
   async getEvent(@Param('id') id: string): Promise<LiveEvent | null> {
      return this.service.getById({ id: Number(id) });
   }

   @Post()
   @ApiOperation({ summary: 'レコード作成' })
   @ApiOkResponse({ type: LiveEventWithIdEntity })
   async createEvent(@Body() data: CreateEventDto): Promise<LiveEvent> {
      return this.service.create(data);
   }

   @Put(':id')
   @ApiOperation({ summary: 'レコード更新' })
   @ApiOkResponse({ type: LiveEventWithIdEntity })
   async updateEvent(@Param('id') id: string, @Body() data: UpdateEventDto): Promise<LiveEvent> {
      return this.service.update({
         where: {
            id: Number(id),
         },
         data: {
            ...data,
         },
      });
   }

   @Delete(':id')
   @ApiOperation({ summary: 'レコード削除' })
   @ApiOkResponse({ type: LiveEventWithIdEntity })
   async deleteEvent(@Param('id') id: string): Promise<LiveEvent> {
      return this.service.delete({
         id: Number(id),
      });
   }
}
