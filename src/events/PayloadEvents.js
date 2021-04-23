/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreReadEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent, ApiStoreCreateExampleEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiPayload} ApiPayload */
/** @typedef {import('../types').ExampleInit} ExampleInit */
/** @typedef {import('../types').ApiExample} ApiExample */

export const PayloadEvents = {
  /**
   * Reads a Payload from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the Payload to read.
   * @returns {Promise<ApiPayload>}
   */
  get: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Payload.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a scalar property of a Payload.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the Payload.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<void>}
   */
  update: async (target, id, property, value) => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Payload.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new example to the Payload object.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} payloadId The payload domain id
   * @param {ExampleInit} init The example init options.
   * @returns {Promise<ApiExample>}
   */
  addExample: async (target, payloadId, init) => {
    const e = new ApiStoreCreateExampleEvent(EventTypes.Payload.addExample, payloadId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the example from the payload.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} exampleId The domain id of the example to remove
   * @param {string} payloadId The id of the parent payload
   * @returns {Promise<void>}
   */
  removeExample: async (target, exampleId, payloadId) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Payload.removeExample, exampleId, payloadId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
}

Object.freeze(PayloadEvents);
