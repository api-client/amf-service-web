import { ApiDefinitions } from '@api-client/core';
import { EventTypes } from './EventTypes.js';
import { ApiStoreReadEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent, ApiStoreCreateHeaderEvent, ApiStoreCreatePayloadEvent, ApiStoreContextEvent, ApiStoreCreateEventDetail } from './BaseEvents.js';
import { ParameterInit, PayloadInit } from '../types.js';

export interface ApiStoreCreateParameterEventDetail extends ApiStoreCreateEventDetail<ApiDefinitions.IApiParameter, ParameterInit> {
  /**
   * The domain id of the parent request
   */
  parentId: string;
}

/**
 * An event to be used to initialize a new query parameter to a request
 */
export class ApiStoreCreateQueryParameterEvent extends ApiStoreContextEvent<ApiStoreCreateParameterEventDetail> {
  /**
   * @param parentId The domain id of the parent request
   * @param init The parameter initialization properties.
   */
  constructor(parentId: string, init: ParameterInit) {
    super(EventTypes.Request.addQueryParameter, { init, parentId });
  }
}

/**
 * An event to be used to initialize a new cookie parameter to a request
 */
export class ApiStoreCreateCookieParameterEvent extends ApiStoreContextEvent<ApiStoreCreateParameterEventDetail> {
  /**
   * @param parentId The domain id of the parent request
   * @param init The parameter initialization properties.
   */
  constructor(parentId: string, init: ParameterInit) {
    super(EventTypes.Request.addCookieParameter, { init, parentId });
  }
}

export const RequestEvents = {
  /**
   * Reads a Request from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the request to read.
   */
  get: async (id: string, target: EventTarget = window): Promise<ApiDefinitions.IApiRequest | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Request.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a Request from the store and returns the full (recursive) model.
   * @param target The node on which to dispatch the event
   * @param id The id of the request to read.
   */
  getRecursive: async (id: string, target: EventTarget = window): Promise<ApiDefinitions.IApiRequest | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Request.getRecursive, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a scalar property of a Request.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the Request.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update: async (id: string, property: string, value: unknown, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Request.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new payload to the request object.
   * @param target The node on which to dispatch the event
   * @param requestId The request domain id
   * @param init The Payload init options.
   */
  addPayload: async (requestId: string, init: PayloadInit, target: EventTarget = window): Promise<ApiDefinitions.IApiPayload | undefined> => {
    const e = new ApiStoreCreatePayloadEvent(EventTypes.Request.addPayload, requestId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the payload from the request.
   * @param target The node on which to dispatch the event
   * @param payloadId The domain id of the Payload to remove
   * @param requestId The id of the parent request
   */
  removePayload: async (payloadId: string, requestId: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreDeleteEvent(EventTypes.Request.removePayload, payloadId, requestId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new header to the request object.
   * @param target The node on which to dispatch the event
   * @param requestId The request domain id
   * @param init The Parameter init options.
   */
  addHeader: async (requestId: string, init: ParameterInit, target: EventTarget = window): Promise<ApiDefinitions.IApiParameter | undefined> => {
    const e = new ApiStoreCreateHeaderEvent(EventTypes.Request.addHeader, requestId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the header from the request.
   * @param target The node on which to dispatch the event
   * @param headerId The domain id of the Header to remove
   * @param requestId The id of the parent request
   */
  removeHeader: async (headerId: string, requestId: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreDeleteEvent(EventTypes.Request.removeHeader, headerId, requestId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new query parameter to the request object.
   * @param target The node on which to dispatch the event
   * @param requestId The request domain id
   * @param init The Parameter init options.
   */
  addQueryParameter: async (requestId: string, init: ParameterInit, target: EventTarget = window): Promise<ApiDefinitions.IApiParameter | undefined> => {
    const e = new ApiStoreCreateQueryParameterEvent(requestId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the query parameter from the request.
   * @param target The node on which to dispatch the event
   * @param paramId The domain id of the query parameter to remove
   * @param requestId The id of the parent request
   */
  removeQueryParameter: async (paramId: string, requestId: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreDeleteEvent(EventTypes.Request.removeQueryParameter, paramId, requestId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new cookie parameter to the request object.
   * @param target The node on which to dispatch the event
   * @param requestId The request domain id
   * @param init The Parameter init options.
   */
  addCookieParameter: async (requestId: string, init: ParameterInit, target: EventTarget = window): Promise<ApiDefinitions.IApiParameter | undefined> => {
    const e = new ApiStoreCreateCookieParameterEvent(requestId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the cookie parameter from the request.
   * @param target The node on which to dispatch the event
   * @param cookieId The domain id of the cookie parameter to remove
   * @param requestId The id of the parent request
   */
  removeCookieParameter: async (cookieId: string, requestId: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreDeleteEvent(EventTypes.Request.removeCookieParameter, cookieId, requestId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
}

Object.freeze(RequestEvents);
