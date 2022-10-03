import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { ObController } from './ob.controller';

const obArray : Prisma.OBCreateInput[]= [
  {obId:'uuid1', name:'てすと',}
]


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
