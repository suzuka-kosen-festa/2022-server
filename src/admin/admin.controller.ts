import { Controller, Get, Param } from '@nestjs/common';
import { Guest, JHStudent, OB, Sponsor, Student } from '@prisma/client';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
   constructor(private readonly service: AdminService) {}

   @Get('test')
   async test(): Promise<string> {
      return 'hello';
   }

   @Get('/studentguest')
   async exportStudentGuest(): Promise<any> {
      return this.service.exportStudentGuestUuid();
   }

   @Get('check/:uuid')
   async checkUuid(@Param('uuid') uuid: string): Promise<Student | OB | Guest | JHStudent | Sponsor> {
      return this.service.parseUuid(uuid);
   }
}
