import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { GuestService } from './guest.service';

const guestArray = [
   { guestId: 'uuid1', sex: '男', jobs: '祖父', name: 'テストゲスト1', hostId: 'hostId1' },
   { guestId: 'uuid2', sex: '男', jobs: '祖父', name: 'テストゲスト2', hostId: 'hostId2' },
   { guestId: 'uuid3', sex: '男', jobs: '祖父', name: 'テストゲスト3', hostId: 'hostId3' },
];

const singleRecord = guestArray[0];

describe('GuestService', () => {
   let service: GuestService;
   let prisma: PrismaService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            GuestService,
            {
               provide: PrismaService,
               useValue: {
                  guest: {
                     findMany: jest.fn().mockResolvedValue(guestArray),
                     findUnique: jest.fn().mockResolvedValue(singleRecord),
                     delete: jest.fn().mockResolvedValue(singleRecord),
                  },
               },
            },
         ],
      }).compile();

      service = module.get<GuestService>(GuestService);
      prisma = module.get<PrismaService>(PrismaService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });

   test('getAllGuests', async () => {
      const students = await service.getAllGuests();
      expect(students).toEqual(guestArray);
   });

   test('checkGuestExist', async () => {
      const singleGuest = await service.checkGuestExist({
         guestId: 'uuid1',
      });
      expect(singleGuest).toEqual(singleRecord);
   });

   test('deleteGuest', async () => {
      const result = await service.deleteGuest({ guestId: 'uuid1' });

      expect(result).toEqual(singleRecord);
   });
});
