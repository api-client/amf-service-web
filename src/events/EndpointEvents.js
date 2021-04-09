/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('../types').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */
/** @typedef {import('../types').ApiOperationListItem} ApiOperationListItem */
/** @typedef {import('../types').ApiEndPoint} ApiEndPoint */
/** @typedef {import('../types').EndPointInit} EndPointInit */

export const idValue = Symbol('idValue');
export const initValue = Symbol('initValue');
export const propertyValue = Symbol('propertyValue');
export const valueValue = Symbol('valueValue');

/**
 * Dispatched to list all operations inside an endpoint.
 */
export class ApiStoreEndpointListOperationsEvent extends ApiStoreContextEvent {
  /**
   * @returns {string} Endpoint's domain id or its path used to initialize this event.
   */
  get pathOrId() {
    return this[idValue];
  }

  /**
   * @param {string} pathOrId The domain id of the endpoint to list operations from or its path.
   */
  constructor(pathOrId) {
    super(EventTypes.Endpoint.listOperations);
    this[idValue] = pathOrId;
  }
}

/**
 * Dispatched to create an endpoint in the API.
 */
export class ApiStoreEndpointAddEvent extends ApiStoreContextEvent {
  /**
   * @returns {EndPointInit} Endpoint init definition used to initialize this event.
   */
  get init() {
    return this[initValue];
  }

  /**
   * @param {EndPointInit} endpointInit The endpoint init definition
   */
  constructor(endpointInit) {
    super(EventTypes.Endpoint.add);
    this[initValue] = Object.freeze({ ...endpointInit });
  }
}

/**
 * Dispatched to delete an endpoint from the API.
 */
export class ApiStoreEndpointDeleteEvent extends ApiStoreContextEvent {
  /**
   * @returns {string} Endpoint id used to initialize this event.
   */
  get id() {
    return this[idValue];
  }

  /**
   * @param {string} endpointId The id of the endpoint to remove.
   */
  constructor(endpointId) {
    super(EventTypes.Endpoint.delete);
    this[idValue] = endpointId;
  }
}

/**
 * Dispatched to read an endpoint model from the API.
 */
export class ApiStoreEndpointReadEvent extends ApiStoreContextEvent {
  /**
   * @returns {string} The domain id of the endpoint or its path used to initialize this event.
   */
  get pathOrId() {
    return this[idValue];
  }

  /**
   * @param {string} pathOrId The domain id of the endpoint or its path.
   */
  constructor(pathOrId) {
    super(EventTypes.Endpoint.get);
    this[idValue] = pathOrId;
  }
}

/**
 * Dispatched to update endpoint's scalar properties (including scalar arrays).
 */
export class ApiStoreEndpointUpdateEvent extends ApiStoreContextEvent {
  /**
   * @returns {string} The domain id of the endpoint used to initialize this event.
   */
  get id() {
    return this[idValue];
  }
  
  /**
   * @returns {string} The property name to update used to initialize this event.
   */
  get property() {
    return this[propertyValue];
  }
  
  /**
   * @returns {any} The new value to set used to initialize this event.
   */
  get value() {
    return this[valueValue];
  }

  /**
   * @param {string} endpointId The domain id of the endpoint.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   */
  constructor(endpointId, property, value) {
    super(EventTypes.Endpoint.update);
    this[idValue] = endpointId;
    this[propertyValue] = property;
    this[valueValue] = value;
  }
}

export const EndpointEvents = {
  /**
   * List all endpoints in the API.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<ApiEndPointListItem[]>}
   */
  list: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Endpoint.list);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Lists all endpoints with operations included into the result.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<ApiEndPointWithOperationsListItem[]>}
   */
  listWithOperations: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Endpoint.listWithOperations);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Lists all operations in an endpoint.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} pathOrId The domain id of the endpoint to list operations from or its path.
   * @returns {Promise<ApiOperationListItem[]>}
   */
  listOperations: async (target, pathOrId) => {
    const e = new ApiStoreEndpointListOperationsEvent(pathOrId);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {EndPointInit} endpointInit The endpoint init definition
   * @returns {Promise<string>} The generated id for the endpoint.
   */
  add: async (target, endpointInit) => {
    const e = new ApiStoreEndpointAddEvent(endpointInit);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} endpointId The id of the endpoint to remove.
   * @returns {Promise<void>}
   */
  delete: async (target, endpointId) => {
    const e = new ApiStoreEndpointDeleteEvent(endpointId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Reads the endpoint model from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} pathOrId The domain id of the endpoint or its path.
   * @returns {Promise<ApiEndPoint>}
   */
  get: async (target, pathOrId) => {
    const e = new ApiStoreEndpointReadEvent(pathOrId);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} endpointId The domain id of the operation.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<void>}
   */
  update: async (target, endpointId, property, value) => {
    const e = new ApiStoreEndpointUpdateEvent(endpointId, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
};

Object.freeze(EndpointEvents);
