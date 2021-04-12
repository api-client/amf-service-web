/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiNodeShapeListItem} ApiNodeShapeListItem */

export const TypeEvents = {
  /**
   * Lists the type (schema) definitions for the API.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<ApiNodeShapeListItem[]>}
   */
  list: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Type.list);
    target.dispatchEvent(e);
    return e.detail.result;
  },
};

Object.freeze(TypeEvents);
