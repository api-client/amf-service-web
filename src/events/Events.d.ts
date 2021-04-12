import { IStoreEvents } from './StoreEvents';
import { IEndpointEvents } from './EndpointEvents';
import { IApiEvents } from './ApiEvents';
import { IServerEvents } from './ServerEvents';
import { IDocumentationEvents } from './DocumentationEvents';
import { ISecurityEvents } from './SecurityEvents';
import { ITypeEvents } from './TypeEvents';

declare interface IEvents {
  Store: IStoreEvents,
  Api: IApiEvents,
  Endpoint: IEndpointEvents,
  Server: IServerEvents,
  Documentation: IDocumentationEvents,
  Security: ISecurityEvents,
  Type: ITypeEvents,
}

export const Events: Readonly<IEvents>;
