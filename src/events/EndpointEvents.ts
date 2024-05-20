import { ApiDefinitions, ContextEventDetailWithResult } from '@api-client/core';
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreDeleteEvent } from './BaseEvents.js';
import { EndPointInit, OperationInit } from '../types.js';

export const idValue = Symbol('idValue');
export const initValue = Symbol('initValue');
export const propertyValue = Symbol('propertyValue');
export const valueValue = Symbol('valueValue');

/**
 * Dispatched to list all operations inside an endpoint.
 */
export class ApiStoreEndpointListOperationsEvent extends ApiStoreContextEvent<object, ApiDefinitions.IApiOperationListItem[]> {
  [idValue]: string;

  /**
   * @returns Endpoint's domain id or its path used to initialize this event.
   */
  get pathOrId(): string {
    return this[idValue];
  }

  /**
   * @param pathOrId The domain id of the endpoint to list operations from or its path.
   */
  constructor(pathOrId: string) {
    super(EventTypes.Endpoint.listOperations, {});
    this[idValue] = pathOrId;
  }
}

/**
 * Dispatched to create an endpoint in the API.
 */
export class ApiStoreEndpointAddEvent extends ApiStoreContextEvent<object, ApiDefinitions.IApiEndPoint> {
  [initValue]: EndPointInit;

  /**
   * @returns Endpoint init definition used to initialize this event.
   */
  get init(): EndPointInit {
    return this[initValue];
  }

  /**
   * @param endpointInit The endpoint init definition
   */
  constructor(endpointInit: EndPointInit) {
    super(EventTypes.Endpoint.add, {});
    this[initValue] = Object.freeze({ ...endpointInit });
  }
}

/**
 * Dispatched to delete an endpoint from the API.
 */
export class ApiStoreEndpointDeleteEvent extends ApiStoreContextEvent<object, void> {
  [idValue]: string;
  /**
   * @returns Endpoint id used to initialize this event.
   */
  get id(): string {
    return this[idValue];
  }

  /**
   * @param endpointId The id of the endpoint to remove.
   */
  constructor(endpointId: string) {
    super(EventTypes.Endpoint.delete, {});
    this[idValue] = endpointId;
  }
}

/**
 * Dispatched to read an endpoint model from the API.
 */
export class ApiStoreEndpointReadEvent extends ApiStoreContextEvent<object, ApiDefinitions.IApiEndPoint> {
  [idValue]: string;
  /**
   * @returns The domain id of the endpoint or its path used to initialize this event.
   */
  get pathOrId(): string {
    return this[idValue];
  }

  /**
   * @param pathOrId The domain id of the endpoint or its path.
   */
  constructor(pathOrId: string) {
    super(EventTypes.Endpoint.get, {});
    this[idValue] = pathOrId;
  }
}

/**
 * Dispatched to update endpoint's scalar properties (including scalar arrays).
 */
export class ApiStoreEndpointUpdateEvent extends ApiStoreContextEvent<object, void> {
  [idValue]: string;
  [propertyValue]: string;
  [valueValue]: unknown;

  /**
   * @returns The domain id of the endpoint used to initialize this event.
   */
  get id(): string {
    return this[idValue];
  }
  
  /**
   * @returns The property name to update used to initialize this event.
   */
  get property(): string {
    return this[propertyValue];
  }
  
  /**
   * @returns The new value to set used to initialize this event.
   */
  get value(): unknown {
    return this[valueValue];
  }

  /**
   * @param endpointId The domain id of the endpoint.
   * @param property The property name to update
   * @param value The new value to set.
   */
  constructor(endpointId: string, property: string, value: unknown) {
    super(EventTypes.Endpoint.update, {});
    this[idValue] = endpointId;
    this[propertyValue] = property;
    this[valueValue] = value;
  }
}

export interface ApiStoreOperationCreateEventDetail extends ContextEventDetailWithResult<ApiDefinitions.IApiOperation> {
  /**
   * The initialization properties for the domain object
   */
  init: OperationInit;
  /**
   * The path or domain id of the endpoint that is the parent of the operation.
   */
  pathOrId: string;
}

/**
 * An event to be used to initialize a new object in the API store.
 */
export class ApiStoreOperationCreateEvent extends ApiStoreContextEvent<ApiStoreOperationCreateEventDetail> {
  /**
   * @param pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param init The object initialization properties.
   */
  constructor(pathOrId: string, init: OperationInit) {
    super(EventTypes.Endpoint.addOperation, { pathOrId, init });
  }
}

export const EndpointEvents = {
  /**
   * @param target The node on which to dispatch the event
   * @param endpointInit The endpoint init definition
   * @returns The generated id for the endpoint.
   */
  add: async (endpointInit: EndPointInit, target: EventTarget = window): Promise<ApiDefinitions.IApiEndPoint | undefined> => {
    const e = new ApiStoreEndpointAddEvent(endpointInit);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads the endpoint model from the store.
   * @param target The node on which to dispatch the event
   * @param pathOrId The domain id of the endpoint or its path.
   */
  get: async (pathOrId: string, target: EventTarget = window): Promise<ApiDefinitions.IApiEndPoint | undefined> => {
    const e = new ApiStoreEndpointReadEvent(pathOrId);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * @param target The node on which to dispatch the event
   * @param endpointId The domain id of the operation.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update: async (endpointId: string, property: string, value: unknown, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreEndpointUpdateEvent(endpointId, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * @param target The node on which to dispatch the event
   * @param endpointId The id of the endpoint to remove.
   */
  delete: async (endpointId: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreEndpointDeleteEvent(endpointId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * List all endpoints in the API.
   * @param target The node on which to dispatch the event
   */
  list: async (target: EventTarget = window): Promise<ApiDefinitions.IApiEndPointListItem[] | undefined> => {
    const e = new ApiStoreContextEvent(EventTypes.Endpoint.list, {});
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Lists all endpoints with operations included into the result.
   * @param target The node on which to dispatch the event
   */
  listWithOperations: async (target: EventTarget = window): Promise<ApiDefinitions.IApiEndPointWithOperationsListItem[] | undefined> => {
    const e = new ApiStoreContextEvent(EventTypes.Endpoint.listWithOperations, {});
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Lists all operations in an endpoint.
   * @param target The node on which to dispatch the event
   * @param pathOrId The domain id of the endpoint to list operations from or its path.
   */
  listOperations: async (pathOrId: string, target: EventTarget = window): Promise<ApiDefinitions.IApiOperationListItem[] | undefined> => {
    const e = new ApiStoreEndpointListOperationsEvent(pathOrId);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Adds a new operation object to the endpoint.
   * @param target The node on which to dispatch the event
   * @param pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param init The initialization properties
   */
  addOperation: async (pathOrId: string, init: OperationInit, target: EventTarget = window): Promise<ApiDefinitions.IApiOperation | undefined> => {
    const e = new ApiStoreOperationCreateEvent(pathOrId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the operation from the endpoint.
   * @param target The node on which to dispatch the event
   * @param {} operationId The domain id of the documentation object
   * @param endpointId The domain id of the parent endpoint
   * @returns {}
   */
  removeOperation: async (operationId: string, endpointId: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreDeleteEvent(EventTypes.Endpoint.removeOperation, operationId, endpointId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
};

Object.freeze(EndpointEvents);
