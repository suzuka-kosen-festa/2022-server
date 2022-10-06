import { ApiProperty } from '@nestjs/swagger';
import { GuestEntity } from '../../guest/entity/guest.entity';

//TODO:Parents型の追加
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
   @ApiProperty()
   guest: GuestEntity;
}
