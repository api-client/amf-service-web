import { StoreEvents } from './StoreEvents.js';
import { EndpointEvents } from './EndpointEvents.js';
import { ApiEvents } from './ApiEvents.js';
import { ServerEvents } from './ServerEvents.js';
import { DocumentationEvents } from './DocumentationEvents.js';
import { SecurityEvents } from './SecurityEvents.js';
import { TypeEvents } from './TypeEvents.js';

export const Events = {
  Store: StoreEvents,
  Api: ApiEvents,
  Endpoint: EndpointEvents,
  Server: ServerEvents,
  Documentation: DocumentationEvents,
  Security: SecurityEvents,
  Type: TypeEvents,
};

Object.freeze(Events);
