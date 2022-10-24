import { ApiProperty } from '@nestjs/swagger';

export class UpdatePricesDto {
   @ApiProperty()
   price?: string;
}
