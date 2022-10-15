import { ApiProperty } from '@nestjs/swagger';
import { HistoryEntity } from '../../history/entity/history.entity';

export class SponsorEntity {
   @ApiProperty()
   sponsorId: string;
   @ApiProperty()
   name: string;
   @ApiProperty()
   email: string;
}

export class SponsorWithHistoryEntity {
   @ApiProperty()
   sponsorId: string;
   @ApiProperty()
   name: string;
   @ApiProperty()
   email: string;
   @ApiProperty()
   History: HistoryEntity
}