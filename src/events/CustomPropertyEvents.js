import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreReadEvent, ApiStoreDeleteEvent, ApiStoreCreateEvent, ApiStoreUpdateScalarEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiCustomDomainPropertyListItem} ApiCustomDomainPropertyListItem */
/** @typedef {import('../types').ApiCustomDomainProperty} ApiCustomDomainProperty */
/** @typedef {import('../types').ApiDomainExtension} ApiDomainExtension */
/** @typedef {import('../types').CustomDomainPropertyInit} CustomDomainPropertyInit */

export const CustomPropertyEvents = {
  /**
   * Lists the custom domain properties (domain extensions, annotations) definitions for the API.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<ApiCustomDomainPropertyListItem[]>}
   */
  list: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.CustomProperty.list);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Adds a new type (schema) object to the graph.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {CustomDomainPropertyInit=} init The initialization properties
   * @returns {Promise<ApiCustomDomainProperty>}
   */
  add: async (target, init) => {
    const e = new ApiStoreCreateEvent(EventTypes.CustomProperty.add, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads the CustomDomainProperty object from the graph.
   * This is a definition of domain extension (RAML annotation).
   * 
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the object to read.
   * @returns {Promise<ApiCustomDomainProperty>}
   */
  get: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.CustomProperty.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a CustomDomainProperty object from the graph.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the object.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<void>}
   */
  update: async (target, id, property, value) => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.CustomProperty.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Reads the DomainExtension object from the graph.
   * This is a definition of applied to an object domain extension (RAML annotation).
   * 
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The id of the object to read.
   * @returns {Promise<ApiDomainExtension>}
   */
  getExtension: async (target, id) => {
    const e = new ApiStoreReadEvent(EventTypes.CustomProperty.getExtension, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the CustomDomainProperty from the graph.
   * This is a definition of domain extension (RAML annotation), not it's implementation.
   * 
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the object object
   * @returns {Promise<void>}
   */
  delete: async (target, id) => {
    const e = new ApiStoreDeleteEvent(EventTypes.CustomProperty.delete, id);
    target.dispatchEvent(e);
    await e.detail.result;
  },
};
Object.freeze(CustomPropertyEvents);
