// eslint-disable-next-line no-redeclare
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JHStudent } from '@prisma/client';
import { createJhsStudentDto, updateJhsStudentDto } from './dto/jhs.dto';
import { JhsEntity, JhsWithHistoryEntity, JhswithParentEntity } from './entity/jhs.entiry';
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

   @Get('/history')
   @ApiOperation({ summary: '中学生の入場履歴を返す' })
   @ApiOkResponse({ type: JhsWithHistoryEntity, isArray: true })
   async getAllSponsorHistory(): Promise<JHStudent[]> {
      return this.service.getAllHistory();
   }

   @Get('check/:id')
   @ApiOperation({ summary: '中学生のuuid照合' })
   @ApiOkResponse({ type: JhsWithHistoryEntity, description: '存在しない場合はnullを返す' })
   async checkUuid(@Param('id') uuid: string): Promise<JHStudent | null> {
      return this.service.checkJhsExist({ jhsId: uuid });
   }

   @Get(':name')
   @ApiOperation({ summary: '中学生を名前で検索' })
   @ApiOkResponse({ type: JhsEntity, isArray: true })
   async searchJhsByName(@Param('name') name: string): Promise<JHStudent[] | null> {
      return this.service.searchByName({ name: name });
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
