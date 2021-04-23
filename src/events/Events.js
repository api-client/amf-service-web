import { StoreEvents } from './StoreEvents.js';
import { EndpointEvents } from './EndpointEvents.js';
import { OperationEvents } from './OperationEvents.js';
import { ApiEvents } from './ApiEvents.js';
import { ServerEvents } from './ServerEvents.js';
import { DocumentationEvents } from './DocumentationEvents.js';
import { SecurityEvents } from './SecurityEvents.js';
import { TypeEvents } from './TypeEvents.js';
import { ResponseEvents } from './ResponseEvents.js';
import { RequestEvents } from './RequestEvents.js';
import { PayloadEvents } from './PayloadEvents.js';
import { ParameterEvents } from './ParameterEvents.js';

export const Events = {
  Store: StoreEvents,
  Api: ApiEvents,
  Endpoint: EndpointEvents,
  Operation: OperationEvents,
  Server: ServerEvents,
  Documentation: DocumentationEvents,
  Security: SecurityEvents,
  Type: TypeEvents,
  Response: ResponseEvents,
  Request: RequestEvents,
  Payload: PayloadEvents,
  Parameter: ParameterEvents,
};

Object.freeze(Events);
