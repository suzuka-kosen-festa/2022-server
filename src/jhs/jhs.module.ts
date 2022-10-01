import { Module } from '@nestjs/common';
import { JhsController } from './jhs.controller';
import { JhsService } from './jhs.service';

@Module({
  providers: [JhsService],
  controllers: [JhsController],
  exports: [JhsController, JhsService]
})
export class JhsModule {}
