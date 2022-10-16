import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { SponsorController } from './sponsor.controller';
import { SponsorService } from './sponsor.service';

const sponsorArray: Prisma.SponsorCreateInput[] = [
   { sponsorId: 'uuid1', name: 'てすと1', email: 'test1@example.com' },
   { sponsorId: 'uuid2', name: 'てすと2', email: 'test2@example.com' },
   { sponsorId: 'uuid3', name: 'てすと3', email: 'test3@example.com' },
   { sponsorId: 'uuid4', name: 'てすと4', email: 'test4@example.com' },
];

const singleRecord = sponsorArray[0];

describe('SponsorController', () => {
   let controller: SponsorController;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [SponsorController],
         providers: [
            {
               provide: SponsorService,
               useValue: {
                  createSponsor: jest
                     .fn()
                     .mockImplementation((data: Prisma.StudentCreateInput) => Promise.resolve(data)),
                  checkSponsorExist: jest
                     .fn()
                     .mockImplementation((uuid: Prisma.OBWhereUniqueInput) => Promise.resolve(singleRecord)),
                  getAllSponsor: jest.fn().mockResolvedValue(sponsorArray),
                  deleteSponsor: jest.fn().mockResolvedValue(singleRecord),
                  searchByName: jest.fn().mockResolvedValue(sponsorArray),
               },
            },
         ],
      }).compile();

      controller = module.get<SponsorController>(SponsorController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });

   it('create', async () => {
      const data: Prisma.SponsorCreateInput = { sponsorId: 'uuid1', name: 'てすと1', email: 'test1@example.com' };
      const result = await controller.create(data);

      expect(result).toEqual(data);
   });

   it('getAll', async () => {
      const result = await controller.getAll();
      expect(result).toEqual(sponsorArray);
   });

   it('check record exist', async () => {
      const testRecord = await controller.checkUuid('uuid1');
      expect(testRecord).toStrictEqual(singleRecord);
   });

   it('searchSpoonsorByName', async () => {
      const data = await controller.searchSpoonsorByName('てすと1');
      expect(data).toEqual(sponsorArray);
   });

   it('delete', async () => {
      const result = await controller.delete('uuid1');
      expect(result).toEqual(singleRecord);
   });
});
