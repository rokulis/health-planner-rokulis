import { StoreRoomRequestCategoryEnum } from '@/types/swagger/data-contracts';

export const BedTimeLimit: Record<StoreRoomRequestCategoryEnum, string> = {
  [StoreRoomRequestCategoryEnum.ShortTerm]:
    'Up to 2 hour long procedures are allowed',
  [StoreRoomRequestCategoryEnum.MidTerm]:
    'From 2 to 6 hour long procedures are allowed',
  [StoreRoomRequestCategoryEnum.LongTerm]:
    'From 6 to 12 hour long procedures are allowed',
} as const;
