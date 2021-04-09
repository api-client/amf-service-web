import { EventsTargetMixin } from  '@advanced-rest-client/events-target-mixin';
import { ApiStoreLoadGraphEvent } from '../events/StoreEvents';
import { ApiStoreEndpointListOperationsEvent, ApiStoreEndpointAddEvent, ApiStoreEndpointDeleteEvent, ApiStoreEndpointReadEvent, ApiStoreEndpointUpdateEvent } from '../events/EndpointEvents';
import { ApiStoreContextEvent } from '../events/BaseEvents';
import { ApiEndPointListItem, ApiEndPointWithOperationsListItem } from '../types';

export declare const initHandler: unique symbol;
export declare const loadGraphHandler: unique symbol;
export declare const endpointListHandler: unique symbol;
export declare const endpointListWithOperationsHandler: unique symbol;
export declare const endpointListOperationsHandler: unique symbol;
export declare const endpointAddHandler: unique symbol;
export declare const endpointDeleteHandler: unique symbol;
export declare const endpointGetHandler: unique symbol;
export declare const endpointUpdateHandler: unique symbol;

export declare function AmfStoreDomEventsMixin<T extends new (...args: any[]) => {}>(base: T): T & AmfStoreDomEventsMixinConstructor;

export declare interface AmfStoreDomEventsMixinConstructor {
  new(...args: any[]): AmfStoreDomEventsMixin;
  constructor(...args: any[]): AmfStoreDomEventsMixin;
}

/**
 * This mixin adds events listeners for DOM events related to the AMF store.
 * It does not provide implementations for the functions called by each handler.
 * This to be mixed in with an instance of the `AmfStoreService`.
 * 
 * The implementation by default listens on the `window` object.
 * Set `eventsTarget` property to listen to the events on a specific node.
 */
export declare interface AmfStoreDomEventsMixin extends EventsTargetMixin {
  [initHandler](e: CustomEvent): void;
  [loadGraphHandler](e: ApiStoreLoadGraphEvent): void;
  [endpointListHandler](e: ApiStoreContextEvent<ApiEndPointListItem[]>): void;
  [endpointListWithOperationsHandler](e: ApiStoreContextEvent<ApiEndPointWithOperationsListItem[]>): void;
  [endpointListOperationsHandler](e: ApiStoreEndpointListOperationsEvent): void;
  [endpointAddHandler](e: ApiStoreEndpointAddEvent): void;
  [endpointDeleteHandler](e: ApiStoreEndpointDeleteEvent): void;
  [endpointGetHandler](e: ApiStoreEndpointReadEvent): void;
  [endpointUpdateHandler](e: ApiStoreEndpointUpdateEvent): void;
}
