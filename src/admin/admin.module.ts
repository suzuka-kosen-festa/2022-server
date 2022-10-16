import { Module } from '@nestjs/common';
import { GuestModule } from '../guest/guest.module';
import { JhsModule } from '../jhs/jhs.module';
import { ObModule } from '../ob/ob.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SponsorModule } from '../sponsor/sponsor.module';
import { StudentModule } from '../student/student.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
   imports: [StudentModule, GuestModule, JhsModule, ObModule, SponsorModule, PrismaModule],
   providers: [AdminService],
   controllers: [AdminController],
})
export class AdminModule {}
