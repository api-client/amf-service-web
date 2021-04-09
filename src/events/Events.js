import { StoreEvents } from './StoreEvents.js';
import { EndpointEvents } from './EndpointEvents.js';

export const Events = {
  Store: StoreEvents,
  Endpoint: EndpointEvents,
};

Object.freeze(Events);
