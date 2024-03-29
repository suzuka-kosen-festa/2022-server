import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { StudentService } from './student.service';

const studentArray = [
   { studentId: 'uuid1', kana: 'テスト1', email: 'example1.com' },
   {
      studentId: 'uuid2',
      kana: 'テスト2',
      email: 'example2.com',
      Guest: {
         guestId: 'uuid_guest',
         sex: '男',
         jobs: '祖父',
         name: 'テストゲスト',
         hostId: 'uuid2',
      },
   },
   { studentId: 'uuid3', kana: 'テスト3', email: 'example3.com' },
];

const singleRecord = studentArray[0];
const singleRecordwithGuest = studentArray[1];

const db = {
   student: {
      findMany: jest.fn().mockResolvedValue(studentArray),
      findUnique: jest.fn().mockResolvedValue(singleRecord),
      create: jest.fn().mockResolvedValue(singleRecord),
      update: jest.fn().mockResolvedValue(singleRecordwithGuest),
   },
};

describe('StudentService', () => {
   let service: StudentService;
   let prisma: PrismaService;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            StudentService,
            {
               provide: PrismaService,
               useValue: db,
            },
         ],
      }).compile();

      service = module.get<StudentService>(StudentService);
      prisma = module.get<PrismaService>(PrismaService);
   });

   it('service should be Defined', () => {
      expect(service).toBeDefined();
   });

   it('createStudent', async () => {
      const studentData = {
         kana: 'テスト1',
         email: 'example1.com',
      };
      const createdStudent = await service.createStudent(studentData);
      expect(createdStudent).toEqual(singleRecord);
   });

   it('getStudents', async () => {
      const students = await service.getAllStudents();
      expect(students).toEqual(studentArray);
   });

   it('checkStudentExist', async () => {
      const singleStudent = await service.checkStudentExist({
         studentId: 'uuid1',
      });
      expect(singleStudent).toEqual(singleRecord);
   });

   it('searchByKana', async () => {
      const data = await service.searchByKana({
         kana: 'テスト1',
      });

      expect(data).toEqual(studentArray);
   });

   it('updateStudent', async () => {
      const guestData = {
         sex: '男',
         jobs: '祖父',
         name: 'テストゲスト',
      };
      const singleStudentwithGuest = await service.updateStudent({
         where: { studentId: 'uuid2' },
         data: {
            Guest: {
               create: guestData,
            },
         },
      });
      expect(singleStudentwithGuest).toEqual(singleRecordwithGuest);
   });
});
