import { ApiProperty } from '@nestjs/swagger';
import { GuestEntity } from '../../guest/entity/guest';

export class StudentEntity {
   @ApiProperty()
   studentId: string;
   @ApiProperty()
   kana: string;
   @ApiProperty()
   email: string;
}
export class StudentwithGuestEntity extends StudentEntity {
   @ApiProperty()
   guest: GuestEntity;
}
