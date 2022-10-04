import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Prisma } from '@prisma/client';
import * as request from 'supertest';
import { JhsTestRecord, StudentTestRecord } from './type';

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

   describe('Student and GuestModule(e2e)', () => {
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

         const testResult = await request(app.getHttpServer()).get('/student');

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

         const resGuestData = res.Guest[0];

         result[0].Guest = [
            {
               guestId: resGuestData.guestId,
               hostId: resGuestData.hostId,
               sex: guestRecord.sex,
               name: guestRecord.name,
               jobs: guestRecord.jobs,
               hostJhsId: null,
            },
         ];

         expect(
            await request(app.getHttpServer())
               .get('/student')
               .then((res) => res.body),
         ).toEqual(result);
      });

      it('check uuid exist', async () => {
         const res = await request(app.getHttpServer())
            .get(`/student/check/${result[0].studentId}`)
            .then((res) => res.body);

         const { Guest, ...testResult } = result[0];

         expect(res).toEqual(testResult);
      });

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

      it('delete', async () => {
         await request(app.getHttpServer()).delete(`/student/${result[0].studentId}`);

         expect(
            await request(app.getHttpServer())
               .get('/student')
               .then((res) => res.body),
         ).toEqual([]);
      });
   });

   describe('JHS Module and GuestModule(e2e)', () => {
      let result = new Array<JhsTestRecord>(null);

      it('create jhs record and get it', async () => {
         const record: Prisma.JHStudentCreateInput = {
            age: '20',
            name: 'てすと',
            email: 'test1@example.com',
         };

         const createdResult = await request(app.getHttpServer())
            .post('/jhs')
            .send(record)
            .then((res) => res.body);

         result = [
            {
               jhsId: createdResult.jhsId,
               ...record,
               parents: [],
            },
         ];

         const expectedResult = await request(app.getHttpServer())
            .get('/jhs')
            .then((res) => res.body);

         expect(expectedResult).toEqual(result);
      });

      it('update jhs and get it', async () => {
         const parentsRecord: Pick<Prisma.JHStudentUpdateInput, 'email'> & Prisma.GuestCreateInput = {
            email: 'test1@example.com',
            name: 'てすとぺあれんと',
            sex: '男',
            jobs: '保護者',
         };

         const updatedRecord = await request(app.getHttpServer())
            .put('/jhs')
            .send(parentsRecord)
            .then((res) => res.body);

         const parentsData = updatedRecord.parents[0];

         result[0].parents = [
            {
               guestId: parentsData.guestId,
               hostJhsId: parentsData.hostJhsId,
               name: parentsData.name,
               sex: parentsData.sex,
               jobs: parentsData.jobs,
               hostId: null,
            },
         ];

         expect(
            await request(app.getHttpServer())
               .get('/jhs')
               .then((res) => res.body),
         ).toEqual(result);
      });

      it('check uuid exist', async () => {
         const res = await request(app.getHttpServer())
            .get(`/jhs/check/${result[0].jhsId}`)
            .then((res) => res.body);

         const { parents, ...testResult } = result[0];

         expect(res).toEqual(testResult);
      });

      it('delete', async () => {
         await request(app.getHttpServer()).delete(`/jhs/${result[0].jhsId}`);

         expect(
            await request(app.getHttpServer())
               .get('/jhs')
               .then((res) => res.body),
         ).toEqual([]);
      });
   });

   describe("OB Module (e2e)", () =>{
      
   })
});
