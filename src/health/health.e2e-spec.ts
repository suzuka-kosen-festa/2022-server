import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HealthModule } from './health.module';

describe('Health Module (e2e)', () => {
   let app: INestApplication;

   beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
         imports: [HealthModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
   });
   afterAll(async () => {
      await app.close();
   });

   it('check httpHealth', async () => {
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

      const testResult = await request(app.getHttpServer()).get('/health/http').expect(200);
      expect(testResult.body).toEqual(result);
   });

   it('check dbHealth', async () => {
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

      const testResult = await request(app.getHttpServer()).get('/health/db').expect(200);
      expect(testResult.body).toEqual(result);
   });
});
