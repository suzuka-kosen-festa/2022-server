//'Body' is already defined as a built-in global variable. が出る
// eslint-disable-next-line no-redeclare
import { Post, Controller, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Guest, Prisma, Student } from '@prisma/client';
import { createStudentDto, updateStudentDto } from './dto/student.dto';
import { StudentEntity, StudentwithGuestEntity } from './entities/student.entity';
import { StudentService } from './student.service';

@ApiTags('student')
@Controller('student')
export class StudentController {
   constructor(private readonly studentService: StudentService) {}

   @Get()
   @ApiOperation({ summary: '学生の全件データを返す' })
   @ApiOkResponse({ type: StudentEntity, isArray: true })
   async getAll(): Promise<(Student & { Guest?: Guest[] })[]> {
      return this.studentService.getAllStudents();
   }

   @Get(':kana')
   @ApiOperation({ summary: 'かな検索' })
   @ApiOkResponse({ type: StudentwithGuestEntity, isArray: true, description: '存在しない場合はnullを返す' })
   async searchStudentByKana(@Param('kana') kana: string): Promise<Student[] | null> {
      return this.studentService.searchByKana({ kana });
   }

   @Get('check/:uuid')
   @ApiOperation({ summary: 'uuidの照合' })
   @ApiOkResponse({ type: StudentEntity, description: '存在しない場合はnullを返す' })
   async checkUuid(@Param('uuid') id: string): Promise<Student | null> {
      return this.studentService.checkStudentExist({ studentId: id });
   }

   @Post()
   @ApiOperation({ summary: '学生の作成' })
   @ApiCreatedResponse({ type: StudentEntity })
   async create(@Body() data: createStudentDto): Promise<Student> {
      return this.studentService.createStudent(data);
   }

   @Post("many")
   @ApiOperation({ summary : "学生のデータを複数作る" })
   async createManyStudent(@Body() data : Prisma.StudentCreateManyInput) : Promise<Prisma.BatchPayload> {
      return this.studentService.createMany(data)
   } 

   @Put(":email")
   @ApiOperation({ summary: '学生のデータの更新' })
   @ApiCreatedResponse({ type: StudentEntity })
   async update( @Param("email") email : string, @Body() data: updateStudentDto): Promise<Student> {
      return this.studentService.updateStudent({
         where: { email },
         data
      });
   }

   @Delete(':uuid')
   @ApiOperation({ summary: '学生のデータの削除' })
   @ApiResponse({ type: StudentEntity })
   async delete(@Param('uuid') uuid: string): Promise<Student> {
      return this.studentService.deleteStudent({
         studentId: uuid,
      });
   }

   @Delete()
   @ApiOperation({ summary : "全削除" })
   async deleteManyStudent() : Promise<Prisma.BatchPayload> {
      return this.studentService.deleteAll()
   }
}
