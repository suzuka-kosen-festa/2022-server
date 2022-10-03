import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Prisma } from '@prisma/client';

describe('AppController (e2e)', () => {
   let app: INestApplication;

   beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
         imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
   });
   afterAll(async () => {
      await app.close();
   });

   describe('test student module', () => {
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

   describe('test guest module', () => {
      type GuestTestRecord = Omit<Prisma.StudentCreateInput, 'Guest'> & {
         Guest?: Prisma.GuestCreateManyInput[];
      };

      let result = new Array<GuestTestRecord>(null);
      it('get Guest record', async () => {
         result = await request(app.getHttpServer())
            .get('/student')
            .then((res) => res.body);

         const testRecord = await request(app.getHttpServer())
            .get('/guest')
            .then((res) => res.body);

         const { Guest } = result[0];

         expect(testRecord).toEqual(Guest);
      });

      it('check uuid exist', async () => {
         const testRecord = await request(app.getHttpServer())
            .get(`/guest/check/${result[0].Guest[0].guestId}`)
            .then((res) => res.body);

         const { Guest } = result[0];

         expect(testRecord).toEqual(Guest[0]);
      });
   });
});
