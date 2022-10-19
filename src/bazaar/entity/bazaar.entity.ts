import { ApiProperty } from '@nestjs/swagger';
import { BazaarType } from '@prisma/client';
import { BazaarPricesEntity } from '../../bazaarprices/entity/bazaarprices.entity';
export class BazaarEntity {
   @ApiProperty()
   id: string;
   @ApiProperty()
   name: string;
   @ApiProperty()
   descriptions: string;
   @ApiProperty()
   image: string;
   @ApiProperty({ type: [BazaarPricesEntity] })
   prices: BazaarPricesEntity;
   @ApiProperty()
   group: string;
   @ApiProperty()
   group_type: BazaarType;
}

export class BazaarWithoutIdEntity {
   @ApiProperty()
   name: string;
   @ApiProperty()
   descriptions: string;
   @ApiProperty()
   image: string;
   @ApiProperty({ type: [BazaarPricesEntity] })
   prices: BazaarPricesEntity;
   @ApiProperty()
   group: string;
   @ApiProperty()
   group_type: BazaarType;
}
