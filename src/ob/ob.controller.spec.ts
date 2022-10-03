import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { ObController } from './ob.controller';
import { ObService } from './ob.service';

const obArray: Prisma.OBCreateInput[] = [
   { obId: 'uuid1', name: 'てすと1', age: 25, email: 'test1@example.com' },
   { obId: 'uuid2', name: 'てすと2', age: 26, email: 'test2@example.com' },
   { obId: 'uuid3', name: 'てすと3', age: 27, email: 'test3@example.com' },
   { obId: 'uuid4', name: 'てすと4', age: 28, email: 'test4@example.com' },
];

const singleRecord = obArray[0];

describe('ObController', () => {
   let controller: ObController;
   let service: ObService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [ObController],
         providers: [
            {
               provide: ObService,
               useValue: {
                  create: jest.fn().mockImplementation((data: Prisma.StudentCreateInput) => Promise.resolve(data)),
                  checkObExist: jest.fn().mockImplementation((uuid: Prisma.OBWhereUniqueInput) => Promise.resolve(singleRecord)),
                  getAll: jest.fn().mockImplementation(() => obArray),
               },
            },
         ],
      }).compile();

      controller = module.get<ObController>(ObController);
      service = module.get<ObService>(ObService);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });

   it('get all records', async () => {
      const data = await controller.getAllOb()
      expect(data).toStrictEqual(obArray);
   });

   it('create ob record', async () => {
      const record = { obId: 'uuid1', name: 'てすと1', age: 25, email: 'test1@example.com' };
      const data = await controller.createOb(record);
      expect(data).toStrictEqual(record);
   });

   it('check record exist', async () => {
      const record = { obId: 'uuid1', name: 'てすと1', age: 25, email: 'test1@example.com' };
      const testRecord = await controller.checkExistOb('uuid1');
      expect(testRecord).toStrictEqual(record);
   });
});
