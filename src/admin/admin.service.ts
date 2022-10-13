import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Guest, JHStudent, OB, Sponsor, Student } from '@prisma/client';
import { GuestService } from '../guest/guest.service';
import { JhsService } from '../jhs/jhs.service';
import { ObService } from '../ob/ob.service';
import { SponsorService } from '../sponsor/sponsor.service';
import { StudentService } from '../student/student.service';

@Injectable()
export class AdminService {
    constructor(
        private readonly studentService: StudentService,
        private readonly guestServce : GuestService,
        private readonly jhsService : JhsService,
        private readonly obService : ObService,
        private readonly sponsorService : SponsorService
    ){}

    async exportStudentGuestUuid(){
        const studentData = await this.studentService.getAllStudents()
        const guestIdList = studentData.map((data)=>{
            return {
                email : data.email,
                guest : data.Guest.map((guestData) =>(
                    guestData.guestId
                ))
            }
        })

        return guestIdList
    }
    
    
    async parseUuid(reqUuid : string) : Promise<Student | OB | Guest | JHStudent | Sponsor>{
        const [type, ...id]  = reqUuid
        const uuid = id.join()

        switch(type){
            case "G":
                return this.guestServce.checkGuestExist({guestId: uuid})
            case "J":
                return this.jhsService.checkJhsExist({jhsId:uuid})
            case "O":
                return this.obService.checkObExist({obId: uuid})
            case "S":
                return this.sponsorService.checkSponsorExist({sponsorId:uuid})
            default:
                throw new HttpException("uuid id not found", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
