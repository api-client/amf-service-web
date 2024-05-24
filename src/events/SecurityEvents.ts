import { ApiDefinitions } from '@api-client/core/build/esm/browser.js';
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreReadEvent } from './BaseEvents.js';

export const SecurityEvents = {
  /**
   * Reads a Security definition from the store.
   * Note, do not use this method to read the definition of a security scheme applied to an endpoint or operation.
   * For that use `getRequirement()` instead.
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  get: async (id: string, target: EventTarget = window): Promise<ApiDefinitions.IApiSecurityScheme | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Security.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a Security definition from the store and returns the full (recursive) model.
   * Note, do not use this method to read the definition of a security scheme applied to an endpoint or operation.
   * For that use `getRequirement()` instead.
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  getRecursive: async (id: string, target: EventTarget = window): Promise<ApiDefinitions.IApiSecurityScheme | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Security.getRecursive, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Reads a security requirement for an endpoint or operation.
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  getRequirement: async (id: string, target: EventTarget = window): Promise<ApiDefinitions.IApiSecurityRequirement | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Security.getRequirement, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Reads a security requirement for an endpoint or operation and returns the full (recursive) model.
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  getRequirementRecursive: async (id: string, target: EventTarget = window): Promise<ApiDefinitions.IApiSecurityRequirement | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Security.getRequirementRecursive, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Reads a security settings for an endpoint or operation.
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  getSettings: async (id: string, target: EventTarget = window): Promise<ApiDefinitions.IApiSecuritySettingsUnion | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Security.getSettings, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Lists the security definitions for the API.
   * @param target The node on which to dispatch the event
   */
  list: async (target: EventTarget = window): Promise<ApiDefinitions.IApiSecuritySchemeListItem | undefined> => {
    const e = new ApiStoreContextEvent(EventTypes.Security.list, {});
    target.dispatchEvent(e);
    return e.detail.result;
  },
};

Object.freeze(SecurityEvents);
