import { Strategy as BaseLocalStrategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PASSWORD } from "./seacret";

@Injectable()
export class LocalStrategy extends PassportStrategy(BaseLocalStrategy) {
  constructor(){
    super();
  }

  validate(username: string, password: string): boolean{
    if( username === 'admin' && password == PASSWORD ){
      return true
    }
    else{
      throw new UnauthorizedException();
    }
  }
}

