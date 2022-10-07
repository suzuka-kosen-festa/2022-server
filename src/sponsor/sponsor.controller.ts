// eslint-disable-next-line no-redeclare
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Sponsor } from '@prisma/client';
import { createSponsorDto } from './dto/sponsor.dto';
import { SponsorEntity } from './entity/sponsor.entity';
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

   @Get('check/:uuid')
   @ApiOperation({ summary: 'uuidの照合' })
   @ApiOkResponse({ type: SponsorEntity, description: '存在しない場合はnullを返す' })
   async checkUuid(@Param('uuid') uuid: string): Promise<Sponsor | null> {
      return this.service.checkSponsorExist({ sponsorId: uuid });
   }

   @Post()
   @ApiOperation({ summary: 'Sponsorレコードの生成' })
   @ApiCreatedResponse({ type: SponsorEntity })
   async create(@Body() data: createSponsorDto): Promise<Sponsor | null> {
      return this.service.createSponsor(data);
   }

   @Delete(':uuid')
   @ApiOperation({ summary: 'Sponsorレコードの削除' })
   @ApiOkResponse({ type: SponsorEntity })
   async delete(@Param('uuid') uuid: string): Promise<Sponsor> {
      return this.service.deleteSponsor({ sponsorId: uuid });
   }
}
