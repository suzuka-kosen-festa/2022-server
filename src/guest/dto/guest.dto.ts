import { ApiProperty } from "@nestjs/swagger";

export class UpdateGuestDto {
  @ApiProperty()
  sex: string;
  @ApiProperty()
  jobs: string;
  @ApiProperty()
  name: string;
}