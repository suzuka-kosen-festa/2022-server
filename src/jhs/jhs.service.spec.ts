import { Test, TestingModule } from '@nestjs/testing';
import { JhsService } from './jhs.service';

describe('JhsService', () => {
   let service: JhsService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [JhsService],
      }).compile();

      service = module.get<JhsService>(JhsService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });
});
