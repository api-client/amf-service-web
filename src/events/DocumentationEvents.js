/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreCreateEvent, ApiStoreReadEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiDocumentation} ApiDocumentation */
/** @typedef {import('../types').DocumentationInit} DocumentationInit */

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
  /**
   * Adds a new documentation object to the graph.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {DocumentationInit} init The initialization properties
   * @returns {Promise<ApiDocumentation>}
   */
  add: async (target, init) => {
    const e = new ApiStoreCreateEvent(EventTypes.Documentation.add, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a documentation from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the document to read.
   * @returns {Promise<ApiDocumentation>}
   */
  get: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Documentation.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a scalar property of a documentation.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the documentation.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<void>}
   */
  update: async (target, id, property, value) => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Documentation.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Removes the documentation from the graph.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the documentation object
   * @returns {Promise<void>}
   */
  delete: async (target, id) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Documentation.delete, id);
    target.dispatchEvent(e);
    await e.detail.result;
  },
};

Object.freeze(DocumentationEvents);
