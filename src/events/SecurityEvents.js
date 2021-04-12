/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiSecuritySchemeListItem} ApiSecuritySchemeListItem */

export const SecurityEvents = {
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
