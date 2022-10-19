import { BazaarPrices, BazaarType } from '@prisma/client';

export type BazaarWithoutId = {
   name: string;
   descriptions: string;
   image: string;
   prices: ReadonlyArray<BazaarPrices>;
   group: string;
   group_type: BazaarType;
};
