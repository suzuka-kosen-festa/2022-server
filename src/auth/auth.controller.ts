// eslint-disable-next-line no-redeclare
import { Controller, UseGuards, Get, Post, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local.auth.guard';
// eslint-disable-next-line no-redeclare
import { Response } from 'express';

@Controller('auth')
export class AuthController {
   constructor(private service: AuthService) {}

   @UseGuards(LocalAuthGuard)
   @Post('')
   getHello(@Res({ passthrough: true }) response: Response) {
      response.cookie('token', this.service.sign(), {
         signed: false,
         expires: new Date('2022-11-02'),
         httpOnly: false,
         secure: true,
      });
      return this.service.sign();
   }

   @UseGuards(JwtAuthGuard) // jwtテスト用
   @Get('test')
   async getProfile() {
      return 'success';
   }
}
