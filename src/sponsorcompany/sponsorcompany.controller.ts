// eslint-disable-next-line no-redeclare
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SponsorCompany } from '@prisma/client';
import { CreateSponsorComDto, UpdateSponsorComDto } from './dto/sponsorCompany.dto';
import { SponsorComEntity } from './entity/sponsorCom.entity';
import { SponsorcompanyService } from './sponsorcompany.service';

@ApiTags('SponsorCompany')
@Controller('sponsorcompany')
export class SponsorcompanyController {
  constructor(private readonly service : SponsorcompanyService){}

  @Get()
  @ApiOperation({ summary : "全件取得" })
  @ApiOkResponse({ type : SponsorComEntity, isArray: true})
  async getAllSponsorCom() : Promise<SponsorCompany[] | []> {
    return this.service.getAll()
  }

  @Get(":id")
  @ApiOperation({ summary : "id指定で取得" })
  @ApiOkResponse({ type : SponsorComEntity })
  async getSponsorCom(@Param("id") id : number) : Promise<SponsorCompany | null> {
    return this.service.getById({id : Number(id) })
  }

  @Post()
  @ApiOperation({ summary : "レコード作成" })
  @ApiOkResponse({ type : SponsorComEntity })
  async createSponsorCom(@Body() data: CreateSponsorComDto) : Promise<SponsorCompany>{
    return this.service.create(data)
  }

  @Put(':id')
  @ApiOperation({summary:"レコード更新"})
  @ApiOkResponse({ type: SponsorComEntity })
  async updateSponsorCom(@Param('id') id: string, @Body() data: UpdateSponsorComDto) : Promise<SponsorCompany>{
    return this.service.update({
      where:{
        id: Number(id)
      },
      data:{
        name: data.name
      }      
    })
  }

  @Delete(':id')
  @ApiOperation({ summary: "レコード削除"})
  @ApiOkResponse({ type: SponsorComEntity })
  async deleteSponsorCom(@Param('id') id : string): Promise<SponsorCompany> {
    return this.service.delete({
      id: Number(id)
    })
  }
  
}
