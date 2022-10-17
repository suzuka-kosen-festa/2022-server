// eslint-disable-next-line no-redeclare
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LiveEvent } from '@prisma/client';
import { CreateEventDto, UpdateEventDto } from './dto/liveEvent.sto';
import { LiveEventWithIdEntity } from './entity/liveEvent.entity';
import { LiveeventService } from './liveevent.service';

@Controller('liveevent')
export class LiveeventController {
  constructor(private readonly service : LiveeventService){}

  @Get()
  @ApiOperation({ summary: '全件取得' })
  @ApiOkResponse({ type: LiveEventWithIdEntity, isArray: true})
  async getAllSponsorCom(): Promise<LiveEvent[] | []> {
     return this.service.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'id指定で取得' })
  @ApiOkResponse({ type: LiveEventWithIdEntity })
  async getSponsorCom(@Param('id') id: string): Promise<LiveEvent | null> {
     return this.service.getById({ id: Number(id) });
  }

  @Post()
  @ApiOperation({ summary: 'レコード作成' })
  @ApiOkResponse({ type: LiveEventWithIdEntity })
  async createSponsorCom(@Body() data: CreateEventDto): Promise<LiveEvent> {
     return this.service.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'レコード更新' })
  @ApiOkResponse({ type: LiveEventWithIdEntity })
  async updateSponsorCom(@Param('id') id: string, @Body() data: UpdateEventDto): Promise<LiveEvent> {
     return this.service.update({
        where: {
           id: Number(id),
        },
        data: {
          ...data
        },
     });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'レコード削除' })
  @ApiOkResponse({ type: LiveEventWithIdEntity })
  async deleteSponsorCom(@Param('id') id: string): Promise<LiveEvent> {
     return this.service.delete({
        id: Number(id),
     });
  }
}
