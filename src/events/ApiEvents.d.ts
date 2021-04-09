import { ApiInit, SerializedApi } from '../types';
import { ApiStoreContextEvent } from './BaseEvents';

export declare const initValue: unique symbol;

/**
 * Dispatched to create a WebApi in the store.
 */
export class ApiCreateEvent extends ApiStoreContextEvent<string> {
  /**
   * Api init options used to initialize this event.
   */
  get init(): ApiInit|undefined

  /**
   * @param type The event type to differentiate Async from web APIs.
   * @param apiInit The API init options
   */
  constructor(type: string, apiInit?: ApiInit);
}

declare interface IApiEvents {
  /**
   * Creates a new WebApi.
   * @param target The node on which to dispatch the event
   * @returns The domain id of the created WebAPI
   */
  createWebApi(target: EventTarget, init?: ApiInit): Promise<string>;
  /**
   * Generates RAML spec file from the current graph.
   * @param target The node on which to dispatch the event
   * @returns RAML value for the API.
   */
  generateRaml(target: EventTarget): Promise<string>;
  /**
   * Generates json+ld from the current graph.
   * @param target The node on which to dispatch the event
   * @returns JSON+ld value of the API.
   */
  generateGraph(target: EventTarget): Promise<string>;
  /**
   * Reads basic info about the API.
   * @param target The node on which to dispatch the event
   */
  get(target: EventTarget): Promise<SerializedApi>;
}

export declare const ApiEvents: Readonly<IApiEvents>;
