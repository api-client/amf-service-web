import { ApiDefinitions } from '@api-client/core/build/esm/browser.js';
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent } from './BaseEvents.js';
import { ApiServerInit } from '../types.js';

export const idValue = Symbol('idValue');
export const initValue = Symbol('initValue');

/**
 * Dispatched to create a server in the API.
 */
export class ApiServerAddEvent extends ApiStoreContextEvent<object, ApiDefinitions.IApiServer> {
  [initValue]: ApiServerInit;

  /**
   * @returns Server init definition used to initialize this event.
   */
  get init(): ApiServerInit {
    return this[initValue];
  }

  /**
   * @param serverInit The server init definition
   */
  constructor(serverInit: ApiServerInit) {
    super(EventTypes.Server.add, {});
    this[initValue] = Object.freeze({ ...serverInit });
  }
}

/**
 * Dispatched to read a sever model from the API.
 */
export class ApiServerReadEvent extends ApiStoreContextEvent<object, ApiDefinitions.IApiServer> {
  [idValue]: string;

  /**
   * @returns The domain id of the server used to initialize this event.
   */
  get id(): string {
    return this[idValue];
  }

  /**
   * @param id The domain id of the endpoint or its path.
   */
  constructor(id: string) {
    super(EventTypes.Server.get, {});
    this[idValue] = id;
  }
}

export const ServerEvents = {
  /**
   * @param target The node on which to dispatch the event
   * @returns The list of servers in this API.
   */
  list: async (target: EventTarget = window): Promise<ApiDefinitions.IApiServer | undefined> => {
    const e = new ApiStoreContextEvent(EventTypes.Server.list, {});
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Adds a server definition to the API.
   * @param target The node on which to dispatch the event
   * @param init 
   * @returns The instance of the created server.
   */
  add: async (init: ApiServerInit, target: EventTarget = window): Promise<ApiDefinitions.IApiServer | undefined> => {
    const e = new ApiServerAddEvent(init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads the Server definition from the graph.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the Server to read
   */
  get: async (id: string, target: EventTarget = window): Promise<ApiDefinitions.IApiServer | undefined> => {
    const e = new ApiServerReadEvent(id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
}

Object.freeze(ServerEvents);
