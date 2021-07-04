import { ApiParameter, ApiPayload, ApiResponse, ApiResponseRecursive, ParameterInit, PayloadInit } from '../types';

declare interface IResponseEvents {
  /**
   * Reads a Response from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the Response to read.
   */
  get(target: EventTarget, id: string): Promise<ApiResponse>;
  /**
   * Reads a Response from the store and returns the full (recursive) model.
   * @param target The node on which to dispatch the event
   * @param id The id of the Response to read.
   */
  getRecursive(target: EventTarget, id: string): Promise<ApiResponseRecursive>;
  /**
   * Reads a list of Response in a bulk operation.
   * @param target The node on which to dispatch the event
   * @param ids The list of ids to read.
   */
  getBulk(target: EventTarget, ids: string[]): Promise<ApiResponse[]>;
  /**
   * Reads a list of Response in a bulk operation and returns the full (recursive) model.
   * @param target The node on which to dispatch the event
   * @param ids The list of ids to read.
   */
  getBulkRecursive(target: EventTarget, ids: string[]): Promise<ApiResponseRecursive[]>;
  /**
   * Updates a scalar property of a Response.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the Response.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update(target: EventTarget, id: string, property: string, value: any): Promise<void>;
  /**
   * Adds a new header to the response object.
   * @param target The node on which to dispatch the event
   * @param responseId The response domain id
   * @param init The Parameter init options.
   */
  addHeader(target: EventTarget, responseId: string, init: ParameterInit): Promise<ApiParameter>;
  /**
   * Removes the header from the response.
   * @param target The node on which to dispatch the event
   * @param headerId The domain id of the Header to remove
   * @param responseId The id of the parent response
   */
  removeHeader(target: EventTarget, headerId: string, responseId: string): Promise<void>;
  /**
   * Adds a new payload to the response object.
   * @param target The node on which to dispatch the event
   * @param responseId The response domain id
   * @param init The Payload init options.
   */
  addPayload(target: EventTarget, responseId: string, init: PayloadInit): Promise<ApiPayload>;
  /**
   * Removes the payload from the response.
   * @param target The node on which to dispatch the event
   * @param payloadId The domain id of the Payload to remove
   * @param responseId The id of the parent response
   */
  removePayload(target: EventTarget, payloadId: string, responseId: string): Promise<void>;
}

export declare const ResponseEvents: Readonly<IResponseEvents>;
