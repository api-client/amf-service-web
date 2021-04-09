import { IStoreEvents } from './StoreEvents';

declare interface IEvents {
  Store: IStoreEvents,
}

export const Events: Readonly<IEvents>;
