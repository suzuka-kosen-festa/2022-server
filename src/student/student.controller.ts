//'Body' is already defined as a built-in global variable. が出る
// eslint-disable-next-line no-redeclare
import { Post, Controller, Body, Get } from '@nestjs/common';
import { Guest, Student } from '@prisma/client';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService){}

  @Get('getall')
  async getAllStudent() : Promise<Student[]>{
    return this.studentService.getStudents()
  }
  
  // 学生のレコード作成用APIルート
  @Post('create')
  async createStudent(
    @Body() data: {kana: string; email: string; guest?: Guest}
  ) : Promise<Student>{
    return this.studentService.createStudent(data)
  }
}
