// eslint-disable-next-line no-redeclare
import { Controller, UseGuards, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local.auth.guard';

@Controller('auth')
export class AuthController {
   constructor(private service: AuthService) {}

   @UseGuards(LocalAuthGuard)
   @Post()
   login() {
      return this.service.sign();
   }

   @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
   @Get('profile')
   async getProfile() {
      return 'success';
   }
}
