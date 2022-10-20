// eslint-disable-next-line no-redeclare
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OB, Prisma } from '@prisma/client';
import { createObDto, UpdateObDto } from './dto/ob.dto';
import { ObEntity, ObWithHistoryEntity } from './entity/ob.dto';
import { ObService } from './ob.service';

@ApiTags('ob')
@Controller('ob')
export class ObController {
   constructor(private readonly service: ObService) {}

   @Get()
   @ApiOperation({ summary: 'OBのデータ全件取得' })
   @ApiOkResponse({ type: ObEntity, isArray: true })
   async getAll(): Promise<OB[]> {
      return this.service.getAllOb();
   }
   @Get('/history')
   @ApiOperation({ summary: 'OBの入場履歴を返す' })
   @ApiOkResponse({ type: ObWithHistoryEntity, isArray: true })
   async getAllSponsorHistory(): Promise<OB[]> {
      return this.service.getAllHistory();
   }

   @Get('check/:uuid')
   @ApiOperation({ summary: 'OBのuuidの照合' })
   @ApiOkResponse({ type: ObWithHistoryEntity, description: '存在しない場合はnullを返す' })
   async checkUuid(@Param('uuid') uuid: string): Promise<OB | null> {
      return this.service.checkObExist({ obId: uuid });
   }

   @Get(':name')
   @ApiOperation({ summary: 'OBを名前で検索' })
   @ApiOkResponse({ type: ObEntity, description: '存在しない場合はnullを返す' })
   async searchObByName(@Param('name') name: string): Promise<OB[] | null> {
      return this.service.searchByName({ name });
   }

   @Post()
   @ApiOperation({ summary: 'OBレコードの作成' })
   @ApiCreatedResponse({ type: ObEntity })
   async create(@Body() data: createObDto): Promise<OB> {
      return this.service.createOb(data);
   }

   @Post("many")
   @ApiOperation({ summary : "OBレコードの複数作成"})
   async createManyOB(@Body() data : Prisma.OBCreateManyInput) : Promise<Prisma.BatchPayload> {
      return this.service.createMany(data)
   }


   @Put(":uuid")
   @ApiOperation({ summary : "OBレコードの更新" })
   @ApiOkResponse({ type: ObEntity })
   async updateOb(@Param("uuid") uuid : string ,@Body() data : UpdateObDto) : Promise<OB> {
      return this.service.update({where:{obId : uuid} , data})
   }

   @Delete(':uuid')
   @ApiOperation({ summary: 'OBレコードの削除' })
   @ApiResponse({ type: ObEntity })
   async delete(@Param('uuid') uuid: string): Promise<OB> {
      return this.service.deleteOb({ obId: uuid });
   }

   @Delete()
   @ApiOperation({ summary: 'OBレコードを全削除' })
   async deleteAllOb(): Promise<Prisma.BatchPayload> {
      return this.service.deleteAll();
   }
}
