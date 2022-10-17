import { Test, TestingModule } from '@nestjs/testing';
import { SponsorcompanyService } from './sponsorcompany.service';

describe('SponsorcompanyService', () => {
  let service: SponsorcompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SponsorcompanyService],
    }).compile();

    service = module.get<SponsorcompanyService>(SponsorcompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
