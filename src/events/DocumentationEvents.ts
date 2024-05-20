import { ApiDefinitions } from '@api-client/core';
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreCreateEvent, ApiStoreReadEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent } from './BaseEvents.js';
import { DocumentationInit } from '../types.js';

/** @typedef {import('../types').ApiDocumentation} ApiDocumentation */
/** @typedef {import('../types').DocumentationInit} DocumentationInit */

export const DocumentationEvents = {
  /**
   * Lists the documentation definitions for the API.
   * @param target The node on which to dispatch the event
   * @returns The list of documentations.
   */
  list: async (target: EventTarget = window): Promise<ApiDefinitions.IApiDocumentation[] | undefined> => {
    const e = new ApiStoreContextEvent(EventTypes.Documentation.list, {});
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Adds a new documentation object to the graph.
   * @param target The node on which to dispatch the event
   * @param init The initialization properties
   */
  add: async (init: DocumentationInit, target: EventTarget = window): Promise<ApiDefinitions.IApiDocumentation[] | undefined> => {
    const e = new ApiStoreCreateEvent(EventTypes.Documentation.add, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a documentation from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the document to read.
   */
  get: async (id: string, target: EventTarget = window): Promise<ApiDefinitions.IApiDocumentation[] | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Documentation.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a scalar property of a documentation.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the documentation.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update: async (id: string, property: string, value: unknown, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Documentation.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Removes the documentation from the graph.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the documentation object
   */
  delete: async (id: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreDeleteEvent(EventTypes.Documentation.delete, id);
    target.dispatchEvent(e);
    await e.detail.result;
  },
};

Object.freeze(DocumentationEvents);
