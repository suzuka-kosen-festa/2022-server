import { ApiProperty } from "@nestjs/swagger";

export class SponsorEntity {
  @ApiProperty()
  sponsorId : string
  @ApiProperty()
  name: string
  @ApiProperty()
  email:string
}