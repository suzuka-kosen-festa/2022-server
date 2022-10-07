import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SponsorService } from './sponsor.service';

const sponsorArray: Prisma.SponsorCreateInput[] = [
   { sponsorId: 'uuid1', name: 'てすと1', email: 'test1@example.com' },
   { sponsorId: 'uuid2', name: 'てすと2', email: 'test2@example.com' },
   { sponsorId: 'uuid3', name: 'てすと3', email: 'test3@example.com' },
   { sponsorId: 'uuid4', name: 'てすと4', email: 'test4@example.com' },
];

const singleRecord = sponsorArray[0];

const db = {
   sponsor: {
      findMany: jest.fn().mockResolvedValue(sponsorArray),
      findUnique: jest.fn().mockResolvedValue(singleRecord),
      create: jest.fn().mockResolvedValue(singleRecord),
      delete: jest.fn().mockResolvedValue(singleRecord),
   },
};

describe('SponsorService', () => {
   let service: SponsorService;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            SponsorService,
            {
               provide: PrismaService,
               useValue: db,
            },
         ],
      }).compile();

      service = module.get<SponsorService>(SponsorService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });

   it('createSponsor', async () => {
      const data: Prisma.SponsorCreateInput = { sponsorId: 'uuid1', name: 'てすと1', email: 'test1@example.com' };
      const result = await service.createSponsor(data);

      expect(data).toEqual(result);
   });

   it('getAllSponsor', async () => {
      const result = await service.getAllSponsor();

      expect(result).toEqual(sponsorArray);
   });

   it('checkObExist', async () => {
      const obRecord = await service.checkSponsorExist({ sponsorId: 'uuid1' });
      expect(obRecord).toStrictEqual(singleRecord);
   });

   it('deleteSponsor', async () => {
      const result = await service.deleteSponsor({ sponsorId: 'uuid1' });

      expect(result).toEqual(singleRecord);
   });
});
