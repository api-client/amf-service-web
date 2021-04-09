import { StoreEvents } from './StoreEvents.js';
import { EndpointEvents } from './EndpointEvents.js';
import { ApiEvents } from './ApiEvents.js';
import { ServerEvents } from './ServerEvents.js';

export const Events = {
  Store: StoreEvents,
  Api: ApiEvents,
  Endpoint: EndpointEvents,
  Server: ServerEvents,
};

Object.freeze(Events);
