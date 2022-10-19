import { Test, TestingModule } from '@nestjs/testing';
import { BazaarpricesService } from './bazaarprices.service';

describe('BazaarpricesService', () => {
   let service: BazaarpricesService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [BazaarpricesService],
      }).compile();

      service = module.get<BazaarpricesService>(BazaarpricesService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });
});
