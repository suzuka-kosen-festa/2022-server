import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Guest, JHStudent, OB, Sponsor, Student } from '@prisma/client';
import { GuestService } from '../guest/guest.service';
import { JhsService } from '../jhs/jhs.service';
import { ObService } from '../ob/ob.service';
import { SponsorService } from '../sponsor/sponsor.service';
import { StudentService } from '../student/student.service';
import { ExportJhsGuest, ExportOb, ExportSponsor, ExportStudentGuest } from '../types/admin';

@Injectable()
export class AdminService {
   constructor(
      private readonly studentService: StudentService,
      private readonly guestServce: GuestService,
      private readonly jhsService: JhsService,
      private readonly obService: ObService,
      private readonly sponsorService: SponsorService,
   ) {}

   async exportStudentGuestUuid(): Promise<ExportStudentGuest[]> {
      const studentData = await this.studentService.getAllStudents();
      return studentData.map((data) => {
         return {
            email: data.email,
            guest: data.Guest.map((guestData) => ({
               name: guestData.name,
               guestId: 'G' + guestData.guestId,
            })),
         };
      });
   }

   async exportJhsGuestUuid(): Promise<ExportJhsGuest[]> {
      const jhsData = await this.jhsService.getAllJhs();
      return jhsData.map((data) => {
         return {
            email: data.email,
            jhsId: 'J' + data.jhsId,
            name: data.name,
            parents: data.parents.map((guestData) => ({
               name: guestData.name,
               guestId: 'G' + guestData.guestId,
            })),
         };
      });
   }

   async exportObUuid(): Promise<ExportOb[]> {
      const obList = await this.obService.getAllOb();
      return obList.map((data) => {
         return {
            email: data.email,
            name: data.name,
            obId: 'O' + data.obId,
         };
      });
   }

   async exportSponsorUuid(): Promise<ExportSponsor[]> {
      const sponsorList = await this.sponsorService.getAllSponsor();
      return sponsorList.map((data) => {
         return {
            email: data.email,
            name: data.name,
            sponsorId: 'S' + data.sponsorId,
         };
      });
   }

   async parseUuid(reqUuid: string): Promise<Student | OB | Guest | JHStudent | Sponsor | null> {
      const [type, ...id] = reqUuid;
      const uuid = reqUuid.slice(1);

      switch (type) {
         case 'G':
            return this.guestServce.checkGuestExist({ guestId: uuid });
         case 'J':
            return this.jhsService.checkJhsExist({ jhsId: uuid });
         case 'O':
            return this.obService.checkObExist({ obId: uuid });
         case 'S':
            return this.sponsorService.checkSponsorExist({ sponsorId: uuid });
         default:
            throw new HttpException('uuid id not found', HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
}
