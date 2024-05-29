import { AmfShapes, ApiDefinitions } from '@api-client/core/build/esm/browser.js';
import { EventTypes } from './EventTypes.js';
import { ApiStoreReadEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent, ApiStoreCreateExampleEvent, ApiStoreReadBulkEvent } from './BaseEvents.js';
import { ExampleInit } from '../types.js';

export const ParameterEvents = {
  /**
   * Reads a Parameter from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the parameter to read.
   */
  get: async (id: string, target: EventTarget = window): Promise<ApiDefinitions.IApiParameter | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Parameter.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Reads a list of Parameters in a bulk operation.
   * @param target The node on which to dispatch the event
   * @param ids The list of ids to read.
   */
  getBulk: async (ids: string[], target: EventTarget = window): Promise<ApiDefinitions.IApiParameter[] | undefined> => {
    const e = new ApiStoreReadBulkEvent(EventTypes.Parameter.getBulk, ids);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Updates a scalar property of a Parameter.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the Parameter.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update: async (id: string, property: string, value: unknown, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Parameter.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Adds a new example to the Parameter object.
   * @param target The node on which to dispatch the event
   * @param parameterId The parameter domain id
   * @param init The example init options.
   */
  addExample: async (parameterId: string, init: ExampleInit, target: EventTarget = window): Promise<AmfShapes.IApiDataExample | undefined> => {
    const e = new ApiStoreCreateExampleEvent(EventTypes.Parameter.addExample, parameterId, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes the example from the Parameter.
   * @param target The node on which to dispatch the event
   * @param exampleId The domain id of the example to remove
   * @param parameterId The id of the parent parameter
   */
  removeExample: async (exampleId: string, parameterId: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreDeleteEvent(EventTypes.Parameter.removeExample, exampleId, parameterId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
};
Object.freeze(ParameterEvents);
