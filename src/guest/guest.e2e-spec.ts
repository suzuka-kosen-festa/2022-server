import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { GuestModule } from './guest.module';
import * as request from 'supertest'

describe("Guest Module(e2e)",()=>{
  let app : INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
       imports: [GuestModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
 });
  afterAll(async () =>{
    app.close()
  })

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
})