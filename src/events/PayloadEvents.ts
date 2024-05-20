import { ApiDefinitions, AmfShapes } from '@api-client/core';
import { EventTypes } from './EventTypes.js';
import { ApiStoreReadEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent, ApiStoreCreateExampleEvent, ApiStoreReadBulkEvent } from './BaseEvents.js';
import { ExampleInit } from '../types.js';

export const PayloadEvents = {
  /**
   * Reads a Payload from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  get: async (id: string, target: EventTarget = window): Promise<ApiDefinitions.IApiPayload | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Payload.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a Payload from the store and returns the full (recursive) model.
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  getRecursive: async (id: string, target: EventTarget = window): Promise<ApiDefinitions.IApiPayload | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Payload.getRecursive, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a list of Payloads in a bulk operation.
   * @param target The node on which to dispatch the event
   * @param ids The list of ids to read.
   */
  getBulk: async (ids: string[], target: EventTarget = window): Promise<ApiDefinitions.IApiPayload[] | undefined> => {
    const e = new ApiStoreReadBulkEvent(EventTypes.Payload.getBulk, ids);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a list of Payloads in a bulk operation and returns the full (recursive) model.
   * @param target The node on which to dispatch the event
   * @param ids The list of ids to read.
   */
  getBulkRecursive: async (ids: string[], target: EventTarget = window): Promise<ApiDefinitions.IApiPayload[] | undefined> => {
    const e = new ApiStoreReadBulkEvent(EventTypes.Payload.getBulkRecursive, ids);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a scalar property of a Payload.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the Payload.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update: async (id: string, property: string, value: unknown, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Payload.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new example to the Payload object.
   * @param target The node on which to dispatch the event
   * @param payloadId The payload domain id
   * @param init The example init options.
   */
  addExample: async (payloadId: string, init: ExampleInit, target: EventTarget = window): Promise<AmfShapes.IApiDataExample | undefined> => {
    const e = new ApiStoreCreateExampleEvent(EventTypes.Payload.addExample, payloadId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the example from the payload.
   * @param target The node on which to dispatch the event
   * @param exampleId The domain id of the example to remove
   * @param payloadId The id of the parent payload
   */
  removeExample: async (exampleId: string, payloadId: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreDeleteEvent(EventTypes.Payload.removeExample, exampleId, payloadId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
}

Object.freeze(PayloadEvents);
