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
   const intervalArray: number[] = [];

   if(array.length != 0 ){
      const eventDate = `${dayjs(array[0].date).year()}-${dayjs(array[0].date).month() +1 }-${dayjs(array[0].date).date()}`
      
      const start = dayjs(`${eventDate} 09:00`)
      const end = dayjs(`${eventDate} 16:00`)

      intervalArray.push(dayjs(array[0].start_time).diff(start, "minute") / 15)

      for (let i = 0; i < array.length; i++) {
         const term = dayjs(array[i].end_time).diff(dayjs(array[i].start_time),"minutes") /15

         intervalArray.push(term)

         const from = dayjs(array[i].end_time);
         const to =  i != array.length-1 ? dayjs(array[i+1].start_time) : end

         const interval = to.diff(from, 'minute') / 15
         intervalArray.push(interval);
      }
   }

   return intervalArray;
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
