import { ApiProperty } from "@nestjs/swagger";

export class CreateSponsorComDto {
  @ApiProperty()
  name : string
}

export class UpdateSponsorComDto {
  @ApiProperty()
  name : string
}