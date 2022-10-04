import { ApiProperty } from "@nestjs/swagger";

export class SponsorEntiry {
  @ApiProperty()
  sponsorId : string
  @ApiProperty()
  name: string
  @ApiProperty()
  email:string
}