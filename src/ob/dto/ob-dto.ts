import { ApiProperty } from '@nestjs/swagger';

export class CreateObDto {
   @ApiProperty()
   email: string;
   @ApiProperty()
   name: string;
}
