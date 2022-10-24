import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
   constructor(private readonly jwtService: JwtService) {}

   sign() {
      return {
         access_token: this.jwtService.sign({ isAdmin: true }),
      };
   }
}
