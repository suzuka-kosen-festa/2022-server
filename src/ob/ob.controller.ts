import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { OB } from '@prisma/client';
import { CreateObDto } from './dto/ob-dto';
import { ObEntity } from './entity/ob';
import { ObService } from './ob.service';

@Controller('ob')
export class ObController {
   constructor(private readonly service: ObService) {}

   @Get()
   @ApiOperation({ summary: 'OBのデータ全件取得' })
   @ApiOkResponse({ type: ObEntity, isArray: true })
   async getAllOb(): Promise<OB[]> {
      return this.service.getAll();
   }

   @Get('check/:uuid')
   @ApiOperation({ summary: 'OBのuuidの照合' })
   @ApiOkResponse({ type: ObEntity })
   async checkExistOb(@Param('uuid') uuid: string): Promise<OB> {
      return this.service.checkObExist({ obId: uuid });
   }

   @Post()
   @ApiOperation({ summary: 'OBレコードの作成' })
   @ApiCreatedResponse({ type: ObEntity })
   async createOb(data: CreateObDto): Promise<OB> {
      return this.service.create(data);
   }
}
