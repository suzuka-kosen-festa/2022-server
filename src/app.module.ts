import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { StudentService } from './student/student.service';

@Module({
   imports: [],
   controllers: [AppController],
   providers: [AppService, PrismaService, StudentService],
})
export class AppModule {}
