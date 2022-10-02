import { Test, TestingModule } from '@nestjs/testing';
import { ObController } from './ob.controller';

describe('ObController', () => {
  let controller: ObController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObController],
    }).compile();

    controller = module.get<ObController>(ObController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
