import { Module } from '@nestjs/common';
import { BazaarpricesService } from './bazaarprices.service';
import { BazaarpricesController } from './bazaarprices.controller';

@Module({
   providers: [BazaarpricesService],
   controllers: [BazaarpricesController],
})
export class BazaarpricesModule {}
