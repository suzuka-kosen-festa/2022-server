// eslint-disable-next-line no-redeclare
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JHStudent } from '@prisma/client';
import { createJhsStudentDto, updateJhsStudentDto } from './dto/jhs.dto';
import { JhsEntity, JhswithParentEntity } from './entity/jhs.entiry';
import { JhsService } from './jhs.service';

@ApiTags('jhs')
@Controller('jhs')
export class JhsController {
   constructor(private readonly service: JhsService) {}

   @Get()
   @ApiOperation({ summary: '中学生のデータ全件取得' })
   @ApiOkResponse({ type: JhsEntity, isArray: true })
   async getAll(): Promise<JHStudent[]> {
      return this.service.getAllJhs();
   }

   @Get('check/:id')
   @ApiOperation({ summary: '中学生のuuid照合' })
   @ApiOkResponse({ type: JhsEntity })
   async checkUuid(@Param('id') uuid: string): Promise<JHStudent> {
      return this.service.checkJhsExist({ jhsId: uuid });
   }

   @Post()
   @ApiOperation({ summary: '中学生のレコード作成' })
   @ApiCreatedResponse({ type: JhsEntity })
   async create(@Body() data: createJhsStudentDto): Promise<JHStudent> {
      return this.service.createJhs(data);
   }

   @Put()
   @ApiOperation({ summary: '中学生と保護者のリレーション作成' })
   @ApiCreatedResponse({ type: JhswithParentEntity })
   async update(@Body() data: updateJhsStudentDto): Promise<JHStudent> {
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

   @Delete(':uuid')
   @ApiOperation({ summary: '学生のデータの削除' })
   @ApiResponse({ type: JhsEntity })
   async delete(@Param('uuid') uuid: string): Promise<JHStudent> {
      return this.service.deleteJhs({
         jhsId: uuid,
      });
   }
}
