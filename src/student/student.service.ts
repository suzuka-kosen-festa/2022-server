import { Injectable } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
   constructor(private readonly prisma: PrismaService) {}

   // Studentテーブルのレコードを作成する関数
   async createStudent(data: Prisma.StudentCreateInput): Promise<Student> {
      return this.prisma.student.create({
         data,
      });
   }
   
   async checkexistStudent(uuid: Prisma.StudentWhereUniqueInput): Promise<Student>{
    const isexist = this.prisma.student.findUnique({
      where: uuid,
    })
    console.log(isexist)
    return isexist
   }
   // Studentテーブルの全レコードを返す
   async getStudents(): Promise<Student[]> {
      return this.prisma.student.findMany({
         include: {
            Guest: true,
         },
      });
   }

   // StudentテーブルにGuestとリーレーションを作る
   async updateStudent(params: {
      where: Prisma.StudentWhereUniqueInput;
      data: Prisma.StudentUpdateInput;
   }): Promise<Student> {
      const { where, data } = params;
      return this.prisma.student.update({
         where,
         data,
      });
   }
}
