import { ApiDefinitions } from '@api-client/core';
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent } from './BaseEvents.js';
import { OperationRequestInit, OperationResponseInit } from '../types.js';
/**
 * An event to be used to read an operation from the store.
 */
export class ApiStoreOperationReadEvent extends ApiStoreContextEvent<{ methodOrId: string, pathOrId?: string }, ApiDefinitions.IApiOperation> {
  /**
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  constructor(type: string, methodOrId: string, pathOrId?: string) {
    super(type, { methodOrId, pathOrId });
  }
}

/**
 * An event to be used to read an operation parent from the store.
 */
export class ApiStoreOperationParentReadEvent extends ApiStoreContextEvent<{ methodOrId: string, pathOrId?: string }, ApiDefinitions.IApiEndPoint> {
  /**
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  constructor(methodOrId: string, pathOrId?: string) {
    super(EventTypes.Operation.getParent, { methodOrId, pathOrId });
  }
}

/**
 * An event to be used to initialize a new Request on an operation.
 */
export class ApiStoreCreateRequestEvent extends ApiStoreContextEvent<{parentId: string, init?: OperationRequestInit}, ApiDefinitions.IApiRequest> {
  /**
   * @param type The type of the event
   * @param parentId The domain id of the parent operation
   * @param init The Request initialization properties.
   */
  constructor(type: string, parentId: string, init?: OperationRequestInit) {
    super(type, { init, parentId });
  }
}

/**
 * An event to be used to initialize a new Response on an operation.
 */
export class ApiStoreCreateResponseEvent extends ApiStoreContextEvent<{parentId: string, init: OperationResponseInit}, ApiDefinitions.IApiResponse> {
  /**
   * @param type The type of the event
   * @param parentId The domain id of the parent operation
   * @param init The Response initialization properties.
   */
  constructor(type: string, parentId: string, init: OperationResponseInit) {
    super(type, { init, parentId });
  }
}

export const OperationEvents = {
  /**
   * Reads the operation from the store.
   * @param target The node on which to dispatch the event
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  get: async (methodOrId: string, pathOrId?: string, target: EventTarget = window): Promise<ApiDefinitions.IApiOperation | undefined> => {
    const e = new ApiStoreOperationReadEvent(EventTypes.Operation.get, methodOrId, pathOrId);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads the operation model with all sub-models.
   * 
   * @param target The node on which to dispatch the event
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  getRecursive: async (methodOrId: string, pathOrId?: string, target: EventTarget = window): Promise<ApiDefinitions.IApiOperation | undefined> => {
    const e = new ApiStoreOperationReadEvent(EventTypes.Operation.getRecursive, methodOrId, pathOrId);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Updates a scalar property of the operation.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the documentation.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update: async (id: string, property: string, value: unknown, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Operation.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new Request to the operation object.
   * @param target The node on which to dispatch the event
   * @param id The operation domain id
   * @param init The Request init options.
   */
  addRequest: async (id: string, init?: OperationRequestInit, target: EventTarget = window): Promise<ApiDefinitions.IApiRequest | undefined> => {
    const e = new ApiStoreCreateRequestEvent(EventTypes.Operation.addRequest, id, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the request from the operation.
   * @param target The node on which to dispatch the event
   * @param requestId The domain id of the Request to remove
   * @param operationId The id of the parent operation
   */
  removeRequest: async (requestId: string, operationId: string, target: EventTarget = window): Promise<void>=> {
    const e = new ApiStoreDeleteEvent(EventTypes.Operation.removeRequest, requestId, operationId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new Response to the operation object.
   * @param target The node on which to dispatch the event
   * @param id The operation domain id
   * @param init The Response init options.
   */
  addResponse: async (id: string, init: OperationResponseInit, target: EventTarget = window): Promise<ApiDefinitions.IApiResponse | undefined> => {
    const e = new ApiStoreCreateResponseEvent(EventTypes.Operation.addResponse, id, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the response from the operation.
   * @param target The node on which to dispatch the event
   * @param responseId The domain id of the Response to remove
   * @param operationId The id of the parent operation
   */
  removeResponse: async (responseId: string, operationId: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreDeleteEvent(EventTypes.Operation.removeResponse, responseId, operationId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Reads the operation parent from the store.
   * @param target The node on which to dispatch the event
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  getParent: async (methodOrId: string, pathOrId?: string, target: EventTarget = window): Promise<ApiDefinitions.IApiEndPoint | undefined> => {
    const e = new ApiStoreOperationParentReadEvent(methodOrId, pathOrId);
    target.dispatchEvent(e);
    return e.detail.result;
  },
};

Object.freeze(OperationEvents);
