import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
   imports: [StudentModule, PrismaModule],
})
export class AppModule {}
