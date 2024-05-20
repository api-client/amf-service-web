/* eslint-disable max-classes-per-file */
import { ApiDefinitions } from '@api-client/core';
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent } from './BaseEvents.js';
import { ApiInit } from '../types.js';

export const initValue = Symbol('initValue');

/**
 * Dispatched to create a WebApi in the store.
 */
export class ApiCreateEvent extends ApiStoreContextEvent<object, string> {
  [initValue]?: ApiInit;
  /**
   * THe api init options used to initialize this event.
   */
  get init(): ApiInit | undefined {
    return this[initValue];
  }

  /**
   * @param type The event type to differentiate Async from web APIs.
   * @param apiInit The API init options
   */
  constructor(type: string, apiInit?: ApiInit) {
    super(type, {});
    this[initValue] = Object.freeze({ ...apiInit });
  }
}

export const ApiEvents = {
  /**
   * Creates a new WebApi.
   * @param init Api init options
   * @param target The node on which to dispatch the event
   * @returns The domain id of the created WebAPI
   */
  createWebApi: async (init?: ApiInit, target: EventTarget = window): Promise<string | undefined> => {
    const e = new ApiCreateEvent(EventTypes.Api.createWebApi, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Generates RAML spec file from the current graph.
   * @param target The node on which to dispatch the event
   * @returns RAML value for the API.
   */
  generateRaml: async (target: EventTarget = window): Promise<string | undefined> => {
    const e = new ApiStoreContextEvent(EventTypes.Api.generateRaml, {});
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Generates json+ld from the current graph.
   * @param target The node on which to dispatch the event
   * @returns JSON+ld value of the API.
   */
  generateGraph: async (target: EventTarget = window): Promise<string | undefined> => {
    const e = new ApiStoreContextEvent(EventTypes.Api.generateGraph, {});
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads basic info about the API.
   * @param target The node on which to dispatch the event
   */
  get: async (target: EventTarget = window): Promise<ApiDefinitions.IApiBase | undefined> => {
    const e = new ApiStoreContextEvent<object, ApiDefinitions.IApiBase>(EventTypes.Api.get, {});
    target.dispatchEvent(e);
    return e.detail.result;
  },
}
Object.freeze(ApiEvents);
