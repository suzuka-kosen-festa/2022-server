import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ObService } from './ob.service';

const obArray: Prisma.OBCreateInput[] = [
   { obId: 'uuid1', name: 'てすと1', email: 'test1@example.com' },
   { obId: 'uuid2', name: 'てすと2', email: 'test2@example.com' },
   { obId: 'uuid3', name: 'てすと3', email: 'test3@example.com' },
   { obId: 'uuid4', name: 'てすと4', email: 'test4@example.com' },
];

const singleRecord = obArray[0];

const db = {
   oB: {
      findMany: jest.fn().mockResolvedValue(obArray),
      findUnique: jest.fn().mockResolvedValue(singleRecord),
      create: jest.fn().mockResolvedValue(singleRecord),
   },
};

describe('ObService', () => {
   let service: ObService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [ObService, { provide: PrismaService, useValue: db }],
      }).compile();

      service = module.get<ObService>(ObService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });

   it('create', async () => {
      const obData = {
         name: 'てすと１',
         email: 'test1@example.com',
      };
      const createdOb = await service.create(obData);
      expect(createdOb).toEqual(singleRecord);
   });

   it('getAll', async () => {
      const obData = await service.getAll();
      expect(obData).toStrictEqual(obArray);
   });

   it('checkExistOb', async () => {
      const obRecord = await service.checkObExist({ obId: 'uuid1' });
      expect(obRecord).toStrictEqual(singleRecord);
   });
});
