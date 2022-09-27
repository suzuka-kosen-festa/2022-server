import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaHealthIndicator } from '../prisma/prisma.health';
import { HealthController } from './health.controller';

@Module({
   imports: [TerminusModule],
   providers: [PrismaHealthIndicator],
   controllers: [HealthController],
})
export class HealthModule {}
