import { ApiStoreContextEvent } from './BaseEvents';
import { ApiEndPoint, ApiEndPointListItem, ApiEndPointWithOperationsListItem, ApiOperationListItem, EndPointInit } from '../types';

export declare const idValue: unique symbol;
export declare const initValue: unique symbol;
export declare const propertyValue: unique symbol;
export declare const valueValue: unique symbol;

/**
 * Dispatched to list all operations inside an endpoint.
 */
export class ApiStoreEndpointListOperationsEvent extends ApiStoreContextEvent<ApiOperationListItem> {
  /**
   * Endpoint's domain id or its path used to initialize this event.
   */
  get pathOrId(): string;
  [idValue]: string;

  /**
   * @param pathOrId The domain id of the endpoint to list operations from or its path.
   */
  constructor(pathOrId: string);
}

/**
 * Dispatched to create an endpoint in the API.
 */
export class ApiStoreEndpointAddEvent extends ApiStoreContextEvent<string> {
  /**
   * Endpoint init definition used to initialize this event.
   */
  get init(): EndPointInit;
  [initValue]: EndPointInit;

  /**
   * @param endpointInit The endpoint init definition
   */
  constructor(endpointInit: EndPointInit);
}

/**
 * Dispatched to delete an endpoint from the API.
 */
export class ApiStoreEndpointDeleteEvent extends ApiStoreContextEvent<void> {
  /**
   * Endpoint id used to initialize this event.
   */
  get id(): string;
  [idValue]: string;

  /**
   * @param endpointId The id of the endpoint to remove.
   */
  constructor(endpointId: string);
}

/**
 * Dispatched to read an endpoint model from the API.
 */
export class ApiStoreEndpointReadEvent extends ApiStoreContextEvent<ApiEndPoint> {
  /**
   * The domain id of the endpoint or its path used to initialize this event.
   */
  get pathOrId(): string;
  [idValue]: string;

  /**
   * @param pathOrId The domain id of the endpoint or its path.
   */
  constructor(pathOrId: string);
}

/**
 * Dispatched to update endpoint's scalar properties (including scalar arrays).
 */
export class ApiStoreEndpointUpdateEvent extends ApiStoreContextEvent<void> {
  /**
   * The domain id of the endpoint used to initialize this event.
   */
  get id(): string;
  [idValue]: string;
  
  /**
   * The property name to update used to initialize this event.
   */
  get property(): string;
  [propertyValue]: string;
  
  /**
   * The new value to set used to initialize this event.
   */
  get value(): any;
  [valueValue]: any;

  /**
   * @param endpointId The domain id of the endpoint.
   * @param property The property name to update
   * @param value The new value to set.
   */
  constructor(endpointId: string, property: string, value: any);
}

declare interface IEndpointEvents {
  /**
   * List all endpoints in the API.
   * @param target The node on which to dispatch the event
   */
  list(target: EventTarget): Promise<ApiEndPointListItem[]>;
  /**
   * Lists all endpoints with operations included into the result.
   * @param target The node on which to dispatch the event
   */
  listWithOperations(target: EventTarget): Promise<ApiEndPointWithOperationsListItem[]>;
  /**
   * Lists all operations in an endpoint.
   * @param target The node on which to dispatch the event
   * @param pathOrId The domain id of the endpoint to list operations from or its path.
   */
  listOperations(target: EventTarget, pathOrId: string): Promise<ApiOperationListItem[]>;
  /**
   * @param target The node on which to dispatch the event
   * @param endpointInit The endpoint init definition
   * @returns The generated id for the endpoint.
   */
  add(target: EventTarget, endpointInit: EndPointInit): Promise<ApiEndPoint>;
  /**
   * @param target The node on which to dispatch the event
   * @param endpointId The id of the endpoint to remove.
   */
  delete(target: EventTarget, endpointId: string): Promise<void>;
  /**
   * Reads the endpoint model from the store.
   * @param target The node on which to dispatch the event
   * @param pathOrId The domain id of the endpoint or its path.
   */
  get(target: EventTarget, pathOrId: string): Promise<ApiEndPoint>;
  /**
   * @param target The node on which to dispatch the event
   * @param endpointId The domain id of the operation.
   * @param property The property name to update
   * @param {any} value The new value to set.
   */
  update(target: EventTarget, endpointId: string, property: string, value: any): Promise<void>;
}

export declare const EndpointEvents: Readonly<IEndpointEvents>;
