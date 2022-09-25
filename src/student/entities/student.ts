import { Guest } from "@prisma/client";

export class StudentEntity {
  studentId:string

  kana: string;

  email:string;
}

export class StudentwithGuestEntity extends StudentEntity{
  guest: Guest
}