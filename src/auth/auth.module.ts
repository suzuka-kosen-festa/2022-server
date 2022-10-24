import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { JWT_SEACRET_KEY } from './seacret';
import { AuthController } from './auth.controller';

@Module({
   imports: [PassportModule, JwtModule.register({ secret: JWT_SEACRET_KEY, signOptions: { expiresIn: '1d' } })],
   providers: [AuthService, LocalStrategy, JwtStrategy],
   controllers: [AuthController],
})
export class AuthModule {}
