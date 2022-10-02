import { Test, TestingModule } from '@nestjs/testing';
import { ObService } from './ob.service';

describe('ObService', () => {
  let service: ObService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObService],
    }).compile();

    service = module.get<ObService>(ObService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
