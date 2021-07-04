/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreReadEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent, ApiStoreCreateHeaderEvent, ApiStoreCreatePayloadEvent, ApiStoreReadBulkEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiResponse} ApiResponse */
/** @typedef {import('../types').ApiResponseRecursive} ApiResponseRecursive */
/** @typedef {import('../types').ParameterInit} ParameterInit */
/** @typedef {import('../types').ApiParameter} ApiParameter */
/** @typedef {import('../types').PayloadInit} PayloadInit */
/** @typedef {import('../types').ApiPayload} ApiPayload */

export const ResponseEvents = {
  /**
   * Reads a Response from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the response to read.
   * @returns {Promise<ApiResponse>}
   */
  get: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Response.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a Response from the store and returns the full (recursive) model.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the response to read.
   * @returns {Promise<ApiResponseRecursive>}
   */
  getRecursive: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Response.getRecursive, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a list of Response in a bulk operation.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string[]} ids The list of ids to read.
   * @returns {Promise<ApiResponse[]>}
   */
  getBulk: async (target, ids) => {
    const e = new ApiStoreReadBulkEvent(EventTypes.Response.getBulk, ids);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a list of Response in a bulk operation and returns the full (recursive) model.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string[]} ids The list of ids to read.
   * @returns {Promise<ApiResponseRecursive[]>}
   */
  getBulkRecursive: async (target, ids) => {
    const e = new ApiStoreReadBulkEvent(EventTypes.Response.getBulkRecursive, ids);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a scalar property of a Response.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the Response.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<void>}
   */
  update: async (target, id, property, value) => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Response.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new header to the response object.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} responseId The response domain id
   * @param {ParameterInit} init The Parameter init options.
   * @returns {Promise<ApiParameter>}
   */
  addHeader: async (target, responseId, init) => {
    const e = new ApiStoreCreateHeaderEvent(EventTypes.Response.addHeader, responseId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the header from the response.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} headerId The domain id of the Header to remove
   * @param {string} responseId The id of the parent response
   * @returns {Promise<void>}
   */
  removeHeader: async (target, headerId, responseId) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Response.removeHeader, headerId, responseId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new payload to the response object.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} responseId The response domain id
   * @param {PayloadInit} init The Payload init options.
   * @returns {Promise<ApiPayload>}
   */
  addPayload: async (target, responseId, init) => {
    const e = new ApiStoreCreatePayloadEvent(EventTypes.Response.addPayload, responseId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the payload from the response.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} payloadId The domain id of the Payload to remove
   * @param {string} responseId The id of the parent response
   * @returns {Promise<void>}
   */
  removePayload: async (target, payloadId, responseId) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Response.removePayload, payloadId, responseId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
}

Object.freeze(ResponseEvents);
