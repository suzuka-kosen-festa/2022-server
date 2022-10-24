import { ApiProperty } from '@nestjs/swagger';
import { GuestEntity } from '../../guest/entity/guest.entity';
import { HistoryEntity } from '../../history/entity/history.entity';

export class JhsEntity {
   @ApiProperty()
   jhsId: string;
   @ApiProperty()
   name: string;
   @ApiProperty()
   age: string;
   @ApiProperty()
   email: string;
}
export class JhswithParentEntity extends JhsEntity {
   @ApiProperty({ type: [GuestEntity] })
   parents: GuestEntity;
}

export class JhsWithHistoryEntity {
   @ApiProperty()
   jhsId: string;
   @ApiProperty()
   name: string;
   @ApiProperty()
   age: string;
   @ApiProperty()
   email: string;
   @ApiProperty({ type: [HistoryEntity] })
   History: HistoryEntity;
}
