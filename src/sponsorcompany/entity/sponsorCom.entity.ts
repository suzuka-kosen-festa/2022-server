import { ApiProperty } from "@nestjs/swagger";

export class SponsorComEntity {
  @ApiProperty()
  id : string
  @ApiProperty()
  name: string
}