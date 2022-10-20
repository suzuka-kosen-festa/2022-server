import { ApiProperty } from '@nestjs/swagger';

export class createObDto {
   @ApiProperty()
   email: string;
   @ApiProperty()
   name: string;
}

export class UpdateObDto {
   @ApiProperty()
   email?: string;
   @ApiProperty()
   name?: string;
}
