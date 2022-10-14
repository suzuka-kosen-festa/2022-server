import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Prisma } from '@prisma/client';
import * as request from 'supertest';
import { JhsTestRecord, StudentTestRecord, ObTestRecord, SponsorTestRecord } from './types';

describe('AppController (e2e)', () => {
   let app: INestApplication;

   beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
         imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
   });
   afterAll(async () => {
      await app.close();
   });

   describe('HealthCheck Module(e2e)', () => {
      it('check httpHealth', async () => {
         const expectedResult = {
            status: 'ok',
            info: {
               httpHealth: {
                  status: 'up',
               },
            },
            error: {},
            details: {
               httpHealth: {
                  status: 'up',
               },
            },
         };

         const testResult = await request(app.getHttpServer())
            .get('/health/http')
            .then((res) => res.body);
         expect(testResult).toEqual(expectedResult);
      });

      it('check dbHealth', async () => {
         const expectedResult = {
            status: 'ok',
            info: {
               db: {
                  status: 'up',
               },
            },
            error: {},
            details: {
               db: {
                  status: 'up',
               },
            },
         };

         const testResult = await request(app.getHttpServer())
            .get('/health/db')
            .then((res) => res.body);
         expect(testResult).toEqual(expectedResult);
      });
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
               Guest: [],
               ...res,
            },
         ];

         expect(
            await request(app.getHttpServer())
               .get('/student')
               .then((res) => res.body),
         ).toEqual(result);
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

         const { email, ...rest } = guestRecord;

         result[0].Guest = [
            {
               guestId: resGuestData.guestId,
               hostId: resGuestData.hostId,
               hostJhsId: null,
               ...rest,
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
               ...parentsData,
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

   describe('OB Module (e2e)', () => {
      let result: ObTestRecord[];

      it('create record and get it', async () => {
         const obData: Prisma.OBCreateInput = {
            name: 'てすと',
            email: 'test@example',
         };

         const res = await request(app.getHttpServer())
            .post('/ob')
            .send(obData)
            .then((res) => res.body);

         result = [
            {
               obId: res.obId,
               ...obData,
            },
         ];

         expect(
            await request(app.getHttpServer())
               .get('/ob')
               .then((res) => res.body),
         ).toEqual(result);
      });

      it('check uuid exist', async () => {
         const res = await request(app.getHttpServer())
            .get(`/ob/check/${result[0].obId}`)
            .then((res) => res.body);

         expect(res).toEqual(result[0]);
      });

      it('delete', async () => {
         await request(app.getHttpServer()).delete(`/ob/${result[0].obId}`);

         expect(
            await request(app.getHttpServer())
               .get('/ob')
               .then((res) => res.body),
         ).toEqual([]);
      });
   });

   describe('Sponsor Module(e2e)', () => {
      let result: SponsorTestRecord[];

      it('create record and get it', async () => {
         const sponsorData: Prisma.SponsorCreateInput = {
            email: 'test@example.com',
            name: 'てすとすぽんさー',
         };

         const res = await request(app.getHttpServer())
            .post('/sponsor')
            .send(sponsorData)
            .then((res) => res.body);

         result = [
            {
               sponsorId: res.sponsorId,
               ...sponsorData,
            },
         ];

         expect(
            await request(app.getHttpServer())
               .get('/sponsor')
               .then((res) => res.body),
         ).toEqual(result);
      });

      it('check record exist', async () => {
         const data = await request(app.getHttpServer())
            .get(`/sponsor/check/${result[0].sponsorId}`)
            .then((res) => res.body);
         expect(data).toEqual(result[0]);
      });

      it('delete', async () => {
         await request(app.getHttpServer()).delete(`/sponsor/${result[0].sponsorId}`);

         expect(
            await request(app.getHttpServer())
               .get('/sponsor')
               .then((res) => res.body),
         ).toEqual([]);
      });
   });

   describe('app Module(e2e)', () => {
      it('export GuestId by Student', async () => {
         const studentData: Prisma.StudentCreateInput = {
            kana: 'てすと',
            email: 'test@example.com',
         };

         await request(app.getHttpServer()).post('/student').send(studentData);

         const guestData = {
            email: studentData.email,
            name: 'てすと',
            sex: '男',
            jobs: '祖父',
         };

         const guestResData = await request(app.getHttpServer()).put('/student').send(guestData);

         const expectData = [{
            email: 'test@example.com',
            guest:[{
               guestId: "G" + guestResData.body.Guest[0].guestId,
               name : guestResData.body.Guest[0].name
            }]
         }]

         const res = await request(app.getHttpServer())
            .get('/admin/studentguest')
            .then((res) => res.body);

         expect(res).toEqual(expectData)

         const studentId = await request(app.getHttpServer()).get('/student').then(res => res.body[0].studentId)

         await request(app.getHttpServer()).delete(`/student/${studentId}`)
      });

      it("export GuestId by Jhs",async () => {
         const jhsData : Prisma.JHStudentCreateInput = {
            email: 'test@example.com',
            name: 'てすと',
            age: "15"
         }

         const jhsResData = await request(app.getHttpServer()).post('/jhs').send(jhsData);

         const guestData = {
            email: jhsData.email,
            name: 'てすと',
            sex: '男',
            jobs: '祖父',
         };

         const guestResData = await request(app.getHttpServer()).put('/jhs').send(guestData);

         const expectData = [{
            email: 'test@example.com',
            jhsId: "J" + jhsResData.body.jhsId,
            parents:[{
               guestId: "G" + guestResData.body.parents[0].guestId,
               name : guestResData.body.parents[0].name
            }]
         }]

         const res = await request(app.getHttpServer())
         .get('/admin/jhsguest')
         .then((res) => res.body);

         expect(res).toEqual(expectData)

         const jhsId = await request(app.getHttpServer()).get('/jhs').then(res => res.body[0].jhsId)

         await request(app.getHttpServer()).delete(`/jhs/${jhsId}`)
      })

      it("export obId",async () => {
         const obData: Prisma.OBCreateInput = {
            name: 'てすと',
            email: 'test@example.com',
         };

         const obResData = await request(app.getHttpServer()).post("/ob").send(obData)

         const expectData = [{
            email : obData.email,
            obId : "O" + obResData.body.obId
         }]
         
         const res = await request(app.getHttpServer())
         .get('/admin/ob')
         .then((res) => res.body);

         expect(res).toEqual(expectData)

         await request(app.getHttpServer()).delete(`/ob/${obResData.body.obId}`)
      })

      it("export SponsorId",async () => {
         const sponsorData : Prisma.SponsorCreateInput ={
            email : 'test@example.com',
            name: 'テスト'
         }

         const sponsorResData = await request(app.getHttpServer()).post('/sponsor').send(sponsorData)

         const expectData = [{
            email : sponsorData.email,
            sponsorId : "S" + sponsorResData.body.sponsorId
         }]

         const res = await request(app.getHttpServer())
         .get('/admin/sponsor')
         .then((res) => res.body);

         expect(res).toEqual(expectData)

         await request(app.getHttpServer()).delete(`/sponsor/${sponsorResData.body.sponsorId}`)
      })
   });
});
