import { ApiProperty } from '@nestjs/swagger';
import { HistoryEntity } from '../../history/entity/history.entity';

export class ObEntity {
   @ApiProperty()
   obId: string;
   @ApiProperty()
   email: string;
   @ApiProperty()
   name: string;
   @ApiProperty()
   age: string;
}

export class ObWithHistoryEntity {
   @ApiProperty()
   obId: string;
   @ApiProperty()
   email: string;
   @ApiProperty()
   name: string;
   @ApiProperty()
   age: string;
   @ApiProperty({ type: [HistoryEntity] })
   History: HistoryEntity;
}
