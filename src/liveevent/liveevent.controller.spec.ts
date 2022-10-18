import { Test, TestingModule } from '@nestjs/testing';
import { LiveeventController } from './liveevent.controller';

describe('LiveeventController', () => {
   let controller: LiveeventController;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [LiveeventController],
      }).compile();

      controller = module.get<LiveeventController>(LiveeventController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });
});
