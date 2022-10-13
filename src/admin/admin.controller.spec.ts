import { Test, TestingModule } from '@nestjs/testing';
import { GuestService } from '../guest/guest.service';
import { JhsService } from '../jhs/jhs.service';
import { ObService } from '../ob/ob.service';
import { PrismaService } from '../prisma/prisma.service';
import { SponsorService } from '../sponsor/sponsor.service';
import { StudentService } from '../student/student.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

const studentGuestIdData = [{ email: 'test1@example.com', Guest: [{ name: 'てすと', guestId: 'uuid1' }] }];
const jhsGuestIdData = [{ email: 'test@example.com', jhsId: 'uuid1', parants: [{ name: 'てすと', guestId: 'uuid2' }] }];
const obIdData = [{ email: 'test1@example.com', obId: 'uuid1' }];
const sponsorIdData = [{ email: 'test1@example.com', sponsorId: 'uuid1' }];

describe('AdminController', () => {
   let controller: AdminController;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [AdminController],
         providers: [
            {
               provide: AdminService,
               useValue: {
                  exportStudentGuestUuid: jest.fn().mockResolvedValue(studentGuestIdData),
                  exportJhsGuestUuid: jest.fn().mockResolvedValue(jhsGuestIdData),
                  exportObUuid: jest.fn().mockResolvedValue(obIdData),
                  exportSponsorUuid: jest.fn().mockResolvedValue(sponsorIdData) 
               }
            },
            StudentService, 
            GuestService, 
            JhsService, 
            ObService, 
            SponsorService, 
            PrismaService
         ]
      }).compile();

      controller = module.get<AdminController>(AdminController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });

   it('exportStudentGuest controller', async () => {
      const data = await controller.exportStudentGuestId()
      expect(data).toEqual(studentGuestIdData)
   })

   it("exportJhsGuest controller",async () => {
      const data = await controller.exportJhsGuestId()
      expect(data).toEqual(jhsGuestIdData)
   })

   it("exportOb controller", async () => {
      const data = await controller.exportObId()
      expect(data).toEqual(obIdData)
   })

   it("exportSponsorId controller",async () => {
      const data = await controller.exportSponsorId()
      expect(data).toEqual(sponsorIdData)
   })
});
