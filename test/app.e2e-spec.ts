import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Bazaar, LiveEvent, Prisma, SponsorCompany } from '@prisma/client';
import * as request from 'supertest';
import { JhsTestRecord, StudentTestRecord, ObTestRecord, SponsorTestRecord } from './types';

describe('App (e2e)', () => {
   let app: INestApplication;
   let jwt_token: string;

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

   describe('AuthModule(e2e)', () => {
      it('get token and test', async () => {
         const authData = {
            username: 'admin',
            password: process.env.PASSWORD,
         };
         jwt_token = await request(app.getHttpServer())
            .post('/auth')
            .send(authData)
            .then((res) => res.body.access_token);

         const res = await request(app.getHttpServer())
            .get('/auth/test')
            .set({ Authorization: `Bearer ${jwt_token}` });

         console.log(res.text);
         expect(res.text).toEqual('success');
      });
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
            .set({ Authorization: `Bearer ${jwt_token}` })
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
            .set({ Authorization: `Bearer ${jwt_token}` })
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
            Guest: {
               create: {
                  name: 'てすと',
                  sex: '男',
                  jobs: '祖父',
               },
            },
         };

         const res = await request(app.getHttpServer())
            .post('/student')
            .send(record)
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         result[0] = {
            studentId: res.studentId,
            email: 'test@example.com',
            kana: 'てすと',
            Guest: [
               {
                  hostId: res.Guest[0].hostId,
                  guestId: res.Guest[0].guestId,
                  name: 'てすと',
                  sex: '男',
                  jobs: '祖父',
                  hostJhsId: null,
               },
            ],
         };

         expect(
            await request(app.getHttpServer())
               .get('/student')
               .set({ Authorization: `Bearer ${jwt_token}` })
               .then((res) => res.body),
         ).toEqual(result);
      });

      it('update student record and get it', async () => {
         const data = {
            kana: 'てすと2',
         };

         await request(app.getHttpServer())
            .put(`/student/${result[0].email}`)
            .send(data)
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         result[0].kana = data.kana;

         expect(
            await request(app.getHttpServer())
               .get('/student')
               .set({ Authorization: `Bearer ${jwt_token}` })
               .then((res) => res.body),
         ).toEqual(result);
      });

      it('check uuid exist', async () => {
         const res = await request(app.getHttpServer())
            .get(`/student/check/${result[0].studentId}`)
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         const { Guest, ...testResult } = result[0];

         expect(res).toEqual(testResult);
      });

      it('get Guest record', async () => {
         result = await request(app.getHttpServer())
            .get('/student')
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         const testRecord = await request(app.getHttpServer())
            .get('/guest')
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         const { Guest } = result[0];

         expect(testRecord).toEqual(Guest);
      });

      it('check uuid exist', async () => {
         const res = await request(app.getHttpServer())
            .get(`/guest/check/${result[0].Guest[0].guestId}`)
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         const { Guest } = result[0];

         const expectedResult = { History: [{ timeStamp: res.History[0].timeStamp }], ...Guest[0] };

         expect(res).toEqual(expectedResult);
      });

      it('search by kana', async () => {
         const kana = encodeURI(result[0].kana);
         const res = await request(app.getHttpServer())
            .get(`/student/${kana}`)
            .set({ Authorization: `Bearer ${jwt_token}` });

         expect(res.body).toEqual(result);
      });

      it('delete', async () => {
         await request(app.getHttpServer())
            .delete(`/student/${result[0].studentId}`)
            .set({ Authorization: `Bearer ${jwt_token}` });

         expect(
            await request(app.getHttpServer())
               .get('/student')
               .set({ Authorization: `Bearer ${jwt_token}` })
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
            parents: {
               create: {
                  name: 'てすとぺあれんと',
                  sex: '男',
                  jobs: '保護者',
               },
            },
         };

         const res = await request(app.getHttpServer())
            .post('/jhs')
            .send(record)
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         result[0] = {
            jhsId: res.jhsId,
            email: 'test1@example.com',
            name: 'てすと',
            age: '20',
            parents: [
               {
                  guestId: res.parents[0].guestId,
                  name: 'てすとぺあれんと',
                  sex: '男',
                  jobs: '保護者',
                  hostJhsId: res.parents[0].hostJhsId,
                  hostId: null,
               },
            ],
         };

         const expectedResult = await request(app.getHttpServer())
            .get('/jhs')
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         expect(expectedResult).toEqual(result);
      });

      it('update jhs and get it', async () => {
         const data = {
            name: 'てすと',
         };

         await request(app.getHttpServer())
            .put('/jhs')
            .send(data)
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         result[0].name = data.name;

         expect(
            await request(app.getHttpServer())
               .get('/jhs')
               .set({ Authorization: `Bearer ${jwt_token}` })
               .then((res) => res.body),
         ).toEqual(result);
      });

      it('check uuid exist', async () => {
         const res = await request(app.getHttpServer())
            .get(`/jhs/check/${result[0].jhsId}`)
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         const { parents, ...testResult } = result[0];

         const expectedResult = { History: [{ timeStamp: res.History[0].timeStamp }], ...testResult };

         expect(res).toEqual(expectedResult);
      });

      it('search by name', async () => {
         const name = encodeURI(result[0].name);
         const res = await request(app.getHttpServer())
            .get(`/jhs/${name}`)
            .set({ Authorization: `Bearer ${jwt_token}` });

         expect(res.body).toEqual(result);
      });

      it('delete', async () => {
         await request(app.getHttpServer())
            .delete(`/jhs/${result[0].jhsId}`)
            .set({ Authorization: `Bearer ${jwt_token}` });

         expect(
            await request(app.getHttpServer())
               .get('/jhs')
               .set({ Authorization: `Bearer ${jwt_token}` })
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
            .set({ Authorization: `Bearer ${jwt_token}` })
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
               .set({ Authorization: `Bearer ${jwt_token}` })
               .then((res) => res.body),
         ).toEqual(result);
      });

      it('check uuid exist', async () => {
         const res = await request(app.getHttpServer())
            .get(`/ob/check/${result[0].obId}`)
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         const expectedResult = { History: [{ timeStamp: res.History[0].timeStamp }], ...result[0] };
         expect(res).toEqual(expectedResult);
      });

      it('search by name', async () => {
         const name = encodeURI(result[0].name);
         const res = await request(app.getHttpServer())
            .get(`/ob/${name}`)
            .set({ Authorization: `Bearer ${jwt_token}` });

         expect(res.body).toEqual(result);
      });

      it('delete', async () => {
         await request(app.getHttpServer())
            .delete(`/ob/${result[0].obId}`)
            .set({ Authorization: `Bearer ${jwt_token}` });

         expect(
            await request(app.getHttpServer())
               .get('/ob')
               .set({ Authorization: `Bearer ${jwt_token}` })
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
            .set({ Authorization: `Bearer ${jwt_token}` })
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
               .set({ Authorization: `Bearer ${jwt_token}` })
               .then((res) => res.body),
         ).toEqual(result);
      });

      it('check record exist', async () => {
         const res = await request(app.getHttpServer())
            .get(`/sponsor/check/${result[0].sponsorId}`)
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         const expectedResult = { History: [{ timeStamp: res.History[0].timeStamp }], ...result[0] };
         expect(res).toEqual(expectedResult);
      });

      it('search by name', async () => {
         const name = encodeURI(result[0].name);
         const res = await request(app.getHttpServer())
            .get(`/sponsor/${name}`)
            .set({ Authorization: `Bearer ${jwt_token}` });

         expect(res.body).toEqual(result);
      });

      it('delete', async () => {
         await request(app.getHttpServer())
            .delete(`/sponsor/${result[0].sponsorId}`)
            .set({ Authorization: `Bearer ${jwt_token}` });

         expect(
            await request(app.getHttpServer())
               .get('/sponsor')
               .set({ Authorization: `Bearer ${jwt_token}` })
               .then((res) => res.body),
         ).toEqual([]);
      });
   });

   describe('admin Module(e2e)', () => {
      it('export GuestId by Student', async () => {
         const studentData: Prisma.StudentCreateInput = {
            kana: 'てすと',
            email: 'test@example.com',
            Guest: {
               create: {
                  name: 'てすと',
                  sex: '男',
                  jobs: '祖父',
               },
            },
         };

         const createData = await request(app.getHttpServer())
            .post('/student')
            .send(studentData)
            .set({ Authorization: `Bearer ${jwt_token}` });

         const expectData = [
            {
               email: 'test@example.com',
               guest: [
                  {
                     guestId: 'G' + createData.body.Guest[0].guestId,
                     name: createData.body.Guest[0].name,
                  },
               ],
            },
         ];

         const res = await request(app.getHttpServer())
            .get('/admin/studentguest')
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         expect(res).toEqual(expectData);

         const studentId = await request(app.getHttpServer())
            .get('/student')
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body[0].studentId);

         await request(app.getHttpServer())
            .delete(`/student/${studentId}`)
            .set({ Authorization: `Bearer ${jwt_token}` });
      });

      it('export GuestId by Jhs', async () => {
         const jhsData: Prisma.JHStudentCreateInput = {
            email: 'test@example.com',
            name: 'てすと',
            age: '15',
            parents: {
               create: {
                  name: 'てすと',
                  sex: '男',
                  jobs: '祖父',
               },
            },
         };

         const jhsResData = await request(app.getHttpServer())
            .post('/jhs')
            .send(jhsData)
            .set({ Authorization: `Bearer ${jwt_token}` });

         const expectData = [
            {
               email: 'test@example.com',
               jhsId: 'J' + jhsResData.body.jhsId,
               name: jhsResData.body.name,
               parents: [
                  {
                     guestId: 'G' + jhsResData.body.parents[0].guestId,
                     name: jhsResData.body.parents[0].name,
                  },
               ],
            },
         ];

         const res = await request(app.getHttpServer())
            .get('/admin/jhsguest')
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         expect(res).toEqual(expectData);

         const jhsId = await request(app.getHttpServer())
            .get('/jhs')
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body[0].jhsId);

         await request(app.getHttpServer())
            .delete(`/jhs/${jhsId}`)
            .set({ Authorization: `Bearer ${jwt_token}` });
      });

      it('export obId', async () => {
         const obData: Prisma.OBCreateInput = {
            name: 'てすと',
            email: 'test@example.com',
         };

         const obResData = await request(app.getHttpServer())
            .post('/ob')
            .send(obData)
            .set({ Authorization: `Bearer ${jwt_token}` });

         const expectData = [
            {
               email: obData.email,
               obId: 'O' + obResData.body.obId,
            },
         ];

         const res = await request(app.getHttpServer())
            .get('/admin/ob')
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         expect(res).toEqual(expectData);

         await request(app.getHttpServer())
            .delete(`/ob/${obResData.body.obId}`)
            .set({ Authorization: `Bearer ${jwt_token}` });
      });

      it('export SponsorId', async () => {
         const sponsorData: Prisma.SponsorCreateInput = {
            email: 'test@example.com',
            name: 'テスト',
         };

         const sponsorResData = await request(app.getHttpServer())
            .post('/sponsor')
            .send(sponsorData)
            .set({ Authorization: `Bearer ${jwt_token}` });

         const expectData = [
            {
               email: sponsorData.email,
               sponsorId: 'S' + sponsorResData.body.sponsorId,
            },
         ];

         const res = await request(app.getHttpServer())
            .get('/admin/sponsor')
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then((res) => res.body);

         expect(res).toEqual(expectData);

         await request(app.getHttpServer())
            .delete(`/sponsor/${sponsorResData.body.sponsorId}`)
            .set({ Authorization: `Bearer ${jwt_token}` });
      });
   });

   /**
    *
    *
    *  HP用APIE2Eテスト
    *
    *
    */

   describe('SponsorCompany Module (e2e)', () => {
      let result: SponsorCompany[];

      it('create record and get it', async () => {
         const data: Prisma.SponsorCompanyCreateInput = {
            name: '会社名1',
         };

         const res = await request(app.getHttpServer())
            .post('/sponsorcompany')
            .send(data)
            .set({ Authorization: `Bearer ${jwt_token}` });

         result = [
            {
               id: res.body.id,
               name: data.name,
            },
         ];

         const allRecord = await request(app.getHttpServer())
            .get('/sponsorcompany')
            .set({ Authorization: `Bearer ${jwt_token}` });
         expect(allRecord.body).toEqual(result);
      });

      it('getById', async () => {
         const res = await request(app.getHttpServer())
            .get(`/sponsorcompany/${result[0].id}`)
            .set({ Authorization: `Bearer ${jwt_token}` });

         expect(res.body).toEqual(result[0]);
      });

      it('update', async () => {
         const data: Prisma.SponsorCompanyUpdateInput = {
            name: '会社名2',
         };

         const res = await request(app.getHttpServer())
            .put(`/sponsorcompany/${result[0].id}`)
            .send(data)
            .set({ Authorization: `Bearer ${jwt_token}` });

         const expectedResult = {
            id: result[0].id,
            name: data.name,
         };

         expect(res.body).toEqual(expectedResult);
      });

      it('delete', async () => {
         await request(app.getHttpServer())
            .delete(`/sponsorcompany/${result[0].id}`)
            .set({ Authorization: `Bearer ${jwt_token}` });

         const res = await request(app.getHttpServer())
            .get('/sponsorcompany')
            .set({ Authorization: `Bearer ${jwt_token}` });

         expect(res.body).toEqual([]);
      });
   });

   describe('LiveEvent Module(e2e)', () => {
      const dataList: Prisma.LiveEventCreateInput[] = [
         {
            title: 'タイトル1',
            descriptions: '説明1',
            date: '2022-10-30 09:30',
            venue: '会場1',
            start_time: '2022-10-30 09:30',
            end_time: '2022-10-30 11:00',
            stage: 'main',
         },
         {
            title: 'タイトル2',
            descriptions: '説明2',
            date: '2022-10-31 11:30',
            venue: '会場2',
            start_time: '2022-10-31 11:30',
            end_time: '2022-10-31 13:00',
            stage: 'sub',
         },
         {
            title: 'タイトル3',
            descriptions: '説明3',
            date: '2022-10-31 10:30',
            venue: '会場3',
            start_time: '2022-10-30 12:30',
            end_time: '2022-10-30 11:00',
            stage: 'game',
         },
         {
            title: 'タイトル4',
            descriptions: '説明4',
            date: '2022-10-30 09:30',
            venue: '会場4',
            start_time: '2022-10-30 09:30',
            end_time: '2022-10-30 12:00',
            stage: 'sub',
         },
         {
            title: 'タイトル5',
            descriptions: '説明5',
            date: '2022-10-30 14:30',
            venue: '会場5',
            start_time: '2022-10-31 14:30',
            end_time: '2022-10-31 16:00',
            stage: 'live',
         },
         {
            title: 'タイトル6',
            descriptions: '説明6',
            date: '2022-10-30 09:00',
            venue: '会場6',
            start_time: '2022-10-30 09:00',
            end_time: '2022-10-30 13:00',
            stage: 'live',
         },
         {
            title: 'タイトル7',
            descriptions: '説明7',
            date: '2022-10-30 09:30',
            venue: '会場7',
            start_time: '2022-10-31 09:30',
            end_time: '2022-10-30 11:00',
            stage: 'game',
         },
      ];

      it('create and get it', async () => {
         const expectedResult = {
            main: [
               {
                  id: 1,
                  ...dataList[0],
               },
            ],
            sub: [
               {
                  id: 4,
                  ...dataList[3],
               },
               {
                  id: 2,
                  ...dataList[1],
               },
            ],
            live: [
               {
                  id: 6,
                  ...dataList[5],
               },
               {
                  id: 5,
                  ...dataList[4],
               },
            ],
            game: [
               {
                  id: 3,
                  ...dataList[2],
               },
               {
                  id: 7,
                  ...dataList[6],
               },
            ],
         };

         await request(app.getHttpServer())
            .post('/liveevent')
            .send(dataList[0])
            .set({ Authorization: `Bearer ${jwt_token}` })
            .then(() =>
               request(app.getHttpServer())
                  .post('/liveevent')
                  .send(dataList[1])
                  .set({ Authorization: `Bearer ${jwt_token}` }),
            )
            .then(() =>
               request(app.getHttpServer())
                  .post('/liveevent')
                  .send(dataList[2])
                  .set({ Authorization: `Bearer ${jwt_token}` }),
            )
            .then(() =>
               request(app.getHttpServer())
                  .post('/liveevent')
                  .send(dataList[3])
                  .set({ Authorization: `Bearer ${jwt_token}` }),
            )
            .then(() =>
               request(app.getHttpServer())
                  .post('/liveevent')
                  .send(dataList[4])
                  .set({ Authorization: `Bearer ${jwt_token}` }),
            )
            .then(() =>
               request(app.getHttpServer())
                  .post('/liveevent')
                  .send(dataList[5])
                  .set({ Authorization: `Bearer ${jwt_token}` }),
            )
            .then(() =>
               request(app.getHttpServer())
                  .post('/liveevent')
                  .send(dataList[6])
                  .set({ Authorization: `Bearer ${jwt_token}` }),
            );

         // 信じてたのに...😥
         // await Promise.all(
         //    dataList.map((data) => new Promise((resolve) => resolve(request(app.getHttpServer()).post('/liveevent').send(data)))),
         // )

         const res = await request(app.getHttpServer())
            .get('/liveevent')
            .set({ Authorization: `Bearer ${jwt_token}` });

         expect(res.body).toEqual(expectedResult);
      });

      it('get upcoming events ', async () => {
         const res = await request(app.getHttpServer())
            .get('/liveevent/near')
            .set({ Authorization: `Bearer ${jwt_token}` });
         const date = new Date().toLocaleString('ja', { timeZone: 'Asia/Tokyo' });
         const now = date.replace(/\//g, '-');

         const sortData = (
            dataList.flatMap((data) => {
               return now < data.date ? data : [];
            }) as LiveEvent[]
         ).sort((a, b) => {
            return a.start_time > b.start_time ? 1 : -1;
         });

         expect(res.body).toEqual(sortData.slice(0, 4));
      });

      it('get by date', async () => {
         const date = encodeURI('2022-10-30');
         const data = await request(app.getHttpServer())
            .get(`/liveevent/${date}`)
            .set({ Authorization: `Bearer ${jwt_token}` });

         console.log(data.body);

         const expectedResult = {
            main: [
               {
                  title: 'タイトル1',
                  venue: '会場1',
                  descriptions: '説明1',
                  date: '2022-10-30 09:30',
                  stage: 'main',
                  start_time: '2022-10-30 09:30',
                  end_time: '2022-10-30 11:00',
               },
            ],
            sub: [
               {
                  title: 'タイトル4',
                  venue: '会場4',
                  descriptions: '説明4',
                  date: '2022-10-30 09:30',
                  stage: 'sub',
                  start_time: '2022-10-30 09:30',
                  end_time: '2022-10-30 12:00',
               },
            ],
            live: [
               {
                  title: 'タイトル6',
                  venue: '会場6',
                  descriptions: '説明6',
                  date: '2022-10-30 09:00',
                  stage: 'live',
                  start_time: '2022-10-30 09:00',
                  end_time: '2022-10-30 13:00',
               },
               {
                  title: 'タイトル5',
                  venue: '会場5',
                  descriptions: '説明5',
                  date: '2022-10-30 14:30',
                  stage: 'live',
                  start_time: '2022-10-31 14:30',
                  end_time: '2022-10-31 16:00',
               },
            ],
            game: [
               {
                  title: 'タイトル7',
                  venue: '会場7',
                  descriptions: '説明7',
                  date: '2022-10-30 09:30',
                  stage: 'game',
                  start_time: '2022-10-31 09:30',
                  end_time: '2022-10-30 11:00',
               },
            ],
         };

         expect(data.body).toEqual(expectedResult);
      });

      it('getById', async () => {
         const res = await request(app.getHttpServer())
            .get('/liveevent/id/1')
            .set({ Authorization: `Bearer ${jwt_token}` });

         const expectedResult = {
            id: 1,
            ...dataList[0],
         };

         expect(res.body).toEqual(expectedResult);
      });

      it('update', async () => {
         const data: Prisma.LiveEventUpdateInput = {
            title: '変更後のタイトル',
         };

         const res = await request(app.getHttpServer())
            .put('/liveevent/1')
            .send(data)
            .set({ Authorization: `Bearer ${jwt_token}` });

         const expectedResult: LiveEvent = {
            ...dataList[0],
            title: '変更後のタイトル',
            id: 1,
         };

         expect(res.body).toEqual(expectedResult);
      });

      it('delete', async () => {
         for (let id = 1; id <= dataList.length; id++) {
            await request(app.getHttpServer())
               .delete(`/liveevent/${id}`)
               .set({ Authorization: `Bearer ${jwt_token}` });
         }

         const res = await request(app.getHttpServer())
            .get('/liveevent')
            .set({ Authorization: `Bearer ${jwt_token}` });
         expect(res.body).toEqual({ game: [], live: [], main: [], sub: [] });
      });
   });

   describe('bazaar Module(e2e)', () => {
      it('create and get it', async () => {
         const bazaarData: Prisma.BazaarCreateInput = {
            name: 'バザー1',
            descriptions: '説明1',
            image: 'url1.com',
            group: '部活1',
            group_type: 'eating',
         };

         const pricesList = [
            {
               price: '130円',
            },
            {
               price: '130円',
            },
         ];

         const pricesData: Prisma.BazaarPricesUpdateManyWithoutBazaarNestedInput = {
            create: pricesList,
         };

         const data: Prisma.BazaarCreateInput = {
            ...bazaarData,
            prices: pricesData,
         };
         const res = await request(app.getHttpServer())
            .post('/bazaar')
            .send(data)
            .set({ Authorization: `Bearer ${jwt_token}` });

         const expectedResult = {
            id: 1,
            ...bazaarData,
            prices: [
               {
                  bazaarId: 1,
                  id: 1,
                  price: '130円',
               },
               {
                  bazaarId: 1,
                  id: 2,
                  price: '130円',
               },
            ],
         };

         expect(res.body).toEqual(expectedResult);
      });

      it('update', async () => {
         const bazaarData: Bazaar = {
            id: 1,
            name: 'バザー2',
            descriptions: '説明2',
            image: 'url1.com',
            group: '部活2',
            group_type: 'eating',
         };

         const pricesList = [
            {
               price: '130円',
            },
            {
               price: '130円',
            },
         ];

         const pricesData: Prisma.BazaarPricesUpdateManyWithoutBazaarNestedInput = {
            create: pricesList,
         };

         const data: Prisma.BazaarUpdateInput = {
            ...bazaarData,
            prices: pricesData,
         };

         const res = await request(app.getHttpServer())
            .put('/bazaar/1')
            .send(data)
            .set({ Authorization: `Bearer ${jwt_token}` });

         const priceres = await request(app.getHttpServer())
            .get('/bazaarprices')
            .set({ Authorization: `Bearer ${jwt_token}` });

         const expectedResult = {
            ...bazaarData,
            prices: priceres.body,
         };

         expect(res.body).toEqual(expectedResult);
      });

      it('delete', async () => {
         await request(app.getHttpServer())
            .delete(`/bazaar/1`)
            .set({ Authorization: `Bearer ${jwt_token}` });
         const res = await request(app.getHttpServer())
            .get('/bazaar')
            .set({ Authorization: `Bearer ${jwt_token}` });

         expect(res.body).toEqual([]);
      });
   });
});
