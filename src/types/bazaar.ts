import { BazaarPrices, BazaarType } from './prisma';

export type BazaarWithoutId = {
   name: string;
   descriptions: string;
   image: string;
   prices: ReadonlyArray<BazaarPrices>;
   group: string;
   group_type: BazaarType;
};

export type BazaarWithId = {
   id: number;
   name: string;
   descriptions: string;
   image: string;
   prices: ReadonlyArray<BazaarPrices>;
   group: string;
   group_type: BazaarType;
};
