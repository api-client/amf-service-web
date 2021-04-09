import { IStoreEvents } from './StoreEvents';
import { IEndpointEvents } from './EndpointEvents';

declare interface IEvents {
  Store: IStoreEvents,
  Endpoint: IEndpointEvents,
}

export const Events: Readonly<IEvents>;
