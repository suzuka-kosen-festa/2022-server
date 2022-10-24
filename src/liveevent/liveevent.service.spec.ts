import { Test, TestingModule } from '@nestjs/testing';
import { LiveEvent, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { dateSort, filterAndGetInterval } from './lib/format';
import { LiveeventService } from './liveevent.service';

const eventArray: LiveEvent[] = [
   {
      id: 1,
      title: 'てすとイベント1',
      descriptions: '説明1',
      date: '2022-10-30 12:10',
      venue: '会場1',
      start_time: '2022-10-30 12:10',
      end_time: '2022-10-30 13:10',
      stage: 'main',
   },
   {
      id: 2,
      title: 'てすとイベント2',
      descriptions: '説明2',
      date: '2022-10-28 11:10',
      venue: '会場2',
      start_time: '2022-10-28 11:10',
      end_time: '2022-10-28 12:10',
      stage: 'game',
   },
   {
      id: 3,
      title: 'てすとイベント3',
      descriptions: '説明3',
      date: '2022-10-29 12:10',
      venue: '会場3',
      start_time: '2022-10-29 12:10',
      end_time: '2022-10-29 13:10',
      stage: 'sub',
   },
   {
      id: 4,
      title: 'てすとイベント4',
      descriptions: '説明4',
      date: '2022-10-31 11:10',
      venue: '会場4',
      start_time: '2022-10-31 11:10',
      end_time: '2022-10-31 14:10',
      stage: 'game',
   },
   {
      id: 5,
      title: 'てすとイベント5',
      descriptions: '説明5',
      date: '2022-10-31 14:10',
      venue: '会場5',
      start_time: '2022-10-31 14:10',
      end_time: '2022-10-31 15:10',
      stage: 'main',
   },
];

const intervalArray = {
   main: [12, 2, 1, 1, 1, 1, 10],
   sub: [],
   live: [],
   game: [],
};

describe('LiveeventService', () => {
   let service: LiveeventService;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            {
               provide: LiveeventService,
               useValue: {
                  getAll: jest.fn().mockResolvedValue(eventArray),
                  getByDate: jest.fn().mockResolvedValue(eventArray[0]),
                  getById: jest.fn().mockResolvedValue(eventArray[0]),
                  create: jest.fn().mockResolvedValue(eventArray[0]),
                  update: jest.fn().mockResolvedValue(eventArray[0]),
                  delete: jest.fn().mockResolvedValue(eventArray[0]),
                  getEventInterval: jest.fn().mockResolvedValue(intervalArray),
               },
            },
            PrismaService,
         ],
      }).compile();

      service = module.get<LiveeventService>(LiveeventService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });

   it('getAll', async () => {
      const data = await service.getAll();
      expect(data).toEqual(eventArray);
   });

   it('getByDate', async () => {
      const data = await service.getByDate({ date: '2022-10-30' });
      expect(data).toEqual(eventArray[0]);
   });

   it('getById', async () => {
      const data = await service.getById({ id: 1 });
      expect(data).toEqual(eventArray[0]);
   });

   it('create', async () => {
      const eventData: Prisma.LiveEventCreateInput = {
         title: 'てすとイベント1',
         descriptions: '説明1',
         date: '2022-10-30 12:10',
         venue: '会場1',
         start_time: '2022-10-30 12:10',
         end_time: '2022-10-30 13:10',
         stage: 'main',
      };
      const data = await service.create(eventData);
   });

   it('update', async () => {
      const eventData: Prisma.LiveEventUpdateInput = {
         title: 'てすとイベント1',
         descriptions: '説明1',
         date: '2022-10-30 12:10',
         venue: '会場1',
         start_time: '2022-10-30 12:10',
         end_time: '2022-10-30 13:10',
         stage: 'main',
      };
      const data = await service.update({ where: { id: 1 }, data: eventData });

      expect(data).toEqual(eventArray[0]);
   });

   it('getEventInterval', async () => {
      const eventData: LiveEvent[] = [
         {
            id: 1,
            title: 'てすとイベント1',
            descriptions: '説明1',
            date: '2022-10-31 12:00',
            venue: '会場1',
            start_time: '2022-10-31 12:00',
            end_time: '2022-10-31 12:30',
            stage: 'main',
         },
         {
            id: 2,
            title: 'てすとイベント1',
            descriptions: '説明1',
            date: '2022-10-31 13:15',
            venue: '会場1',
            start_time: '2022-10-31 13:15',
            end_time: '2022-10-31 13:30',
            stage: 'main',
         },
         {
            id: 3,
            title: 'てすとイベント1',
            descriptions: '説明1',
            date: '2022-10-31 12:45',
            venue: '会場1',
            start_time: '2022-10-31 12:45',
            end_time: '2022-10-31 13:00',
            stage: 'main',
         },
      ];

      const sortData = dateSort(eventData, '2022-10-31');
      const intervalData = filterAndGetInterval(sortData);

      const data = await service.getEventInterval({ date: '2022-10-31' });

      expect(data).toEqual(intervalData);
   });

   it('delete', async () => {
      const data = await service.delete({ id: 1 });
      expect(data).toEqual(eventArray[0]);
   });
});
