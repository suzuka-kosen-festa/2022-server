import { Module } from '@nestjs/common';
import { JhsService } from './jhs.service';

@Module({
  providers: [JhsService]
})
export class JhsModule {}
