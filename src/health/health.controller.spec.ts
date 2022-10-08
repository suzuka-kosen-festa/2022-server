import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { HealthController } from './health.controller';

describe('HealthController', () => {
   let controller: HealthController;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         //TODO:Prisma ModuleはGlobalなのに定義しないとエラーが出るので原因を時間があるときに調べる
         imports: [TerminusModule, PrismaModule, HttpModule],
         controllers: [HealthController],
         providers: [PrismaService],
      }).compile();

      controller = module.get<HealthController>(HealthController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });
});
