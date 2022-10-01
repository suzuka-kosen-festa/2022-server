import { Test, TestingModule } from '@nestjs/testing';
import { JhsController } from './jhs.controller';

describe('JhsController', () => {
   let controller: JhsController;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [JhsController],
      }).compile();

      controller = module.get<JhsController>(JhsController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });
});
