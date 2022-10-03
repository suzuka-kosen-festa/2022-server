import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Prisma } from "@prisma/client";
import * as request from 'supertest';
import { StudentModule } from "./student.module";

describe('Student Module(e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
     const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [StudentModule],
     }).compile();

     app = moduleFixture.createNestApplication();
     await app.init();
  });
  afterAll(async () => {
     await app.close();
  });
  
  type StudentTestRecord = Omit<Prisma.StudentCreateInput, 'Guest'> & {
     Guest?: Prisma.GuestCreateManyInput[];
  };

  let result = new Array<StudentTestRecord>(null);
  it('create student record and get it', async () => {
     const record: Prisma.StudentCreateInput = {
        email: 'test@example.com',
        kana: 'てすと',
     };

     const res = await request(app.getHttpServer())
        .post('/student')
        .send(record)
        .then((res) => res.body);

     result = [
        {
           studentId: res.studentId,
           kana: res.kana,
           email: res.email,
           Guest: [],
        },
     ];

     const testResult = await request(app.getHttpServer()).get('/student').expect(200);

     expect(testResult.body).toEqual(result);
  });

  it('update student record and get it', async () => {
     const guestRecord: Pick<Prisma.StudentUpdateInput, 'email'> & Prisma.GuestCreateInput = {
        email: 'test@example.com',
        name: 'てすとほすと',
        sex: '男',
        jobs: '祖父',
     };

     const res = await request(app.getHttpServer())
        .put('/student')
        .send(guestRecord)
        .then((res) => res.body);

     const { Guest, ...testResult } = result[0];
     expect(res).toEqual(testResult);
  });

  it('check uuid exist', async () => {
     const res = await request(app.getHttpServer())
        .get(`/student/check/${result[0].studentId}`)
        .then((res) => res.body);

     const { Guest, ...testResult } = result[0];

     expect(res).toEqual(testResult);
  });
});