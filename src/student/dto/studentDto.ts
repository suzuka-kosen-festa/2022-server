import { ApiProperty } from '@nestjs/swagger';

export class createStudentDto {
   @ApiProperty()
   email: string;
   @ApiProperty()
   kana: string;
}

export class updateStudentDto {
   @ApiProperty()
   email: string;
   @ApiProperty()
   sex: string;
   @ApiProperty()
   jobs: string;
   @ApiProperty()
   name: string;
}
