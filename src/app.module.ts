import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { StudentService } from './student/student.service';
import { StudentsController } from './students/students.controller';
import { StudentController } from './student/student.controller';

@Module({
   imports: [],
   controllers: [AppController, StudentsController, StudentController],
   providers: [AppService, PrismaService, StudentService],
})
export class AppModule {}
