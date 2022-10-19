import { Controller, Get, Param, Put  } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BazaarPrices } from '@prisma/client';
import { BazaarEntity } from '../bazaar/entity/bazaar.entity';
import { BazaarpricesService } from './bazaarprices.service';
import { BazaarPricesEntity } from './entity/bazaarprices.entity';

@Controller('bazaarprices')
export class BazaarpricesController {
  constructor(private readonly service : BazaarpricesService){}

  @Get()
  @ApiOperation({summary:"レコードを全件返す"})
  @ApiOkResponse({ type : BazaarPricesEntity , isArray : true})
  async getAllBazaarPrices() : Promise<BazaarPrices[]>{
    return this.service.getAll()
  }

  @Get(":id")
  @ApiOperation({ summary: "idで取得" })
  @ApiOkResponse({ type : BazaarEntity })
  async getBazaarPricesById(@Param("id") id : string) : Promise<BazaarPrices>{
    return this.service.getById({id : Number(id)})
  }

  @Put(':id')
  @ApiOperation({ summary : "レコードの更新" })
  @ApiOkResponse({ type : BazaarEntity})
  async updateBazaarPrices(@Param('id') id : string) : Promise<BazaarPrices>{
    return this.service.delete({id : Number(id)})
  }
}
