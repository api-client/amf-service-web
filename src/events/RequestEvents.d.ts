import { ApiParameter, ApiPayload, ApiRequest, ApiRequestRecursive, ApiResponse, ParameterInit, PayloadInit } from '../types';
import { ApiStoreCreateEventDetail } from './BaseEvents';

/**
 * An event to be used to initialize a new query parameter to a request
 */
 export declare class ApiStoreCreateQueryParameterEvent extends CustomEvent<ApiStoreCreateParameterEventDetail> {
  /**
   * @param parentId The domain id of the parent request
   * @param init The parameter initialization properties.
   */
  constructor(parentId: string, init: ParameterInit);
}

/**
 * An event to be used to initialize a new cookie parameter to a request
 */
export declare class ApiStoreCreateCookieParameterEvent extends CustomEvent<ApiStoreCreateParameterEventDetail> {
  /**
   * @param parentId The domain id of the parent request
   * @param init The parameter initialization properties.
   */
  constructor(parentId: string, init: ParameterInit);
}

export declare interface ApiStoreCreateParameterEventDetail extends ApiStoreCreateEventDetail<ApiParameter, ParameterInit> {
  /**
   * The domain id of the parent request
   */
  parentId: string;
}

declare interface IRequestEvents {
  /**
   * Reads a Request from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the request to read.
   */
  get(target: EventTarget, id: string): Promise<ApiRequest>;
  /**
   * Reads a Request from the store and returns the full (recursive) model.
   * @param target The node on which to dispatch the event
   * @param id The id of the request to read.
   */
  getRecursive(target: EventTarget, id: string): Promise<ApiRequestRecursive>;
  /**
   * Updates a scalar property of a Request.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the Request.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update(target: EventTarget, id: string, property: string, value: any): Promise<void>;
  /**
   * Adds a new payload to the request object.
   * @param target The node on which to dispatch the event
   * @param requestId The request domain id
   * @param init The Payload init options.
   */
  addPayload(target: EventTarget, requestId: string, init: PayloadInit): Promise<ApiPayload>;
   /**
    * Removes the payload from the request.
    * @param target The node on which to dispatch the event
    * @param payloadId The domain id of the Payload to remove
    * @param requestId The id of the parent request
    */
  removePayload(target: EventTarget, payloadId: string, requestId: string): Promise<void>;
  /**
   * Adds a new header to the request object.
   * @param target The node on which to dispatch the event
   * @param requestId The request domain id
   * @param init The Parameter init options.
   */
  addHeader(target: EventTarget, requestId: string, init: ParameterInit): Promise<ApiParameter>;
  /**
   * Removes the header from the request.
   * @param target The node on which to dispatch the event
   * @param headerId The domain id of the Header to remove
   * @param requestId The id of the parent request
   */
  removeHeader(target: EventTarget, headerId: string, requestId: string): Promise<void>;
  /**
   * Adds a new query parameter to the request object.
   * @param target The node on which to dispatch the event
   * @param requestId The request domain id
   * @param init The Parameter init options.
   */
  addQueryParameter(target: EventTarget, requestId: string, init: ParameterInit): Promise<ApiParameter>;
  /**
   * Removes the query parameter from the request.
   * @param target The node on which to dispatch the event
   * @param paramId The domain id of the query parameter to remove
   * @param requestId The id of the parent request
   */
  removeQueryParameter(target: EventTarget, paramId: string, requestId: string): Promise<void>;
  /**
   * Adds a new cookie parameter to the request object.
   * @param target The node on which to dispatch the event
   * @param requestId The request domain id
   * @param init The Parameter init options.
   */
  addCookieParameter(target: EventTarget, requestId: string, init: ParameterInit): Promise<ApiParameter>;
  /**
   * Removes the cookie parameter from the request.
   * @param target The node on which to dispatch the event
   * @param cookieId The domain id of the cookie parameter to remove
   * @param requestId The id of the parent request
   */
  removeCookieParameter(target: EventTarget, cookieId: string, requestId: string): Promise<void>;
}

export declare const RequestEvents: Readonly<IRequestEvents>;
