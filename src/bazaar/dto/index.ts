import { ApiProperty } from '@nestjs/swagger';
import { BazaarType } from '@prisma/client';

export class CreateBazaarDto {
   @ApiProperty()
   name: string;
   @ApiProperty()
   descriptions: string;
   @ApiProperty()
   image: string;
   @ApiProperty()
   group: string;
   @ApiProperty()
   group_type: BazaarType;
}

export class UpdateBazaarDto {
   @ApiProperty()
   name: string;
   @ApiProperty()
   descriptions: string;
   @ApiProperty()
   image: string;
   @ApiProperty()
   group: string;
   @ApiProperty()
   group_type: BazaarType;
}
