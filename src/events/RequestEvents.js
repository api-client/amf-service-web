/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreReadEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent, ApiStoreCreateHeaderEvent, ApiStoreCreatePayloadEvent, ApiStoreContextEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiRequest} ApiRequest */
/** @typedef {import('../types').ParameterInit} ParameterInit */
/** @typedef {import('../types').ApiParameter} ApiParameter */
/** @typedef {import('../types').PayloadInit} PayloadInit */
/** @typedef {import('../types').ApiPayload} ApiPayload */

/**
 * An event to be used to initialize a new query parameter to a request
 */
export class ApiStoreCreateQueryParameterEvent extends ApiStoreContextEvent {
  /**
   * @param {string} parentId The domain id of the parent request
   * @param {ParameterInit} init The parameter initialization properties.
   */
  constructor(parentId, init) {
    super(EventTypes.Request.addQueryParameter, { init, parentId });
  }
}

/**
 * An event to be used to initialize a new cookie parameter to a request
 */
export class ApiStoreCreateCookieParameterEvent extends ApiStoreContextEvent {
  /**
   * @param {string} parentId The domain id of the parent request
   * @param {ParameterInit} init The parameter initialization properties.
   */
  constructor(parentId, init) {
    super(EventTypes.Request.addCookieParameter, { init, parentId });
  }
}

export const RequestEvents = {
  /**
   * Reads a Request from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the request to read.
   * @returns {Promise<ApiRequest>}
   */
  get: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Request.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a scalar property of a Request.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the Request.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<void>}
   */
  update: async (target, id, property, value) => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Request.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new payload to the request object.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} requestId The request domain id
   * @param {PayloadInit} init The Payload init options.
   * @returns {Promise<ApiPayload>}
   */
  addPayload: async (target, requestId, init) => {
    const e = new ApiStoreCreatePayloadEvent(EventTypes.Request.addPayload, requestId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the payload from the request.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} payloadId The domain id of the Payload to remove
   * @param {string} requestId The id of the parent request
   * @returns {Promise<void>}
   */
  removePayload: async (target, payloadId, requestId) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Request.removePayload, payloadId, requestId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new header to the request object.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} requestId The request domain id
   * @param {ParameterInit} init The Parameter init options.
   * @returns {Promise<ApiParameter>}
   */
  addHeader: async (target, requestId, init) => {
    const e = new ApiStoreCreateHeaderEvent(EventTypes.Request.addHeader, requestId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the header from the request.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} headerId The domain id of the Header to remove
   * @param {string} requestId The id of the parent request
   * @returns {Promise<void>}
   */
  removeHeader: async (target, headerId, requestId) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Request.removeHeader, headerId, requestId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new query parameter to the request object.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} requestId The request domain id
   * @param {ParameterInit} init The Parameter init options.
   * @returns {Promise<ApiParameter>}
   */
  addQueryParameter: async (target, requestId, init) => {
    const e = new ApiStoreCreateQueryParameterEvent(requestId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the query parameter from the request.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} paramId The domain id of the query parameter to remove
   * @param {string} requestId The id of the parent request
   * @returns {Promise<void>}
   */
  removeQueryParameter: async (target, paramId, requestId) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Request.removeQueryParameter, paramId, requestId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new cookie parameter to the request object.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} requestId The request domain id
   * @param {ParameterInit} init The Parameter init options.
   * @returns {Promise<ApiParameter>}
   */
  addCookieParameter: async (target, requestId, init) => {
    const e = new ApiStoreCreateCookieParameterEvent(requestId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the cookie parameter from the request.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} cookieId The domain id of the cookie parameter to remove
   * @param {string} requestId The id of the parent request
   * @returns {Promise<void>}
   */
  removeCookieParameter: async (target, cookieId, requestId) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Request.removeCookieParameter, cookieId, requestId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
}

Object.freeze(RequestEvents);
