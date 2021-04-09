/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent } from './BaseEvents.js';

/** @typedef {import('../types').ApiServer} ApiServer */
/** @typedef {import('../types').ApiServerInit} ApiServerInit */

export const idValue = Symbol('idValue');
export const initValue = Symbol('initValue');

/**
 * Dispatched to create a server in the API.
 */
export class ApiServerAddEvent extends ApiStoreContextEvent {
  /**
   * @returns {ApiServerInit} Server init definition used to initialize this event.
   */
  get init() {
    return this[initValue];
  }

  /**
   * @param {ApiServerInit} serverInit The server init definition
   */
  constructor(serverInit) {
    super(EventTypes.Server.add);
    this[initValue] = Object.freeze({ ...serverInit });
  }
}

/**
 * Dispatched to read a sever model from the API.
 */
export class ApiServerReadEvent extends ApiStoreContextEvent {
  /**
   * @returns {string} The domain id of the server used to initialize this event.
   */
  get id() {
    return this[idValue];
  }

  /**
   * @param {string} id The domain id of the endpoint or its path.
   */
  constructor(id) {
    super(EventTypes.Server.get);
    this[idValue] = id;
  }
}

export const ServerEvents = {
  /**
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<ApiServer[]>} The list of servers in this API.
   */
  list: async (target) => {
    const e = new ApiStoreContextEvent(EventTypes.Server.list);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Adds a server definition to the API.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {ApiServerInit} init 
   * @returns {Promise<string>} The domain id of the created server.
   */
  add: async (target, init) => {
    const e = new ApiServerAddEvent(init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads the Server definition from the graph.
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} id The domain id of the Server to read
   * @returns {Promise<ApiServer>}
   */
  get: async (target, id) => {
    const e = new ApiServerReadEvent(id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
}

Object.freeze(ServerEvents);
