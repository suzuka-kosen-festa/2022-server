import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SEACRET_KEY } from './seacret';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SEACRET_KEY
    });
  }

  async validate(payload: { isAdmin: boolean }) {
    if (payload.isAdmin === true) {
      return true;
    } else {
      return false;
    }
  }
}