import { AmfBase, ApiDefinitions } from '@api-client/core/build/esm/browser.js';
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreReadEvent, ApiStoreDeleteEvent, ApiStoreCreateEvent, ApiStoreUpdateScalarEvent } from './BaseEvents.js';
import { ApiCustomDomainExtensionListItem, CustomDomainPropertyInit } from '../types.js';

export const CustomPropertyEvents = {
  /**
   * Lists the custom domain properties (domain extensions, annotations) definitions for the API.
   * @param target The node on which to dispatch the event
   */
  list: async (target: EventTarget = window): Promise<ApiCustomDomainExtensionListItem[] | undefined> => {
    const e = new ApiStoreContextEvent<object, ApiCustomDomainExtensionListItem[]>(EventTypes.CustomProperty.list, {});
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Adds a new type (schema) object to the graph.
   * @param target The node on which to dispatch the event
   * @param init The initialization properties
   */
  add: async (init: CustomDomainPropertyInit, target: EventTarget = window): Promise<AmfBase.IApiCustomDomainProperty | undefined> => {
    const e = new ApiStoreCreateEvent(EventTypes.CustomProperty.add, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads the CustomDomainProperty object from the graph.
   * This is a definition of domain extension (RAML annotation).
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the object to read.
   */
  get: async (id: string, target: EventTarget = window): Promise<AmfBase.IApiCustomDomainProperty | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.CustomProperty.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a CustomDomainProperty object from the graph.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the object.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update: async (id: string, property: string, value: unknown, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.CustomProperty.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Reads the DomainExtension object from the graph.
   * This is a definition of applied to an object domain extension (RAML annotation).
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the object to read.
   */
  getExtension: async (id: string, target: EventTarget = window): Promise<ApiDefinitions.IApiDomainExtension | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.CustomProperty.getExtension, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the CustomDomainProperty from the graph.
   * This is a definition of domain extension (RAML annotation), not it's implementation.
   * 
   * @param target The node on which to dispatch the event
   * @param id The domain id of the object object
   */
  delete: async (id: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreDeleteEvent(EventTypes.CustomProperty.delete, id);
    target.dispatchEvent(e);
    await e.detail.result;
  },
};
Object.freeze(CustomPropertyEvents);
