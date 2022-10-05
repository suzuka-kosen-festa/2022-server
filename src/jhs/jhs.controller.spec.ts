import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { JhsController } from './jhs.controller';
import { JhsService } from './jhs.service';

const jhsArray = [
   { jhsId: 'uuid1', name: 'てすと１', age: 13, email: 'test1@example.com', Pearents: [] },
   {
      jhsId: 'uuid2',
      name: 'てすと２',
      age: 14,
      email: 'test2@example.com',
      Pearents: [
         {
            guestId: 'uuid4',
            name: 'てすと親',
            age: 40,
            sex: '女性',
            //TODO:保護者の続柄の確認
            jobs: '保護者',
            hostJhsId: 'uuid2',
         },
      ],
   },
   { jhsId: 'uuid3', name: 'てすと３', age: 15, email: 'test3@example.com', Pearents: [] },
];

const singleRecord = jhsArray[0];
const singleRecordwithParents = jhsArray[1];

describe('JhsController', () => {
   let controller: JhsController;
   let service: JhsService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [JhsController],
         providers: [
            {
               provide: JhsService,
               useValue: {
                  createJhs: jest.fn().mockImplementation((data: Prisma.StudentCreateInput) => Promise.resolve(data)),
                  checkJhsExist: jest.fn().mockImplementation((uuid: string) => Promise.resolve(singleRecord)),
                  updateJhs: jest
                     .fn()
                     .mockImplementation((data: Prisma.StudentUpdateInput) => Promise.resolve(singleRecordwithParents)),
                  getAllJhs: jest.fn().mockResolvedValue(jhsArray),
                  deleteJhs: jest.fn().mockResolvedValue(singleRecord)
               },
            },
         ],
      }).compile();

      controller = module.get<JhsController>(JhsController);
      service = module.get<JhsService>(JhsService);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });

   test('get all students', async () => {
      const data = await controller.getAll();
      await expect(data).toEqual(jhsArray);
   });

   test('check student exist', async () => {
      const data = await controller.checkUuid('uuid1');
      await expect(data).toEqual(singleRecord);
   });

   test('update student', async () => {
      const data = await controller.update({
         email: 'test2@example.com',
         name: 'てすと親',
         age: 40,
         sex: '女性',
         //TODO:保護者の続柄の確認
         jobs: '保護者',
      });
      await expect(data).toEqual(singleRecordwithParents);
   });

   test("delete student",async () => {
      const res = await controller.delete("uuid1")
      expect(res).toEqual(singleRecord)
   })
});
