import { Module } from '@nestjs/common';
import { LiveeventController } from './liveevent.controller';
import { LiveeventService } from './liveevent.service';

@Module({
  controllers: [LiveeventController],
  providers: [LiveeventService]
})
export class LiveeventModule {}
