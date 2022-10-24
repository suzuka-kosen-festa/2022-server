import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BazaarService } from './bazaar.service';

const bazaarArray = [
   {
      id: 1,
      name: 'バザー1',
      descriptions: '説明1',
      image: 'url1.com',
      group: '部活1',
      group_type: 'eating',
      prices: [{ price: '100円' }],
   },
   {
      id: 2,
      name: 'バザー2',
      descriptions: '説明2',
      image: 'url2.com',
      group: '部活2',
      group_type: 'recreation',
      prices: [],
   },
   {
      id: 3,
      name: 'バザー3',
      descriptions: '説明3',
      image: 'url3.com',
      group: '部活3',
      group_type: 'eating',
      prices: [],
   },
   {
      id: 4,
      name: 'バザー4',
      descriptions: '説明4',
      image: 'url4.com',
      group: '部活4',
      group_type: 'recreation',
      prices: [],
   },
   {
      id: 5,
      name: 'バザー5',
      descriptions: '説明5',
      image: 'url5.com',
      group: '部活5',
      group_type: 'eating',
      prices: [],
   },
];

describe('BazaarService', () => {
   let service: BazaarService;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            BazaarService,
            {
               provide: PrismaService,
               useValue: {
                  bazaar: {
                     findMany: jest.fn().mockResolvedValue(bazaarArray),
                     findUnique: jest.fn().mockResolvedValue(bazaarArray[0]),
                     create: jest.fn().mockResolvedValue(bazaarArray[0]),
                     update: jest.fn().mockResolvedValue(bazaarArray[0]),
                     delete: jest.fn().mockResolvedValue(bazaarArray[0]),
                  },
               },
            },
         ],
      }).compile();

      service = module.get<BazaarService>(BazaarService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });

   it('getAll', async () => {
      const data = await service.getAll();

      expect(data).toEqual(bazaarArray);
   });

   it('getByType', async () => {
      const data = await service.getByType({ group_type: 'eating' });

      expect(data).toEqual(bazaarArray);
   });

   it('getById', async () => {
      const data = await service.getById({ id: 1 });

      expect(data).toEqual(bazaarArray[0]);
   });

   it('create', async () => {
      const bazaarData: Prisma.BazaarCreateInput = {
         name: 'バザー1',
         descriptions: '説明1',
         image: 'url1.com',
         group: '部活1',
         group_type: 'eating',
      };
      const data = await service.create(bazaarData);
      expect(data).toEqual(bazaarArray[0]);
   });

   it('update', async () => {
      const bazaarData: Prisma.BazaarUpdateInput = {
         name: 'バザー1',
         descriptions: '説明1',
         image: 'url1.com',
         group: '部活1',
         group_type: 'eating',
      };
      const data = await service.update({ where: { id: 1 }, data: bazaarData });

      expect(data).toEqual(bazaarArray[0]);
   });

   it('delete', async () => {
      const data = await service.delete({ id: 1 });
      expect(data).toEqual(bazaarArray[0]);
   });
});
