import { ApiProperty } from "@nestjs/swagger";

export class GuestEntity {
  @ApiProperty()
  guestId: string;
  @ApiProperty()
  sex: string;
  @ApiProperty()
  jobs: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  hostId: string;
}