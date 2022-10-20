import { ApiProperty } from '@nestjs/swagger';

export class createSponsorDto {
   @ApiProperty()
   email: string;
   @ApiProperty()
   name: string;
}

export class UpdateSponsorDto {
   @ApiProperty()
   email? : string
   @ApiProperty()
   name?: string;
}
