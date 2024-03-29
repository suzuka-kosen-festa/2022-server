import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

describe('HistoryController', () => {
   let controller: HistoryController;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [HistoryController],
         providers: [PrismaService, HistoryService],
      }).compile();

      controller = module.get<HistoryController>(HistoryController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });
});
