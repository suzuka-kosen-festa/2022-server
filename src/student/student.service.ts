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
   
   //uuidの照合
   async checkStudentExist(uuid: Prisma.StudentWhereUniqueInput): Promise<Student>{
    //情報が存在する場合はそのレコードを、ない場合はnullを返す
    //値の返し方はQRコード読み取り側と相談したい
    return this.prisma.student.findUnique({
      where: uuid,
    })
   }
   // Studentテーブルの全レコードを返す
   async getAllStudents(): Promise<Student[]> {
      return this.prisma.student.findMany({
         include: {
            Guest: true,
         },
      });
   }

   // StudentテーブルにGuestとリレーションを作る
   async updateStudent(params: {
      where: Prisma.StudentWhereUniqueInput;
      data: Prisma.StudentUpdateInput
   }): Promise<Student> {
      const { where, data } = params;
      return this.prisma.student.update({
         where,
         data,
      });
   }
}
