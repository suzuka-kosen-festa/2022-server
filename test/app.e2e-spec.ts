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
   it('check httpHealth', () => {
      const result = {
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
      return request(app.getHttpServer()).get('/health/http').expect(200).expect(result);
   });

   it('check dbHealth', () => {
      const result = {
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
      return request(app.getHttpServer()).get('/health/db').expect(200).expect(result);
   });

   it('create student record and get it', async () => {
      const record : Prisma.StudentCreateInput = {
         email: 'test@example.com',
         kana: 'てすと'
      } 
      const res = await request(app.getHttpServer()).post('/student').send({email: record.email , kana: record.kana})

      console.log(res.body)
      const result  = [{
         studentId : res.body.studentId,
         kana : res.body.kana,
         email : res.body.email,
         Guest: []
      }]
      
      return request(app.getHttpServer()).get('/student').expect(200).expect(result)
   })

   

   it('check getStudent', async () => {
      
   });
});
