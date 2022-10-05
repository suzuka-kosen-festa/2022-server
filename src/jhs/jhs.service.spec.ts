import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
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

const db = {
   jHStudent: {
      findMany: jest.fn().mockResolvedValue(jhsArray),
      findUnique: jest.fn().mockResolvedValue(singleRecord),
      create: jest.fn().mockResolvedValue(singleRecord),
      update: jest.fn().mockResolvedValue(singleRecordwithParents),
      delete: jest.fn().mockResolvedValue(singleRecord)
   },
};

describe('jhsService', () => {
   let service: JhsService;
   let prisma: PrismaService;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            JhsService,
            {
               provide: PrismaService,
               useValue: db,
            },
         ],
      }).compile();

      service = module.get<JhsService>(JhsService);
      prisma = module.get<PrismaService>(PrismaService);
   });

   test('service should be Defined', () => {
      expect(service).toBeDefined();
   });

   test('createJhs', async () => {
      const jhsData = {
         name: 'テスト1',
         email: 'example1.com',
         age: '15',
      };
      const createdJhs = await service.createJhs(jhsData);
      expect(createdJhs).toEqual(singleRecord);
   });

   test('getJhs', async () => {
      const students = await service.getAllJhs();
      expect(students).toEqual(jhsArray);
   });

   test('checkJhstExist', async () => {
      const singleStudent = await service.checkJhsExist({
         jhsId: 'uuid1',
      });
      expect(singleStudent).toEqual(singleRecord);
   });

   test('updateJhs', async () => {
      const guestData = {
         name: 'てすと親',
         age: 40,
         sex: '女性',
         jobs: '保護者',
      };
      const singleJhswithParents = await service.updateJhs({
         where: { email: 'test2@example.com' },
         data: {
            parents: {
               create: guestData,
            },
         },
      });
      expect(singleJhswithParents).toEqual(singleRecordwithParents);
   });

   test("deleteJhs",async () => {
      const res = await service.deleteJhs({jhsId: "uuid1"})

      expect(res).toEqual(singleRecord)
   })
});
