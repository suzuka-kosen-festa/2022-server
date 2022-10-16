import { ApiProperty } from '@nestjs/swagger';

export class HistoryEntity {
   @ApiProperty()
   timeStamp: string;
}

export class AllHistoryEntity {
   @ApiProperty()
   timeStamp: string;
   @ApiProperty()
   guestId: string;
   @ApiProperty()
   sponsorId: string;
   @ApiProperty()
   jhsId: string;
   @ApiProperty()
   obId: string;
}
