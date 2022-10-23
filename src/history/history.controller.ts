import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
// eslint-disable-next-line no-redeclare
import { History } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AllHistoryEntity } from './entity/history.entity';
import { HistoryService } from './history.service';

@Controller('history')
@UseGuards(JwtAuthGuard)
export class HistoryController {
   constructor(private readonly service: HistoryService) {}

   @Get()
   @ApiOperation({ summary: '全テーブルのHistoryを返す' })
   @ApiOkResponse({ type: AllHistoryEntity, isArray: true })
   async getAllHistory(): Promise<History[]> {
      return this.service.getAll();
   }
}
