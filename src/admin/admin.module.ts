import { Module } from '@nestjs/common';
import { GuestService } from '../guest/guest.service';
import { JhsService } from '../jhs/jhs.service';
import { ObService } from '../ob/ob.service';
import { SponsorService } from '../sponsor/sponsor.service';
import { StudentService } from '../student/student.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    providers:[AdminService, StudentService,GuestService,JhsService,ObService,SponsorService],
    controllers: [AdminController]
})
export class AdminModule {}
