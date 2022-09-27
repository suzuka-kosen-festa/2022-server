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

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [StudentController],
         providers: [
            {
               provide: StudentService,
               useValue: {
                  createStudent: jest
                     .fn()
                     .mockImplementation((data: Prisma.StudentCreateInput) =>
                        Promise.resolve(data),
                     ),
                  checkStudentExist: jest
                     .fn()
                     .mockImplementation((uuid: string) =>
                        Promise.resolve(singleRecord),
                     ),
                  updateStudent: jest
                     .fn()
                     .mockImplementation((data: Prisma.StudentUpdateInput) =>
                        Promise.resolve(singleRecordwithGuest),
                     ),
                  getAllStudents: jest
                     .fn()
                     .mockImplementation(() => studentArray),
               },
            },
         ],
      }).compile();

      controller = module.get<StudentController>(StudentController);
      service = module.get<StudentService>(StudentService);
   });

   test('controller should be Defined', () => {
      expect(controller).toBeDefined();
   });

   test('service should be Defined', () => {
      expect(service).toBeDefined();
   });

   test('get all students', async () => {
      const data = await controller.getAllStudent();
      await expect(data).toEqual(studentArray);
   });

   test('check student exist', async () => {
      const data = await controller.checkUuid('uuid1');
      await expect(data).toEqual(singleRecord);
   });

   test('update Student', async () => {
      const data = await controller.updateStudent({
         email: 'example2.com',
         sex: '男',
         jobs: '祖父',
         name: 'テストゲスト',
      });
      await expect(data).toEqual(singleRecordwithGuest);
   });
});
