import { ApiProperty } from "@nestjs/swagger";

export class StudentEntity {
  @ApiProperty()
  studentId:string
  @ApiProperty()
  kana: string;
  @ApiProperty()
  email:string;
}

class GuestEntirty {
  @ApiProperty()
  guestId : string;
  @ApiProperty()
  sex: string;
  @ApiProperty()
  jobs: string;
  @ApiProperty()
  RealName: string;
  @ApiProperty()
  hostId : string
}
export class StudentwithGuestEntity extends StudentEntity{
  @ApiProperty()
  guest: GuestEntirty
}