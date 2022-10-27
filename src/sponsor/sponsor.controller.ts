// eslint-disable-next-line no-redeclare
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Prisma, Sponsor } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { createSponsorDto, UpdateSponsorDto } from './dto/sponsor.dto';
import { SponsorEntity, SponsorWithHistoryEntity } from './entity/sponsor.entity';
import { SponsorService } from './sponsor.service';

@ApiTags('sponsor')
@Controller('sponsor')
export class SponsorController {
   constructor(private readonly service: SponsorService) {}

   @Get()
   @ApiOperation({ summary: 'Sponsorのレコードを全件返す' })
   @ApiOkResponse({ type: SponsorEntity })
   async getAll(): Promise<Sponsor[]> {
      return this.service.getAllSponsor();
   }

   @Get('history')
   @ApiOperation({ summary: 'Sponsorの入場履歴を返す' })
   @ApiOkResponse({ type: SponsorWithHistoryEntity, isArray: true })
   async getAllSponsorHistory(): Promise<Sponsor[]> {
      return this.service.getAllHistory();
   }

   @Get('check/:uuid')
   @ApiOperation({ summary: 'uuidの照合' })
   @ApiOkResponse({ type: SponsorWithHistoryEntity, description: '存在しない場合はnullを返す' })
   async checkUuid(@Param('uuid') uuid: string): Promise<Sponsor | null> {
      return this.service.checkSponsorExist({ sponsorId: uuid });
   }

   @Get(':name')
   @ApiOperation({ summary: 'スポンサーを名前で検索' })
   @ApiOkResponse({ type: SponsorEntity, isArray: true })
   async searchSpoonsorByName(@Param('name') name: string): Promise<Sponsor[] | null> {
      return this.service.searchByName({ name: name });
   }

   @Post()
   @ApiOperation({ summary: 'Sponsorレコードの生成' })
   @ApiCreatedResponse({ type: SponsorEntity })
   async create(@Body() data: createSponsorDto): Promise<Sponsor | null> {
      return this.service.createSponsor(data);
   }

   @Post('many')
   @ApiOperation({ summary: 'Sponsorレコードを複数作成' })
   async createManySponosr(@Body() data: Prisma.SponsorCreateManyInput): Promise<Prisma.BatchPayload> {
      return this.service.createManySponsor(data);
   }

   @Put(':uuid')
   @ApiOperation({ summary: 'レコードの更新' })
   @ApiOkResponse({ type: SponsorEntity })
   async update(@Param('uuid') uuid: string, @Body() data: UpdateSponsorDto): Promise<Sponsor> {
      return this.service.update({ where: { sponsorId: uuid }, data });
   }

   @Delete('/id/:uuid')
   @ApiOperation({ summary: 'Sponsorレコードの削除' })
   @ApiOkResponse({ type: SponsorEntity })
   async delete(@Param('uuid') uuid: string): Promise<Sponsor> {
      return this.service.deleteSponsor({ sponsorId: uuid });
   }

   @Delete('/all')
   @ApiOperation({ summary: '全削除' })
   async deleteAllSponsor(): Promise<Prisma.BatchPayload> {
      return this.service.deleteAll();
   }
}
