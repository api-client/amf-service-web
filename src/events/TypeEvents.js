/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreCreateEvent, ApiStoreReadEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent } from './BaseEvents.js';

/** @typedef {import('../types').PropertyShapeInit} PropertyShapeInit */
/** @typedef {import('../types').ApiPropertyShape} ApiPropertyShape */

/**
 * An event to be used to initialize a new property on a NodeShape.
 */
export class ApiStoreCreatePropertyEvent extends ApiStoreContextEvent {
  /**
   * @param {string} parent The domain id of the parent object (NodeShape)
   * @param {PropertyShapeInit} init The parameter initialization properties.
   */
  constructor(parent, init) {
    super(EventTypes.Type.addProperty, { init, parent });
  }
}

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
   * @param {string} id The id of the object to read.
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
   * @param {string} id The domain id of the object.
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
   * @param {string} id The domain id of the object object
   * @returns {Promise<void>}
   */
  delete: async (target, id) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Type.delete, id);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Creates a new property on a type.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the type to add the property to.
   * @param {PropertyShapeInit} init The property initialization configuration.
   * @returns {Promise<ApiPropertyShape>}
   */
  addProperty: async (target, id, init) => {
    const e = new ApiStoreCreatePropertyEvent(id, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads the definition of a property of a NodeShape.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the object to read.
   * @returns {Promise<ApiPropertyShape>}
   */
  getProperty: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.Type.getProperty, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes a property from a node shape.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the property to remove.
   * @param {string} typeId The domain id of a parent type
   * @returns {Promise<void>}
   */
  deleteProperty: async (target, id, typeId) => {
    const e = new ApiStoreDeleteEvent(EventTypes.Type.deleteProperty, id, typeId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Updates a scalar property of a property of a NodeShape.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} parent The domain id of the parent type.
   * @param {string} id The domain id of the object.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<void>}
   */
  updateProperty: async (target, parent, id, property, value) => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Type.updateProperty, id, property, value, parent);
    target.dispatchEvent(e);
    await e.detail.result;
  },
};

Object.freeze(TypeEvents);
