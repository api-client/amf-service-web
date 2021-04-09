/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiInit} ApiInit */
/** @typedef {import('../types').SerializedApi} SerializedApi */

export const initValue = Symbol('initValue');

/**
 * Dispatched to create a WebApi in the store.
 */
export class ApiCreateEvent extends ApiStoreContextEvent {
  /**
   * @returns {ApiInit|undefined} Api init options used to initialize this event.
   */
  get init() {
    return this[initValue];
  }

  /**
   * @param {string} type The event type to differentiate Async from web APIs.
   * @param {ApiInit=} apiInit The API init options
   */
  constructor(type, apiInit) {
    super(type);
    this[initValue] = Object.freeze({ ...apiInit });
  }
}

export const ApiEvents = {
  /**
   * Creates a new WebApi.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {ApiInit=} init Api init options
   * @returns {Promise<string>} The domain id of the created WebAPI
   */
  createWebApi: async (target, init) => {
    const e = new ApiCreateEvent(EventTypes.Api.createWebApi, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Generates RAML spec file from the current graph.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<string>} RAML value for the API.
   */
  generateRaml: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Api.generateRaml);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Generates json+ld from the current graph.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<string>} JSON+ld value of the API.
   */
  generateGraph: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Api.generateGraph);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads basic info about the API.
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<SerializedApi>}
   */
  get: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Api.get);
    target.dispatchEvent(e);
    return e.detail.result;
  },
}
Object.freeze(ApiEvents);
