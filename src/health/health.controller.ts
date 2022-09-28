import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { PrismaHealthIndicator } from '../prisma/prisma.health';

@Controller('health')
export class HealthController {
   constructor(
      private readonly health: HealthCheckService,
      private readonly prismaHealth: PrismaHealthIndicator,
      private readonly httpHealth: HttpHealthIndicator,
   ) {}

   @Get('db')
   @HealthCheck()
   dbHealthCheck() {
      return this.health.check([() => this.prismaHealth.isHealthy('db')]);
   }

   @Get('http')
   @HealthCheck()
   httpHealthCheck() {
      //TODO:一旦アドレスをstudentにする。後々、ルートにapiを生やすのでそこにhealthcheck用のapiをたてる
      return this.health.check([() => this.httpHealth.pingCheck('httpHealth', 'http://localhost:7000/student')]);
   }
}
