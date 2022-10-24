import { LiveEvent } from '@prisma/client';
import * as dayjs from 'dayjs';
import { EventInterval, LiveEventWithoutId, SeparationEventList } from '../../types/liveevent';

const filterAndSort = (array: LiveEvent[], filter: string) => {
   return array
      .filter((data) => data.stage === filter)
      .sort((a, b) => {
         return a.start_time > b.start_time ? 1 : -1;
      });
};

export const dateSort = (array: LiveEventWithoutId[], date: string) => {
   const filterData = array.filter((data) => {
      const dataDate = data.date.split(' ');
      return dataDate[0] === date;
   }) as LiveEvent[];

   return filterData;
};

const substractArrayDate = (array: LiveEvent[]): number[] => {
   let diffArray: number[] = [];
   for (let i = 1; i < array.length; i++) {
      const from = dayjs(array[i - 1].end_time);
      const to = dayjs(array[i].start_time);

      diffArray.push(to.diff(from, 'minute') / 15);
   }

   return diffArray;
};

export const filterAndGetInterval = (array: LiveEvent[]) => {
   const gameStage = filterAndSort(array, 'game');
   const mainStage = filterAndSort(array, 'main');
   const subStage = filterAndSort(array, 'sub');
   const liveStage = filterAndSort(array, 'live');

   const object: EventInterval = {
      main: substractArrayDate(mainStage),
      sub: substractArrayDate(subStage),
      live: substractArrayDate(liveStage),
      game: substractArrayDate(gameStage),
   };

   return object;
};

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
