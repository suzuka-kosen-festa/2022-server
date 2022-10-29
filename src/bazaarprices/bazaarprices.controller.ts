// eslint-disable-next-line no-redeclare
import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BazaarPrices } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BazaarEntity } from '../bazaar/entity/bazaar.entity';
import { BazaarpricesService } from './bazaarprices.service';
import { UpdatePricesDto } from './dto/bazaarprices.dto';
import { BazaarPricesEntity } from './entity/bazaarprices.entity';

@ApiTags('bazaarprices')
@UseGuards(JwtAuthGuard)
@Controller('bazaarprices')
export class BazaarpricesController {
   constructor(private readonly service: BazaarpricesService) {}

   @Get()
   @ApiOperation({ summary: 'レコードを全件返す' })
   @ApiOkResponse({ type: BazaarPricesEntity, isArray: true })
   async getAllBazaarPrices(): Promise<BazaarPrices[]> {
      return this.service.getAll();
   }

   @Get(':id')
   @ApiOperation({ summary: 'idで取得' })
   @ApiOkResponse({ type: BazaarEntity })
   async getBazaarPricesById(@Param('id') id: string): Promise<BazaarPrices | null> {
      return this.service.getById({ id: Number(id) });
   }

   // @Put(':id')
   // @ApiOperation({ summary: 'idで更新' })
   // @ApiOkResponse({ type: BazaarEntity })
   // async updateBazaarPrices(@Param('id') id: string, @Body() data: UpdatePricesDto): Promise<BazaarPrices> {
   //    return this.service.update({ where: { id: Number(id) }, data });
   // }

   // @Delete('/id/:id')
   // @ApiOperation({ summary: 'レコードの削除' })
   // @ApiOkResponse({ type: BazaarEntity })
   // async deleteBazaarPrices(@Param('id') id: string): Promise<BazaarPrices> {
   //    return this.service.delete({ id: Number(id) });
   // }
}
