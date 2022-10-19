import { Test, TestingModule } from '@nestjs/testing';
import { BazaarpricesController } from './bazaarprices.controller';

describe('BazaarpricesController', () => {
   let controller: BazaarpricesController;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [BazaarpricesController],
      }).compile();

      controller = module.get<BazaarpricesController>(BazaarpricesController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });
});
