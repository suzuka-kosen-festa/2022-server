import { LiveEvent, LiveStage } from '@prisma/client';

export type SeparationEventList = {
   [key in LiveStage]: LiveEvent[] | [];
};

export type LiveEventWithoutId ={
  title: string;
  descriptions: string;
  date: string;
  venue: string;
  start_time: string;
  end_time: string;
  stage: LiveStage;
}