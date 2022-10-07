import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Guest } from '@prisma/client';
import { GuestEntity } from './entity/guest.entity';
import { GuestService } from './guest.service';

@ApiTags('guest')
@Controller('guest')
export class GuestController {
   constructor(private readonly guestService: GuestService) {}

   @Get()
   @ApiOperation({ summary: '招待客のデータを全件返す' })
   @ApiOkResponse({ type: GuestEntity })
   async getAllGeusts(): Promise<Guest[]> {
      return this.guestService.getAllGuests();
   }

   @Get('check/:uuid')
   @ApiOperation({ summary: 'uuidの照合' })
   @ApiOkResponse({ type: GuestEntity, description: '存在しない場合はnullを返す' })
   async checkuuid(@Param('uuid') id: string): Promise<Guest | null> {
      return this.guestService.checkGuestExist({ guestId: id });
   }

   @Delete(':uuid')
   @ApiOperation({ summary: '招待客ののデータの削除' })
   @ApiResponse({ type: GuestEntity })
   async delete(@Param('uuid') uuid: string): Promise<Guest> {
      return this.guestService.deleteGuest({
         guestId: uuid,
      });
   }
}
