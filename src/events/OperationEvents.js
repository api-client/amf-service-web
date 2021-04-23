/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiOperation} ApiOperation */
/** @typedef {import('../types').ApiEndPoint} ApiEndPoint */
/** @typedef {import('../types').OperationRequestInit} OperationRequestInit */
/** @typedef {import('../types').ApiRequest} ApiRequest */
/** @typedef {import('../types').OperationResponseInit} OperationResponseInit */
/** @typedef {import('../types').ApiResponse} ApiResponse */

/**
 * An event to be used to read an operation from the store.
 */
export class ApiStoreOperationReadEvent extends ApiStoreContextEvent {
  /**
   * @param {string} methodOrId Method name or the domain id of the operation to find
   * @param {string=} pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  constructor(methodOrId, pathOrId) {
    super(EventTypes.Operation.get, { methodOrId, pathOrId });
  }
}

/**
 * An event to be used to read an operation parent from the store.
 */
export class ApiStoreOperationParentReadEvent extends ApiStoreContextEvent {
  /**
   * @param {string} methodOrId Method name or the domain id of the operation to find
   * @param {string=} pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  constructor(methodOrId, pathOrId) {
    super(EventTypes.Operation.getParent, { methodOrId, pathOrId });
  }
}

/**
 * An event to be used to initialize a new Request on an operation.
 */
export class ApiStoreCreateRequestEvent extends ApiStoreContextEvent {
  /**
   * @param {string} type The type of the event
   * @param {string} parentId The domain id of the parent operation
   * @param {OperationRequestInit=} init The Request initialization properties.
   */
  constructor(type, parentId, init) {
    super(type, { init, parentId });
  }
}

/**
 * An event to be used to initialize a new Response on an operation.
 */
export class ApiStoreCreateResponseEvent extends ApiStoreContextEvent {
  /**
   * @param {string} type The type of the event
   * @param {string} parentId The domain id of the parent operation
   * @param {OperationResponseInit} init The Response initialization properties.
   */
  constructor(type, parentId, init) {
    super(type, { init, parentId });
  }
}

export const OperationEvents = {
  /**
   * Reads the operation from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} methodOrId Method name or the domain id of the operation to find
   * @param {string=} pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   * @returns {Promise<ApiOperation>}
   */
  get: async (target, methodOrId, pathOrId) => {
    const e = new ApiStoreOperationReadEvent(methodOrId, pathOrId);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a scalar property of the operation.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the documentation.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<void>}
   */
  update: async (target, id, property, value) => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Operation.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new Request to the operation object.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The operation domain id
   * @param {OperationRequestInit=} init The Request init options.
   * @returns {Promise<ApiRequest>}
   */
  addRequest: async (target, id, init) => {
    const e = new ApiStoreCreateRequestEvent(EventTypes.Operation.addRequest, id, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the request from the operation.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} requestId The domain id of the Request to remove
   * @param {string} operationId The id of the parent operation
   * @returns {Promise<void>}
   */
  removeRequest: async (target, requestId, operationId) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Operation.removeRequest, requestId, operationId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new Response to the operation object.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The operation domain id
   * @param {OperationResponseInit} init The Response init options.
   * @returns {Promise<ApiResponse>}
   */
  addResponse: async (target, id, init) => {
    const e = new ApiStoreCreateResponseEvent(EventTypes.Operation.addResponse, id, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the response from the operation.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} responseId The domain id of the Response to remove
   * @param {string} operationId The id of the parent operation
   * @returns {Promise<void>}
   */
  removeResponse: async (target, responseId, operationId) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Operation.removeResponse, responseId, operationId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Reads the operation parent from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} methodOrId Method name or the domain id of the operation to find
   * @param {string=} pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   * @returns {Promise<ApiEndPoint>}
   */
  getParent: async (target, methodOrId, pathOrId) => {
    const e = new ApiStoreOperationParentReadEvent(methodOrId, pathOrId);
    target.dispatchEvent(e);
    return e.detail.result;
  },
};

Object.freeze(OperationEvents);
