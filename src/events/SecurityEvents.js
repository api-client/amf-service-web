/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreReadEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiSecuritySchemeListItem} ApiSecuritySchemeListItem */
/** @typedef {import('../types').ApiSecurityScheme} ApiSecurityScheme */
/** @typedef {import('../types').ApiSecurityRequirement} ApiSecurityRequirement */

export const SecurityEvents = {
  /**
   * Reads a Security definition from the store.
   * Note, do not use this method to read the definition of a security scheme applied to an endpoint or operation.
   * For that use `getRequirement()` instead.
   * 
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the Payload to read.
   * @returns {Promise<ApiSecurityScheme>}
   */
  get: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Security.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Reads a security requirement for an endpoint or operation.
   * 
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the Payload to read.
   * @returns {Promise<ApiSecurityRequirement>}
   */
  getRequirement: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Security.getRequirement, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Lists the security definitions for the API.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<ApiSecuritySchemeListItem[]>}
   */
  list: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Security.list);
    target.dispatchEvent(e);
    return e.detail.result;
  },
};

Object.freeze(SecurityEvents);
