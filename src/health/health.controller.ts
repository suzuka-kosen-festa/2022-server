import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { PrismaHealthIndicator } from '../prisma/prisma.health';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaHealth : PrismaHealthIndicator
  ){}

  @Get()
  @HealthCheck()
  healthCheck(){
    return this.health.check([
      () => this.prismaHealth.isHealthy('db')
    ])
  }
}
