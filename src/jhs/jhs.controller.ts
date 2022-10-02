// eslint-disable-next-line no-redeclare
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JHStudent } from '@prisma/client';
import { createJhsStudentDto, updateJhsStudentDto } from './dto/jhsDto';
import { JhsEntity, JhswithParentEntity } from './entity/jhs';
import { JhsService } from './jhs.service';

@Controller('jhs')
export class JhsController {
   constructor(private readonly service: JhsService) {}

   @Get()
   @ApiOperation({ summary: '中学生のデータ全件取得' })
   @ApiOkResponse({ type: JhsEntity, isArray: true })
   async getAllJhs(): Promise<JHStudent[]> {
      return this.service.getAllJhs();
   }

   @Get('check/:id')
   @ApiOperation({ summary: '中学生のuuid照合' })
   @ApiOkResponse({ type: JhsEntity })
   async checkJhsExist(@Param('id') uuid: string): Promise<JHStudent> {
      return this.service.checkJhsExist({ jhsId: uuid });
   }

   @Post()
   @ApiOperation({ summary: '中学生のレコード作成' })
   @ApiCreatedResponse({ type: JhsEntity })
   async createJhs(@Body() data: createJhsStudentDto): Promise<JHStudent> {
      return this.service.createJhs(data);
   }

   @Put()
   @ApiOperation({ summary: '中学生と保護者のリレーション作成' })
   @ApiCreatedResponse({ type: JhswithParentEntity })
   async updateJhs(@Body() data: updateJhsStudentDto): Promise<JHStudent> {
      const { email, sex, jobs, name } = data;
      //serviceの部分の引数の型を変えればdataをそのまま代入できるかもしれない
      return this.service.updateJhs({
         where: { email },
         data: {
            parents: {
               create: {
                  sex: sex,
                  jobs: jobs,
                  name: name,
               },
            },
         },
      });
   }
}
