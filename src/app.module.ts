import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { GuestModule } from './guest/guest.module';

@Module({
   imports: [StudentModule, PrismaModule, HealthModule, GuestModule],
})
export class AppModule {}
