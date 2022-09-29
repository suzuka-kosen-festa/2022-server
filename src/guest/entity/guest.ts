import { ApiProperty } from "@nestjs/swagger";

export class GuestEntirty {
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