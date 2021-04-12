/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiDocumentation} ApiDocumentation */

export const DocumentationEvents = {
  /**
   * Lists the documentation definitions for the API.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<ApiDocumentation[]>} The list of documentations.
   */
  list: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Documentation.list);
    target.dispatchEvent(e);
    return e.detail.result;
  },
};

Object.freeze(DocumentationEvents);
