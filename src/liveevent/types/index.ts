import { LiveEvent, LiveStage } from '@prisma/client';

export type SeparationEventList = {
   [key in LiveStage]: LiveEvent[] | [];
};
