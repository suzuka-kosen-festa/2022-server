import { Test, TestingModule } from '@nestjs/testing';
import { BazaarService } from './bazaar.service';

describe('BazaarService', () => {
   let service: BazaarService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [BazaarService],
      }).compile();

      service = module.get<BazaarService>(BazaarService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });
});
