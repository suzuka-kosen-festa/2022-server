import { Module } from '@nestjs/common';
import {TerminusModule } from "@nestjs/terminus"
import { PrismaHealthIndicator } from '../prisma/prisma.health';

@Module({
  imports: [TerminusModule],
  providers: [PrismaHealthIndicator]
})
export class HealthModule {}
