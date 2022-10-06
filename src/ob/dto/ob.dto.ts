import { ApiProperty } from '@nestjs/swagger';

export class createObDto {
   @ApiProperty()
   email: string;
   @ApiProperty()
   name: string;
}
