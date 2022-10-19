import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { BazaarpricesService } from './bazaarprices.service';

const pricesArray = [
   { id: 1, prices: '値段100円', bazaarId: 1 },
   { id: 2, prices: '値段200円', bazaarId: 2 },
   { id: 3, prices: '値段140円', bazaarId: 3 },
   { id: 4, prices: '値段150円', bazaarId: 4 },
   { id: 5, prices: '値段110円', bazaarId: 5 },
];

describe('BazaarpricesService', () => {
   let service: BazaarpricesService;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            BazaarpricesService,
            {
               provide: PrismaService,
               useValue: {
                  bazaarPrices: {
                     findMany: jest.fn().mockResolvedValue(pricesArray),
                     findUnique: jest.fn().mockResolvedValue(pricesArray[0]),
                     create: jest.fn().mockResolvedValue(pricesArray[0]),
                     update: jest.fn().mockResolvedValue(pricesArray[0]),
                     delete: jest.fn().mockResolvedValue(pricesArray[0]),
                  },
               },
            },
         ],
      }).compile();

      service = module.get<BazaarpricesService>(BazaarpricesService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });

   it('getAll', async () => {
      const data = await service.getAll();
      expect(data).toEqual(pricesArray);
   });

   it('getById', async () => {
      const data = await service.getById({ id: 1 });
      expect(data).toEqual(pricesArray[0]);
   });

   it('update', async () => {
      const data = await service.update({ where: { id: 1 }, data: { price: '500円' } });
      expect(data).toEqual(pricesArray[0]);
   });

   it('delete', async () => {
      const data = await service.delete({ id: 1 });
      expect(data).toEqual(pricesArray[0]);
   });
});
