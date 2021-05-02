/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreReadEvent, ApiStoreUpdateScalarEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiExample} ApiExample */

export const ExampleEvents = {
  /**
   * Reads an Example from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the example to read.
   * @returns {Promise<ApiExample>}
   */
  get: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Example.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a scalar property of an Example.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the Example.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<void>}
   */
  update: async (target, id, property, value) => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Example.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
};
Object.freeze(ExampleEvents);
