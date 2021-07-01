import { ApiPayload, ExampleInit, ApiExample } from '../types';

declare interface IPayloadEvents {
  /**
   * Reads a Payload from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  get(target: EventTarget, id: string): Promise<ApiPayload>;
  /**
   * Reads a list of Payloads in a bulk operation.
   * @param target The node on which to dispatch the event
   * @param ids The list of ids to read.
   */
  getBulk(target: EventTarget, ids: string[]): Promise<ApiPayload[]>;
  /**
   * Updates a scalar property of a ApiPayload.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the ApiPayload.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update(target: EventTarget, id: string, property: string, value: any): Promise<void>;
  /**
   * Adds a new example to the Payload object.
   * @param target The node on which to dispatch the event
   * @param payloadId The payload domain id
   * @param init The example init options.
   */
  addExample(target: EventTarget, payloadId: string, init: ExampleInit): Promise<ApiExample>;
  /**
   * Removes the example from the payload.
   * @param target The node on which to dispatch the event
   * @param exampleId The domain id of the example to remove
   * @param payloadId The id of the parent payload
   */
  removeExample(target: EventTarget, exampleId: string, payloadId: string): Promise<void>;
}

export declare const PayloadEvents: Readonly<IPayloadEvents>;
