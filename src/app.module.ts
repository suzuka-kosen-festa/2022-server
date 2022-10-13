import { Module } from '@nestjs/common';
import { GuestModule } from './guest/guest.module';
import { HealthModule } from './health/health.module';
import { JhsModule } from './jhs/jhs.module';
import { ObModule } from './ob/ob.module';
import { PrismaModule } from './prisma/prisma.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.module';

@Module({
    imports:[StudentModule, PrismaModule,HealthModule, GuestModule, JhsModule , ObModule, SponsorModule, AdminModule],
})
export class AppModule {}