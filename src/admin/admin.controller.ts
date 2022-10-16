import { Controller, Get, Param } from '@nestjs/common';
import { Guest, JHStudent, OB, Sponsor, Student } from '@prisma/client';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
   constructor(private readonly service: AdminService) {}

   @Get('/studentguest')
   async exportStudentGuestId(): Promise<unknown> {
      return this.service.exportStudentGuestUuid();
   }

   @Get('/jhsguest')
   async exportJhsGuestId(): Promise<unknown> {
      return this.service.exportJhsGuestUuid();
   }

   @Get('/ob')
   async exportObId(): Promise<unknown> {
      return this.service.exportObUuid();
   }

   @Get('/sponsor')
   async exportSponsorId(): Promise<unknown> {
      return this.service.exportSponsorUuid();
   }

   @Get('check/:uuid')
   async checkUuid(@Param('uuid') uuid: string): Promise<Student | OB | Guest | JHStudent | Sponsor> {
      return this.service.parseUuid(uuid);
   }
}
