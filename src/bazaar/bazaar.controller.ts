// eslint-disable-next-line no-redeclare
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Bazaar, BazaarType, Prisma } from '@prisma/client';
import { BazaarWithoutId } from '../types/bazaar';
import { BazaarService } from './bazaar.service';

@Controller('bazaar')
export class BazaarController {
   constructor(private readonly service: BazaarService) {}

   @Get()
   async getAllBazaar(): Promise<Bazaar[]> {
      return this.service.getAll();
   }

   @Get(':id')
   async getBazaarById(@Param('id') id: string): Promise<Bazaar> {
      return this.service.getById({ id: Number(id) });
   }

   @Get('data/:type')
   async getBazzarByType(@Param('type') type: BazaarType): Promise<BazaarWithoutId[]> {
      return this.service.getByType({ group_type: type });
   }

   @Post()
   async createBazaar(@Body() data: Prisma.BazaarCreateInput): Promise<Bazaar> {
      return this.service.create(data);
   }

   @Put(':id')
   async updateBazzar(@Param('id') id: string, @Body() data: Prisma.BazaarUpdateInput): Promise<Bazaar> {
      return this.service.update({ where: { id: Number(id) }, data });
   }

   @Delete(':id')
   async deleteBazaar(@Param('id') id: string): Promise<Bazaar> {
      return this.service.delete({ id: Number(id) });
   }
}
