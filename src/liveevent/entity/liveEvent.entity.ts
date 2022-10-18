import { ApiProperty } from '@nestjs/swagger';

export class LiveEventEntity {
   @ApiProperty()
   id: number;
   @ApiProperty()
   title: string;
   @ApiProperty()
   descriptions: string;
   @ApiProperty()
   date: string;
   @ApiProperty()
   venue: string;
   @ApiProperty()
   start_time: string;
   @ApiProperty()
   end_time: string;
   @ApiProperty()
   stage: 'main' | 'sub' | 'live' | 'game';
}

class MainStageEntity extends LiveEventEntity {
   stage: 'main';
}
class LiveStageEntity extends LiveEventEntity {
   stage: 'live';
}
class SubStageEntity extends LiveEventEntity {
   stage: 'sub';
}
class GameStageEntity extends LiveEventEntity {
   stage: 'game';
}
export class SeparationEventListEntity {
   @ApiProperty()
   main: ReadonlyArray<MainStageEntity> | [];
   @ApiProperty()
   sub: ReadonlyArray<SubStageEntity> | [];
   @ApiProperty()
   live: ReadonlyArray<LiveStageEntity> | [];
   @ApiProperty()
   game: ReadonlyArray<GameStageEntity> | [];
}

export class LiveEventWithIdEntity {
   @ApiProperty()
   id: number;
   @ApiProperty()
   title: string;
   @ApiProperty()
   descriptions: string;
   @ApiProperty()
   date: string;
   @ApiProperty()
   venue: string;
   @ApiProperty()
   start_time: string;
   @ApiProperty()
   end_time: string;
   @ApiProperty()
   stage: 'main' | 'sub' | 'live' | 'game';
}
