import { ApiEndPoint, ApiOperation, ApiRequest, ApiResponse, OperationInit, OperationRequestInit, OperationResponseInit } from '../types.js';
import { StoreEventDetailWithResult, ApiStoreCreateEventDetail } from './BaseEvents';

declare interface ApiStoreOperationFindEventDetail<T>  extends StoreEventDetailWithResult<T> {
  /**
   * Method name or the domain id of the operation to find
   */
   methodOrId: string;
   /**
    * The path or domain id of the endpoint that is the parent of the operation.
    */
   pathOrId?: string;
}

export declare interface ApiStoreOperationReadEventDetail extends ApiStoreOperationFindEventDetail<ApiOperation> {
}

export declare interface ApiStoreOperationParentReadEventDetail extends ApiStoreOperationFindEventDetail<ApiEndPoint> {
}

/**
 * An event to be used to read an operation from the store.
 */
export declare class ApiStoreOperationReadEvent extends CustomEvent<ApiStoreOperationReadEventDetail> {
  /**
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  constructor(methodOrId: string, pathOrId?: string);
}

/**
 * An event to be used to read an operation parent from the store.
 */
export declare class ApiStoreOperationParentReadEvent extends CustomEvent<ApiStoreOperationParentReadEventDetail> {
  /**
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  constructor(methodOrId: string, pathOrId?: string);
}

/**
 * An event to be used to initialize a new Request on an operation.
 */
export declare class ApiStoreCreateRequestEvent extends CustomEvent<ApiStoreCreateRequestEventDetail> {
  /**
   * @param type The type of the event
   * @param parentId The domain id of the parent operation
   * @param init The Request initialization properties.
   */
  constructor(type: string, parentId: string, init: OperationRequestInit);
}

/**
 * An event to be used to initialize a new Response on an operation.
 */
export declare class ApiStoreCreateResponseEvent extends CustomEvent<ApiStoreCreateResponseEventDetail> {
  /**
   * @param type The type of the event
   * @param parentId The domain id of the parent operation
   * @param init The Response initialization properties.
   */
  constructor(type: string, parentId: string, init: OperationResponseInit);
}

export declare interface ApiStoreCreateRequestEventDetail extends ApiStoreCreateEventDetail<ApiRequest, OperationRequestInit> {
  /**
   * The domain id of the parent operation
   */
  parentId: string;
}

export declare interface ApiStoreCreateResponseEventDetail extends ApiStoreCreateEventDetail<ApiResponse, OperationResponseInit> {
  /**
   * The domain id of the parent operation
   */
  parentId: string;
}


declare interface IOperationEvents {
  /**
   * Reads the operation from the store.
   * @param target The node on which to dispatch the event
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  get(target: EventTarget, methodOrId: string, pathOrId?: string): Promise<ApiOperation>;
  /**
   * Updates a scalar property of the operation.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the documentation.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update(target: EventTarget, id: string, property: string, value: any): Promise<void>;
  /**
   * Adds a new Request to the operation object.
   * @param target The node on which to dispatch the event
   * @param id The operation domain id
   * @param init The Request init options.
   */
  addRequest(target: EventTarget, id: string, init?: OperationRequestInit): Promise<ApiRequest>;
  /**
   * Removes the request from the operation.
   * @param target The node on which to dispatch the event
   * @param requestId The domain id of the Request to remove
   * @param operationId The id of the parent operation
   */
  removeRequest(target: EventTarget, requestId: string, operationId: string): Promise<void>;
  /**
   * Adds a new Response to the operation object.
   * @param target The node on which to dispatch the event
   * @param id The operation domain id
   * @param init The Response init options.
   */
  addResponse(target: EventTarget, id: string, init?: OperationResponseInit): Promise<ApiResponse>;
  /**
   * Removes the response from the operation.
   * @param target The node on which to dispatch the event
   * @param responseId The domain id of the Response to remove
   * @param operationId The id of the parent operation
   */
  removeResponse(target: EventTarget, responseId: string, operationId: string): Promise<void>;
  /**
   * Reads the operation parent from the store.
   * @param target The node on which to dispatch the event
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  getParent(target: EventTarget, methodOrId: string, pathOrId?: string): Promise<ApiEndPoint>;
}

export declare const OperationEvents: Readonly<IOperationEvents>;
