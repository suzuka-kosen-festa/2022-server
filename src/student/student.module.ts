import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
   providers: [StudentService],
   controllers: [StudentController],
   exports: [StudentService]
})
export class StudentModule {}
