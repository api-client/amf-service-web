import { ApiOperation, OperationInit } from '../types.js';
import { StoreEventDetailWithResult } from './BaseEvents.js';

export declare interface ApiStoreOperationCreateEventDetail extends StoreEventDetailWithResult<ApiOperation> {
  /**
   * The initialization properties for the domain object
   */
  init: OperationInit;
  /**
   * The path or domain id of the endpoint that is the parent of the operation.
   */
  pathOrId: string;
}

/**
 * An event to be used to initialize a new object in the API store.
 */
export declare class ApiStoreOperationCreateEvent extends CustomEvent<ApiStoreOperationCreateEventDetail> {
  /**
   * @param pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param init The object initialization properties.
   */
  constructor(pathOrId: string, init: OperationInit);
}

export declare interface ApiStoreOperationReadEventDetail extends StoreEventDetailWithResult<ApiOperation> {
  /**
   * Method name or the domain id of the operation to find
   */
  methodOrId: string;
  /**
   * The path or domain id of the endpoint that is the parent of the operation.
   */
  pathOrId?: string;
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

declare interface IOperationEvents {
  /**
   * Adds a new operation object to the graph.
   * @param target The node on which to dispatch the event
   * @param pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param init The initialization properties
   */
  add(target: EventTarget, pathOrId: string, init: OperationInit): Promise<ApiOperation>;
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
   * Removes the operation from the graph.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the documentation object
   */
  delete(target: EventTarget, id: string): Promise<void>;
}

export declare const OperationEvents: Readonly<IOperationEvents>;
