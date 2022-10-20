import { Injectable } from '@nestjs/common';
import { Guest, Prisma, Student } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
   constructor(private readonly prisma: PrismaService) {}

   // Studentテーブルのレコードを作成する関数
   async createStudent(data: Prisma.StudentCreateInput): Promise<Student> {
      return this.prisma.student.create({ data ,include :{ Guest : true}});
   }

   async createMany(data : Prisma.StudentCreateManyInput) : Promise<Prisma.BatchPayload>{
      return this.prisma.student.createMany({data})
   }

   //uuidの照合
   async checkStudentExist(uuid: Prisma.StudentWhereUniqueInput): Promise<Student | null> {
      //TODO: 値の返し方はQRコード読み取り側と相談したい
      return this.prisma.student.findUnique({
         where: uuid,
      });
   }

   async searchByKana(kana: Prisma.StudentWhereInput): Promise<Student[] | null> {
      return this.prisma.student.findMany({
         where: kana,
         include: {
            Guest: true,
         },
      });
   }

   // Studentテーブルの全レコードを返す
   async getAllStudents(): Promise<(Student & { Guest?: Guest[] })[]> {
      return this.prisma.student.findMany({
         include: {
            Guest: true,
         },
      });
   }

   // StudentテーブルにGuestとリレーションを作る
   async updateStudent(params: {
      where: Prisma.StudentWhereUniqueInput;
      data: Prisma.StudentUpdateInput;
   }): Promise<Student> {
      return this.prisma.student.update(params);
   }

   async deleteStudent(where: Prisma.StudentWhereUniqueInput): Promise<Student> {
      return this.prisma.student.delete({ where: where });
   }
   
   async deleteAll() : Promise<Prisma.BatchPayload> {
      return this.prisma.student.deleteMany()
   }
}
