// eslint-disable-next-line no-redeclare
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Guest, Prisma } from '@prisma/client';
import { GuestEntity, GuestWithHistoryEntity } from './entity/guest.entity';
import { GuestService } from './guest.service';

@ApiTags('guest')
@Controller('guest')
export class GuestController {
   constructor(private readonly service: GuestService) {}

   @Get()
   @ApiOperation({ summary: '招待客のデータを全件返す' })
   @ApiOkResponse({ type: GuestEntity })
   async getAllGeusts(): Promise<Guest[]> {
      return this.service.getAllGuests();
   }

   @Get('/history')
   @ApiOperation({ summary: 'Guestの入場履歴を返す' })
   @ApiOkResponse({ type: GuestWithHistoryEntity, isArray: true })
   async getAllSponsorHistory(): Promise<Guest[]> {
      return this.service.getAllHistory();
   }

   @Put(":uuid")
   @ApiOperation({ summary : "Guestのデータ更新" })
   @ApiOkResponse({ type: GuestEntity })
   async updateGuest(@Param("uuid") uuid : string, @Body() data : Prisma.GuestUpdateInput) : Promise<Guest>{
      return this.service.update({where:{ guestId : uuid} , data})
   }

   @Get('check/:uuid')
   @ApiOperation({ summary: 'uuidの照合' })
   @ApiOkResponse({ type: GuestWithHistoryEntity, description: '存在しない場合はnullを返す' })
   async checkuuid(@Param('uuid') id: string): Promise<Guest | null> {
      return this.service.checkGuestExist({ guestId: id });
   }

   @Delete(':uuid')
   @ApiOperation({ summary: '招待客ののデータの削除' })
   @ApiResponse({ type: GuestEntity })
   async delete(@Param('uuid') uuid: string): Promise<Guest> {
      return this.service.deleteGuest({
         guestId: uuid,
      });
   }
}
