import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';

@Module({
   imports: [],
   controllers: [StudentController],
   providers: [PrismaService, StudentService],
})
export class AppModule {}
