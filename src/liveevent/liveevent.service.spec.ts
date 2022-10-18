import { Test, TestingModule } from '@nestjs/testing';
import { LiveeventService } from './liveevent.service';

describe('LiveeventService', () => {
   let service: LiveeventService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [LiveeventService],
      }).compile();

      service = module.get<LiveeventService>(LiveeventService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });
});
