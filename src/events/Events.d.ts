import { IStoreEvents } from './StoreEvents';
import { IEndpointEvents } from './EndpointEvents';
import { IApiEvents } from './ApiEvents';
import { IServerEvents } from './ServerEvents';

declare interface IEvents {
  Store: IStoreEvents,
  Api: IApiEvents,
  Endpoint: IEndpointEvents,
  Server: IServerEvents,
}

export const Events: Readonly<IEvents>;
