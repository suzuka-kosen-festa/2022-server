import { Test, TestingModule } from '@nestjs/testing';
import { BazaarController } from './bazaar.controller';

describe('BazaarController', () => {
   let controller: BazaarController;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [BazaarController],
      }).compile();

      controller = module.get<BazaarController>(BazaarController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });
});
