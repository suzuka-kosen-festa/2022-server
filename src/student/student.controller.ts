//'Body' is already defined as a built-in global variable. が出る
// eslint-disable-next-line no-redeclare
import { Post, Controller, Body, Get, Put, Param } from '@nestjs/common';
import {
   ApiCreatedResponse,
   ApiOkResponse,
   ApiOperation,
   ApiTags,
} from '@nestjs/swagger';
import { Student } from '@prisma/client';
import { createStudentDto, updateStudentDto } from './dto/studentDto';
import { StudentEntity, StudentwithGuestEntity } from './entities/student';
import { StudentService } from './student.service';

@ApiTags('student')
@Controller('student')
export class StudentController {
   constructor(private readonly studentService: StudentService) {}

   @Get()
   @ApiOperation({ summary: '学生の全件データを返す' })
   @ApiOkResponse({ type: StudentEntity, isArray: true })
   async getAllStudent(): Promise<Student[]> {
      return this.studentService.getAllStudents();
   }

   @Get('check/:uuid')
   @ApiOperation({ summary: 'uuidの照合' })
   @ApiOkResponse({ type: StudentEntity })
   async checkUuid(@Param('uuid') id: string): Promise<Student> {
      return this.studentService.checkStudentExist({ studentId: id });
   }

   @Post()
   @ApiOperation({ summary: '学生の作成' })
   @ApiCreatedResponse({ type: StudentEntity })
   async createStudent(@Body() data: createStudentDto): Promise<Student> {
      console.log(data);
      const { kana, email } = data;
      return this.studentService.createStudent({
         kana,
         email,
      });
   }

   @Put()
   @ApiOperation({ summary: '学生のデータに招待客のデータを加える' })
   @ApiCreatedResponse({ type: StudentwithGuestEntity })
   async updateStudent(
      @Body()
      data: updateStudentDto,
   ): Promise<Student> {
      const { email, sex, jobs, name } = data;
      //serviceの部分の引数の型を変えればdataをそのまま代入できるかもしれない
      return this.studentService.updateStudent({
         where: { email },
         data: {
            Guest: {
               create: {
                  sex: sex,
                  jobs: jobs,
                  name: name,
               },
            },
         },
      });
   }
}
