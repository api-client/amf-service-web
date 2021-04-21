/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiOperation} ApiOperation */
/** @typedef {import('../types').OperationInit} OperationInit */
/** @typedef {import('../types').ApiEndPoint} ApiEndPoint */

/**
 * An event to be used to initialize a new object in the API store.
 */
export class ApiStoreOperationCreateEvent extends ApiStoreContextEvent {
  /**
   * @param {string} pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param {OperationInit} init The object initialization properties.
   */
  constructor(pathOrId, init) {
    super(EventTypes.Operation.add, { pathOrId, init });
  }
}

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

export const OperationEvents = {
  /**
   * Adds a new operation object to the graph.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param {OperationInit} init The initialization properties
   * @returns {Promise<ApiOperation>}
   */
  add: async (target, pathOrId, init) => {
    const e = new ApiStoreOperationCreateEvent(pathOrId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
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
   * Removes the operation from the graph.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the documentation object
   * @returns {Promise<void>}
   */
  delete: async (target, id) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Operation.delete, id);
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
