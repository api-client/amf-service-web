import { ApiDefinitions } from '@api-client/core/build/esm/browser.js';
import { EventTypes } from './EventTypes.js';
import { ApiStoreReadEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent, ApiStoreCreateHeaderEvent, ApiStoreCreatePayloadEvent, ApiStoreReadBulkEvent } from './BaseEvents.js';
import { ParameterInit, PayloadInit } from '../types.js';

export const ResponseEvents = {
  /**
   * Reads a Response from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the response to read.
   */
  get: async (id: string, target: EventTarget = window): Promise<ApiDefinitions.IApiResponse | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Response.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Reads a list of Response in a bulk operation.
   * @param target The node on which to dispatch the event
   * @param ids The list of ids to read.
   */
  getBulk: async (ids: string[], target: EventTarget = window): Promise<ApiDefinitions.IApiResponse[] | undefined> => {
    const e = new ApiStoreReadBulkEvent(EventTypes.Response.getBulk, ids);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Updates a scalar property of a Response.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the Response.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update: async (id: string, property: string, value: unknown, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Response.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new header to the response object.
   * @param target The node on which to dispatch the event
   * @param responseId The response domain id
   * @param init The Parameter init options.
   */
  addHeader: async (responseId: string, init: ParameterInit, target: EventTarget = window): Promise<ApiDefinitions.IApiParameter | undefined> => {
    const e = new ApiStoreCreateHeaderEvent(EventTypes.Response.addHeader, responseId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the header from the response.
   * @param target The node on which to dispatch the event
   * @param headerId The domain id of the Header to remove
   * @param responseId The id of the parent response
   */
  removeHeader: async (headerId: string, responseId: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreDeleteEvent(EventTypes.Response.removeHeader, headerId, responseId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new payload to the response object.
   * @param responseId The response domain id
   * @param init The Payload init options.
   * @param target The node on which to dispatch the event
   */
  addPayload: async (responseId: string, init: PayloadInit, target: EventTarget = window): Promise<ApiDefinitions.IApiPayload | undefined> => {
    const e = new ApiStoreCreatePayloadEvent(EventTypes.Response.addPayload, responseId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the payload from the response.
   * @param target The node on which to dispatch the event
   * @param payloadId The domain id of the Payload to remove
   * @param responseId The id of the parent response
   */
  removePayload: async (payloadId: string, responseId: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreDeleteEvent(EventTypes.Response.removePayload, payloadId, responseId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
}

Object.freeze(ResponseEvents);
