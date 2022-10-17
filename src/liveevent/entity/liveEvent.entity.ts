import { ApiProperty } from "@nestjs/swagger";

export class LiveEventEntity {
  @ApiProperty()
  id : number
  @ApiProperty()
  title : string
  @ApiProperty()
  descriptions : string
  @ApiProperty()
  date : string
  @ApiProperty()
  venue : string
  @ApiProperty()
  start_time : string
  @ApiProperty()
  end_time : string
  @ApiProperty()
  stage : "main" | "sub" | "live" | "game"
}

export class LiveEventWithIdEntity {
  @ApiProperty()
  id : number
  @ApiProperty()
  title : string
  @ApiProperty()
  descriptions : string
  @ApiProperty()
  date : string
  @ApiProperty()
  venue : string
  @ApiProperty()
  start_time : string
  @ApiProperty()
  end_time : string
  @ApiProperty()
  stage : "main" | "sub" | "live" | "game"
}