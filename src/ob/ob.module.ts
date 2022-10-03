import { Module } from '@nestjs/common';
import { ObController } from './ob.controller';
import { ObService } from './ob.service';

@Module({
   controllers: [ObController],
   providers: [ObService],
})
export class ObModule {}
