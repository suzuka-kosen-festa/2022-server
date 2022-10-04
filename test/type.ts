import { Prisma } from '@prisma/client';

export type StudentTestRecord = Omit<Prisma.StudentCreateInput, 'Guest'> & {
   Guest?: Prisma.GuestCreateManyInput[];
};

export type JhsTestRecord = Omit<Prisma.JHStudentCreateInput, 'parents'> & {
   parents?: Prisma.GuestCreateManyInput[];
};

