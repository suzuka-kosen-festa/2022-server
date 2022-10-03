import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';

@Module({
   imports: [StudentModule, PrismaModule, HealthModule],
})
export class AppModule {}
