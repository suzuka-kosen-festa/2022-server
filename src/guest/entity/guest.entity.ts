import { ApiProperty } from '@nestjs/swagger';
import { HistoryEntity } from '../../history/entity/history.entity';

export class GuestEntity {
   @ApiProperty()
   guestId: string;
   @ApiProperty()
   sex: string;
   @ApiProperty()
   jobs: string;
   @ApiProperty()
   name: string;
   @ApiProperty()
   hostId: string;
}

export class GuestWithHistoryEntity {
   @ApiProperty()
   guestId: string;
   @ApiProperty()
   sex: string;
   @ApiProperty()
   jobs: string;
   @ApiProperty()
   name: string;
   @ApiProperty()
   hostId: string;
   @ApiProperty()
   History: ReadonlyArray<HistoryEntity>;
}
