/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreReadEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent, ApiStoreCreateExampleEvent } from './BaseEvents.js';

/** @typedef {import('../types').ParameterInit} ParameterInit */
/** @typedef {import('../types').ApiParameter} ApiParameter */
/** @typedef {import('../types').ExampleInit} ExampleInit */
/** @typedef {import('../types').ApiExample} ApiExample */

export const ParameterEvents = {
  /**
   * Reads a Parameter from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the parameter to read.
   * @returns {Promise<ApiParameter>}
   */
  get: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Parameter.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a scalar property of a Parameter.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the Parameter.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<void>}
   */
  update: async (target, id, property, value) => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Parameter.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new example to the Parameter object.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} parameterId The parameter domain id
   * @param {ExampleInit} init The example init options.
   * @returns {Promise<ApiExample>}
   */
  addExample: async (target, parameterId, init) => {
    const e = new ApiStoreCreateExampleEvent(EventTypes.Parameter.addExample, parameterId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the example from the Parameter.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} exampleId The domain id of the example to remove
   * @param {string} parameterId The id of the parent parameter
   * @returns {Promise<void>}
   */
  removeExample: async (target, exampleId, parameterId) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Parameter.removeExample, exampleId, parameterId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
};
Object.freeze(ParameterEvents);
