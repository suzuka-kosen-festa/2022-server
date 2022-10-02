import { ApiProperty } from "@nestjs/swagger";

export class Ob {
  @ApiProperty()
  obId :string
  @ApiProperty()
  email : string
  @ApiProperty()
  name : string
  @ApiProperty()
  age : number
}