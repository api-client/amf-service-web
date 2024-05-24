import { AmfShapes } from '@api-client/core/build/esm/browser.js';
import { EventTypes } from './EventTypes.js';
import { ApiStoreReadEvent, ApiStoreUpdateScalarEvent, ApiStoreReadBulkEvent } from './BaseEvents.js';

export const ExampleEvents = {
  /**
   * Reads an Example from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the example to read.
   */
  get: async (id: string, target: EventTarget = window): Promise<AmfShapes.IApiDataExample | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Example.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a list of Examples in a bulk operation.
   * @param target The node on which to dispatch the event
   * @param ids The list of ids to read.
   */
  getBulk: async (ids: string[], target: EventTarget = window): Promise<AmfShapes.IApiDataExample[] | undefined> => {
    const e = new ApiStoreReadBulkEvent(EventTypes.Example.getBulk, ids);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a scalar property of an Example.
   * @param id The domain id of the Example.
   * @param property The property name to update
   * @param value The new value to set.
   * @param target The node on which to dispatch the event
   */
  update: async (id: string, property: string, value: unknown, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Example.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
};
Object.freeze(ExampleEvents);
