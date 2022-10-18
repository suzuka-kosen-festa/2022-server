import { ApiProperty } from '@nestjs/swagger';
import { GuestEntity } from '../../guest/entity/guest.entity';

export class StudentEntity {
   @ApiProperty()
   studentId: string;
   @ApiProperty()
   kana: string;
   @ApiProperty()
   email: string;
}
export class StudentwithGuestEntity extends StudentEntity {
   @ApiProperty({ type: [GuestEntity] })
   guest: GuestEntity;
}
