import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Guest, JHStudent, OB, Sponsor, Student } from '@prisma/client';
import { AdminService } from './admin.service';
import {
   ExportJhsGuestEntity,
   ExportObEntity,
   ExportSponsorEntity,
   ExportStudentGuestEntity,
} from './entity/admin.entity';

@Controller('admin')
export class AdminController {
   constructor(private readonly service: AdminService) {}

   @Get('/studentguest')
   @ApiOperation({ summary: '学生が招待した人のIDエクスポート' })
   @ApiOkResponse({ type: ExportStudentGuestEntity })
   async exportStudentGuestId(): Promise<ExportStudentGuestEntity[]> {
      return this.service.exportStudentGuestUuid();
   }

   @Get('/jhsguest')
   @ApiOperation({ summary: '中学生と中学生が招待した人のIDエクスポート' })
   @ApiOkResponse({ type: ExportJhsGuestEntity })
   async exportJhsGuestId(): Promise<ExportJhsGuestEntity[]> {
      return this.service.exportJhsGuestUuid();
   }

   @Get('/ob')
   @ApiOperation({ summary: 'OBのIDエクスポート' })
   @ApiOkResponse({ type: ExportObEntity })
   async exportObId(): Promise<unknown> {
      return this.service.exportObUuid();
   }

   @Get('/sponsor')
   @ApiOperation({ summary: 'スポンサーのIDエクスポート' })
   @ApiOkResponse({ type: ExportSponsorEntity })
   async exportSponsorId(): Promise<unknown> {
      return this.service.exportSponsorUuid();
   }

   @Get('check/:uuid')
   @ApiOperation({ summary: 'IDの照合  返り値は各テーブルの照合する関数で確認' })
   async checkUuid(@Param('uuid') uuid: string): Promise<Student | OB | Guest | JHStudent | Sponsor> {
      return this.service.parseUuid(uuid);
   }
}
