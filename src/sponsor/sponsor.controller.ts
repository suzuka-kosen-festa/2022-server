// eslint-disable-next-line no-redeclare
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Sponsor } from '@prisma/client';
import { createSponsorDto } from './dto/sponsorDto';
import { SponsorEntity } from './entity/sponsor';
import { SponsorService } from './sponsor.service';

@Controller('sponsor')
export class SponsorController {
  constructor(private readonly service : SponsorService){}

  @Get()
  @ApiOperation({summary:"Sponsorのレコードを全件返す"})
  @ApiOkResponse({type: SponsorEntity})
  async getAll() : Promise<Sponsor[]> {
    return this.service.getAllSponsor()
  }

  @Post()
  @ApiOperation({summary:"Sponsorレコードの生成"})
  @ApiCreatedResponse({type: SponsorEntity})
  async create(@Body() data : createSponsorDto) : Promise<Sponsor>{
    return this.service.createSponsor(data)
  }

  @Delete(':uuid')
  @ApiOperation({summary:"Sponsorレコードの削除"})
  @ApiOkResponse({type: SponsorEntity})
  async delete(@Param("uuid") uuid : string): Promise<Sponsor>{
    return this.service.deleteSponsor({sponsorId: uuid})
  }
}
