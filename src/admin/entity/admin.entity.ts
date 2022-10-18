import { ApiProperty } from '@nestjs/swagger';

class ExportGuestEntity {
   @ApiProperty()
   name: string;
   @ApiProperty()
   guestId: string;
}

export class ExportStudentGuestEntity {
   @ApiProperty()
   email: string;
   @ApiProperty({type : [ExportGuestEntity]})
   guest: ExportGuestEntity;
}

export class ExportJhsGuestEntity {
   @ApiProperty()
   email: string;
   @ApiProperty()
   jhsId: string;
   @ApiProperty({type : [ExportGuestEntity]})
   parents: ExportGuestEntity
}

export class ExportObEntity {
   @ApiProperty()
   email: string;
   @ApiProperty()
   obId: string;
}

export class ExportSponsorEntity {
   @ApiProperty()
   email: string;
   @ApiProperty()
   sponsorid: string;
}
