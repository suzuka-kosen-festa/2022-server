//'Body' is already defined as a built-in global variable. が出る
// eslint-disable-next-line no-redeclare
import { Post, Controller, Body, Get, Put, Param } from '@nestjs/common';
import { Student } from '@prisma/client';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
   constructor(private readonly studentService: StudentService) {}

   @Get('getall')
   async getAllStudent(): Promise<Student[]> {
      return this.studentService.getStudents();
   }

   @Get('check/:uuid')
   async checkUuid(@Param("uuid") id:string): Promise<Student>{
      return this.studentService.checkStudentExist({ studentId: id})
   }

   // 学生のレコード作成用APIルート
   @Post('create')
   async createStudent(
      @Body() data: { kana: string; email: string },
   ): Promise<Student> {
      console.log(data);
      const { kana, email } = data;
      return this.studentService.createStudent({
         kana,
         email,
      });
   }
   @Put('update')
   async updateStudent(
      @Body()
      data: {
         email: string;
         sex: string;
         jobs: string;
         RealName: string;
      },
   ): Promise<Student> {
      const { email, sex, jobs, RealName } = data;
      //serviceの部分の引数の型をdataに分割代入できるかもしれない
      return this.studentService.updateStudent({
         where: { email },
         data: {
            Guest: {
               create: {
                  sex: sex,
                  jobs: jobs,
                  RealName: RealName,
               },
            },
         },
      });
   }
}
