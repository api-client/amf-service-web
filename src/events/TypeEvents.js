/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreCreateEvent, ApiStoreReadEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiNodeShapeListItem} ApiNodeShapeListItem */
/** @typedef {import('../types').ShapeInit} ShapeInit */
/** @typedef {import('../types').ApiShapeUnion} ApiShapeUnion */

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
  /**
   * Adds a new type (schema) object to the graph.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {ShapeInit} init The initialization properties
   * @returns {Promise<ApiShapeUnion>}
   */
  add: async (target, init) => {
    const e = new ApiStoreCreateEvent(EventTypes.Type.add, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a type (schema) from the store.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the document to read.
   * @returns {Promise<ApiShapeUnion>}
   */
  get: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Type.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a scalar property of a type (schema).
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the documentation.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<void>}
   */
  update: async (target, id, property, value) => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Type.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Removes the type (schema) from the graph.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the documentation object
   * @returns {Promise<void>}
   */
  delete: async (target, id) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Type.delete, id);
    target.dispatchEvent(e);
    await e.detail.result;
  },
};

Object.freeze(TypeEvents);
