import { Module } from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { SponsorController } from './sponsor.controller';

@Module({
   providers: [SponsorService],
   controllers: [SponsorController],
   exports: [SponsorService],
})
export class SponsorModule {}
