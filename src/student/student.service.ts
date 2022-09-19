import { Injectable } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prisma : PrismaService){}

  // Studentテーブルのレコードを作成する関数
  async createStudent(data: Prisma.StudentCreateInput): Promise<Student> {
    return this.prisma.student.create({
      data
    })
  }

  // Studentテーブルの全レコードを返す
  async getStudents() : Promise<Student[]>{
    return this.prisma.student.findMany()
  }
}
