// eslint-disable-next-line no-redeclare
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Bazaar, BazaarType, Prisma } from '@prisma/client';
import { BazaarWithId, BazaarWithoutId } from '../types/bazaar';
import { BazaarService } from './bazaar.service';
import { CreateBazaarDto, UpdateBazaarDto } from './dto/bazaar.dto';
import { BazaarEntity, BazaarWithoutIdEntity } from './entity/bazaar.entity';

@ApiTags('Bazaar')
@Controller('bazaar')
export class BazaarController {
   constructor(private readonly service: BazaarService) {}

   @Get()
   @ApiOperation({ summary: 'すべてのレコードのデータを返す' })
   @ApiOkResponse({ type: BazaarEntity, isArray: true })
   async getAllBazaar(): Promise<BazaarWithId[] | []> {
      return this.service.getAll();
   }

   @Get(':id')
   @ApiOperation({ summary: 'レコードをIDによって取得' })
   @ApiOkResponse({ type: BazaarEntity })
   async getBazaarById(@Param('id') id: string): Promise<Bazaar | null> {
      return this.service.getById({ id: Number(id) });
   }

   @Get('data/:type')
   @ApiOperation({ summary: 'レコードをtypeによって取得' })
   @ApiOkResponse({ type: BazaarWithoutIdEntity, isArray: true })
   async getBazzarByType(@Param('type') type: BazaarType): Promise<BazaarWithoutId[] | []> {
      return this.service.getByType({ group_type: type });
   }

   @Post()
   @ApiOperation({ summary: 'レコードの作成' })
   @ApiCreatedResponse({ type: BazaarEntity })
   async createBazaar(@Body() data: CreateBazaarDto): Promise<Bazaar> {
      return this.service.create(data);
   }

   @Post('many')
   @ApiOperation({ summary: 'レコードを複数を作成' })
   async createManyBazaar(data: Prisma.BazaarCreateManyInput): Promise<Prisma.BatchPayload> {
      return this.service.createMany(data);
   }

   @Put(':id')
   @ApiOperation({ summary: 'レコードのアップデート' })
   @ApiOkResponse({ type: BazaarEntity })
   async updateBazaar(@Param('id') id: string, @Body() data: UpdateBazaarDto): Promise<Bazaar> {
      return this.service.update({ where: { id: Number(id) }, data });
   }

   @Delete(':id')
   @ApiOperation({ summary: 'レコードの削除' })
   @ApiOkResponse({ type: BazaarEntity })
   async deleteBazaar(@Param('id') id: string): Promise<Bazaar> {
      return this.service.delete({ id: Number(id) });
   }

   @Delete()
   @ApiOperation({ summary: 'レコードを全削除' })
   async deleteAllBazaar(): Promise<Prisma.BatchPayload> {
      return this.service.deleteAll();
   }
}
