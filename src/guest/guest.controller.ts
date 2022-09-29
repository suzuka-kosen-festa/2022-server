import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Guest } from '@prisma/client';
import { GuestEntity } from './entity/guest';
import { GuestService } from './guest.service';

@Controller('guest')
export class GuestController {
  constructor( private readonly guestService : GuestService){}

  @Get()
  @ApiOperation({summary:"招待客のデータを全件返す"})
  @ApiOkResponse({type: GuestEntity})
  async getAllGeusts(): Promise<Guest[]>{
    return this.guestService.getAllGuests()
  }

  @Get("check/:uuid")
  @ApiOperation({summary:"uuidの照合"})
  @ApiOkResponse({type: GuestEntity})
  async checkuuid(@Param("uuid") id : string) : Promise<Guest>{
    return this.guestService.checkGuestExist({guestId: id})
  }
}
