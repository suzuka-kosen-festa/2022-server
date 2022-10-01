import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { GuestModule } from './guest/guest.module';
import { JhsController } from './jhs/jhs.controller';
import { JhsModule } from './jhs/jhs.module';

@Module({
   imports: [StudentModule, PrismaModule, HealthModule, GuestModule, JhsModule],
   controllers: [JhsController],
})
export class AppModule {}
