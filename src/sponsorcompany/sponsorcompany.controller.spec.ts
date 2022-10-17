import { Test, TestingModule } from '@nestjs/testing';
import { SponsorcompanyController } from './sponsorcompany.controller';

describe('SponsorcompanyController', () => {
  let controller: SponsorcompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SponsorcompanyController],
    }).compile();

    controller = module.get<SponsorcompanyController>(SponsorcompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
