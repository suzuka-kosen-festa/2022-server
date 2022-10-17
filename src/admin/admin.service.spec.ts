import { Test, TestingModule } from '@nestjs/testing';
import { GuestService } from '../guest/guest.service';
import { JhsService } from '../jhs/jhs.service';
import { ObService } from '../ob/ob.service';
import { PrismaService } from '../prisma/prisma.service';
import { SponsorService } from '../sponsor/sponsor.service';
import { StudentService } from '../student/student.service';
import { AdminService } from './admin.service';

const studentGuestIdData = [{ email: 'test1@example.com', Guest: [{ name: 'てすと', guestId: 'uuid1' }] }];
const jhsGuestIdData = [{ email: 'test@example.com', jhsId: 'uuid1', parants: [{ name: 'てすと', guestId: 'uuid2' }] }];
const obIdData = [{ email: 'test1@example.com', obId: 'uuid1' }];
const sponsorIdData = [{ email: 'test1@example.com', sponsorId: 'uuid1' }];

const guestData = { guestId: 'uuid1', sex: '男', jobs: '祖父', name: 'テストゲスト1', hostId: 'hostId1' };
const studentData = { studentId: 'uuid1', kana: 'テスト1', email: 'example1.com', Guest: [] };
const jhsData = { jhsId: 'uuid1', name: 'てすと１', age: 13, email: 'test1@example.com', Pearents: [] };
const obData = { obId: 'uuid1', name: 'てすと1', email: 'test1@example.com' };
const sponsorData = { sponsorId: 'uuid1', name: 'てすと1', email: 'test1@example.com' };

describe('AdminService', () => {
   let service: AdminService;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            {
               provide: AdminService,
               useValue: {
                  exportStudentGuestUuid: jest.fn().mockResolvedValue(studentGuestIdData),
                  exportJhsGuestUuid: jest.fn().mockResolvedValue(jhsGuestIdData),
                  exportObUuid: jest.fn().mockResolvedValue(obIdData),
                  exportSponsorUuid: jest.fn().mockResolvedValue(sponsorIdData),
                  parseUuid: jest.fn().mockResolvedValue(guestData),
               },
            },
            StudentService,
            JhsService,
            ObService,
            SponsorService,
            GuestService,
            PrismaService,
         ],
      }).compile();

      service = module.get<AdminService>(AdminService);
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });

   it('exportStudentGuestUuid', async () => {
      const data = await service.exportStudentGuestUuid();

      expect(data).toEqual(studentGuestIdData);
   });

   it('exportJhsGuestUuid', async () => {
      const data = await service.exportJhsGuestUuid();

      expect(data).toEqual(jhsGuestIdData);
   });

   it('exportObUuid', async () => {
      const data = await service.exportObUuid();

      expect(data).toEqual(obIdData);
   });

   it('exportSponsorId', async () => {
      const data = await service.exportSponsorUuid();

      expect(data).toEqual(sponsorIdData);
   });

   it('parseUuid', async () => {
      const data = await service.parseUuid('Guuid1');
      expect(data).toEqual(guestData);
   });
});
