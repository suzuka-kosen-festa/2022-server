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

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [ObService, { provide: PrismaService, useValue: db }],
      }).compile();

      service = module.get<ObService>(ObService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });

   it('createOb', async () => {
      const obData = {
         name: 'てすと１',
         email: 'test1@example.com',
      };
      const createdOb = await service.createOb(obData);
      expect(createdOb).toEqual(singleRecord);
   });

   it('getAllOb', async () => {
      const obData = await service.getAllOb();
      expect(obData).toStrictEqual(obArray);
   });

   it('checkObExist', async () => {
      const obRecord = await service.checkObExist({ obId: 'uuid1' });
      expect(obRecord).toStrictEqual(singleRecord);
   });
});
