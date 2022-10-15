import { ApiProperty } from '@nestjs/swagger';

export class HistoryEntity {
   @ApiProperty()
   timestamp: string;
}
