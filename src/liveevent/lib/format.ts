import { LiveEvent } from '@prisma/client';
import { SeparationEventList } from '../types';

const filterAndSort = (array: LiveEvent[], filter: string) =>
   array
      .filter((data) => data.stage === filter)
      .sort((a, b) => {
         return a.start_time > b.start_time ? 1 : -1;
      });

export const formatEvent = (array: LiveEvent[]): SeparationEventList => {
   const gameStage = filterAndSort(array, 'game');
   const mainStage = filterAndSort(array, 'main');
   const subStage = filterAndSort(array, 'sub');
   const liveStage = filterAndSort(array, 'live');

   const object: SeparationEventList = {
      main: mainStage,
      sub: subStage,
      live: liveStage,
      game: gameStage,
   };

   return object;
};
