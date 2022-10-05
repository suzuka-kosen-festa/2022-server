import { ApiProperty } from '@nestjs/swagger';

export class createSponsorDto {
   @ApiProperty()
   email: string;
   @ApiProperty()
   name: string;
}
