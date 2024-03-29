import { ApiProperty } from '@nestjs/swagger';

export class createJhsStudentDto {
   @ApiProperty()
   email: string;
   @ApiProperty()
   name: string;
   @ApiProperty()
   age: string;
}

export class updateJhsStudentDto {
   @ApiProperty()
   name?: string;
   @ApiProperty()
   age?: string;
}
