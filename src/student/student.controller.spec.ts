import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { StudentController } from './student.controller';
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

describe('StudentController', () => {
   let controller: StudentController;
   let service: StudentService;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [StudentController],
         providers: [
            {
               provide: StudentService,
               useValue: {
                  createStudent: jest
                     .fn()
                     .mockImplementation((data: Prisma.StudentCreateInput) => Promise.resolve(data)),
                  checkStudentExist: jest.fn().mockImplementation((uuid: string) => Promise.resolve(singleRecord)),
                  seatchStudentByKana: jest.fn().mockResolvedValue(singleRecord),
                  updateStudent: jest
                     .fn()
                     .mockImplementation((data: Prisma.StudentUpdateInput) => Promise.resolve(singleRecordwithGuest)),
                  getAllStudents: jest.fn().mockImplementation(() => studentArray),
               },
            },
         ],
      }).compile();

      controller = module.get<StudentController>(StudentController);
      service = module.get<StudentService>(StudentService);
   });

   it('controller should be Defined', () => {
      expect(controller).toBeDefined();
   });

   it('get all students', async () => {
      const data = await controller.getAll();
      await expect(data).toEqual(studentArray);
   });

   it('check student exist', async () => {
      const data = await controller.checkUuid('uuid1');
      await expect(data).toEqual(singleRecord);
   });

   it('search by kana', async () => {
      const data = await controller.searchStudentByKana('テスト2');
      await expect(data).toEqual(singleRecord);
   });

   it('update Student', async () => {
      const data = await controller.update({
         email: 'example2.com',
         sex: '男',
         jobs: '祖父',
         name: 'テストゲスト',
      });
      await expect(data).toEqual(singleRecordwithGuest);
   });
});
