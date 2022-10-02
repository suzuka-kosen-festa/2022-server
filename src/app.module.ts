import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { GuestModule } from './guest/guest.module';
import { JhsModule } from './jhs/jhs.module';
import { ObModule } from './ob/ob.module';
@Module({
   imports: [StudentModule, PrismaModule, HealthModule, GuestModule, JhsModule, ObModule],
})
export class AppModule {}
