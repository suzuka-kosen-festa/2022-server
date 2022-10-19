import { ApiProperty } from "@nestjs/swagger";

export class BazaarPricesEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  price: string;
}