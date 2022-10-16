import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
   let service: HistoryService;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [HistoryService, PrismaService],
      }).compile();

      service = module.get<HistoryService>(HistoryService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });
});
