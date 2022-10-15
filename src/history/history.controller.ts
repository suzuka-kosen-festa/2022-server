import { Controller, Get } from '@nestjs/common';
// eslint-disable-next-line no-redeclare
import { History } from '@prisma/client';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
   constructor(private readonly service: HistoryService) {}

   @Get()
   async getAllHistory(): Promise<History[]> {
      return this.service.getAll();
   }
}
