import { Test, TestingModule } from '@nestjs/testing';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';

const guestArray = [
   { guestId: 'uuid1', sex: '男', jobs: '祖父', name: 'テストゲスト1', hostId: 'hostId1' },
   { guestId: 'uuid2', sex: '男', jobs: '祖父', name: 'テストゲスト2', hostId: 'hostId2' },
   { guestId: 'uuid3', sex: '男', jobs: '祖父', name: 'テストゲスト3', hostId: 'hostId3' },
];

const singleRecord = guestArray[0];

describe('GuestController', () => {
   let controller: GuestController;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [GuestController],
         providers: [
            {
               provide: GuestService,
               useValue: {
                  getAllGuests: jest.fn().mockImplementation(() => guestArray),
                  checkGuestExist: jest.fn().mockImplementation((uuid: string) => Promise.resolve(singleRecord)),
               },
            },
         ],
      }).compile();

      controller = module.get<GuestController>(GuestController);
   });

   test('should be defined', () => {
      expect(controller).toBeDefined();
   });

   test('get all guests data', async () => {
      expect(await controller.getAllGeusts()).toEqual(guestArray);
   });

   test('check guest exist', async () => {
      expect(await controller.checkuuid('uuid1')).toEqual(singleRecord);
   });
});
