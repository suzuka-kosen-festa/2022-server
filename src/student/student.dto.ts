import { Guest } from '@prisma/client';

export type CreateGuestDto = Pick<Guest, 'sex' | 'RealName' | 'jobs'>;
