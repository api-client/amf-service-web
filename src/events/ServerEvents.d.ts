import { ApiStoreContextEvent } from './BaseEvents.js';
import { ApiServer, ApiServerInit } from '../types';

export declare const idValue: unique symbol;
export declare const initValue: unique symbol;

/**
 * Dispatched to create a server in the API.
 */
export class ApiServerAddEvent extends ApiStoreContextEvent<string> {
  /**
   * @returns Server init definition used to initialize this event.
   */
  get init(): ApiServerInit;
  [initValue]: ApiServerInit;

  /**
   * @param serverInit The server init definition
   */
  constructor(serverInit: ApiServerInit);
}

/**
 * Dispatched to read a sever model from the API.
 */
export class ApiServerReadEvent extends ApiStoreContextEvent<ApiServer> {
  /**
   * The domain id of the server used to initialize this event.
   */
  get id(): string;
  [idValue]: string;

  /**
   * @param id The domain id of the endpoint or its path.
   */
  constructor(id: string);
}

declare interface IServerEvents {
  /**
   * @param target The node on which to dispatch the event
   * @returns The list of servers in this API.
   */
  list(target: EventTarget): Promise<ApiServer[]>;

  /**
   * Adds a server definition to the API.
   * @param target The node on which to dispatch the event
   * @param init 
   * @returns The instance of the created server.
   */
  add(target: EventTarget, init: ApiServerInit): Promise<ApiServer>;
  /**
   * Reads the Server definition from the graph.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the Server to read
   */
  get(target: EventTarget, id: string): Promise<ApiServer>;
}

export declare const ServerEvents: Readonly<IServerEvents>;
