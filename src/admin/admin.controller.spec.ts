import { Test, TestingModule } from '@nestjs/testing';
import { GuestService } from '../guest/guest.service';
import { JhsService } from '../jhs/jhs.service';
import { ObService } from '../ob/ob.service';
import { PrismaService } from '../prisma/prisma.service';
import { SponsorService } from '../sponsor/sponsor.service';
import { StudentService } from '../student/student.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

describe('AdminController', () => {
   let controller: AdminController;

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [AdminService, StudentService, GuestService, JhsService, ObService, SponsorService, PrismaService],
         controllers: [AdminController],
      }).compile();

      controller = module.get<AdminController>(AdminController);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });
});
