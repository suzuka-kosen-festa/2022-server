import { ApiProperty } from '@nestjs/swagger';

export class ObEntity {
   @ApiProperty()
   obId: string;
   @ApiProperty()
   email: string;
   @ApiProperty()
   name: string;
   @ApiProperty()
   age: number;
}
