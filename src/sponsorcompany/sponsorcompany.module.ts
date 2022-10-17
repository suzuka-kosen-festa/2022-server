import { Module } from '@nestjs/common';
import { SponsorcompanyController } from './sponsorcompany.controller';
import { SponsorcompanyService } from './sponsorcompany.service';

@Module({
   controllers: [SponsorcompanyController],
   providers: [SponsorcompanyService],
})
export class SponsorcompanyModule {}
