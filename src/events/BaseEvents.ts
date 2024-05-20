/* eslint-disable max-classes-per-file */
import { ApiDefinitions, AmfShapes } from '@api-client/core';


import { ExampleInit, ParameterInit, PayloadInit } from "../types.js";


/**
 * A base class to use with store events.
 */
export class ApiStoreContextEvent<S extends object, R = undefined> extends CustomEvent<S & ContextEventDetailWithResult<R>> {
  /**
   * @param type The event type
   * @param detail The optional detail object. It adds object's properties to the `detail` with the `result` property.
   */
  constructor(type: string, detail: S) {
    super(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        result: undefined,
        ...detail,
      }
    });
  }
}

/**
 * An event to be used to initialize a new object in the API store.
 */
export class ApiStoreCreateEvent<T, I> extends ApiStoreContextEvent<ApiStoreCreateEventDetail<T, I>> {
  /**
   * @param type The type of the event
   * @param init The object initialization properties.
   */
  constructor(type: string, init: I) {
    super(type, { init });
  }
}

/**
 * An event to be used to read an object from the API store.
 */
export class ApiStoreReadEvent<T> extends ApiStoreContextEvent<ApiStoreReadEventDetail<T>> {
  /**
   * @param type The type of the event
   * @param id The domain id of the object to read
   */
  constructor(type: string, id: string) {
    super(type, { id });
  }
}

/**
 * An event to be used to read a list of object from the API store.
 */
export class ApiStoreReadBulkEvent<T> extends ApiStoreContextEvent<ApiStoreReadBulkEventDetail<T>> {
  /**
   * @param type The type of the event
   * @param ids The list of domain ids to read. These must be of the same domain type.
   */
  constructor(type: string, ids: string[]) {
    super(type, { ids });
  }
}

/**
 * An event to be used to delete an object from the API store.
 */
export class ApiStoreDeleteEvent extends ApiStoreContextEvent<ApiStoreDeleteEventDetail> {
  /**
   * @param type The type of the event
   * @param id The domain id of the object to remove
   * @param parent The domain id of the parent object, if applicable.
   */
  constructor(type: string, id: string, parent?: string) {
    super(type, { id, parent });
  }
}

/**
 * An event to be used to delete an object from the API store.
 */
export class ApiStoreUpdateScalarEvent extends ApiStoreContextEvent<ApiStoreUpdateScalarEventDetail> {
  /**
   * 
   * @param type The type of the event
   * @param id The domain id of the object to remove
   * @param property The name of the scalar property to update
   * @param value The value to set.
   * @param parent Domain parent id, if applicable
   */
  constructor(type: string, id: string, property: string, value: unknown, parent?: string) {
    super(type, { id, property, value, parent });
  }
}

/**
 * An event dispatched when an object in the graph store changed.
 * This event notifies components and the application that something in the graph changed.
 */
export class ApiStoreStateUpdateEvent<T> extends CustomEvent<ApiStoreChangeRecord<T>> {
  /**
   * @param type The event type
   * @param detail The change record
   */
   constructor(type: string, detail: ApiStoreChangeRecord<T>) {
    super(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
    });
  }
}

export class ApiStoreStateDeleteEvent extends CustomEvent<ApiStoreDeleteRecord> {
  /**
   * @param type The event type
   * @param detail The delete record
   */
  constructor(type: string, detail: ApiStoreDeleteRecord) {
    super(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
    });
  }
}

export class ApiStoreStateCreateEvent<T> extends CustomEvent<ApiStoreCreateRecord<T>> {
  /**
   * @param type The event type
   * @param detail The create record
   */
  constructor(type: string, detail: ApiStoreCreateRecord<T>) {
    super(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
    });
  }
}

/**
 * An event to be used to initialize a new header on another object
 */
 export class ApiStoreCreateHeaderEvent extends ApiStoreContextEvent<ApiStoreCreateHeaderEventDetail> {
  /**
   * @param type The type of the event
   * @param parentId The domain id of the parent object (Request/Response)
   * @param init The parameter initialization properties.
   */
  constructor(type: string, parentId: string, init: ParameterInit) {
    super(type, { init, parentId });
  }
}

/**
 * An event to be used to initialize a new payload on another object
 */
export class ApiStoreCreatePayloadEvent extends ApiStoreContextEvent<ApiStoreCreatePayloadEventDetail> {
  /**
   * @param type The type of the event
   * @param parentId The domain id of the parent object (Request/Response)
   * @param init The payload initialization properties.
   */
  constructor(type: string, parentId: string, init: PayloadInit) {
    super(type, { init, parentId });
  }
}

/**
 * An event to be used to initialize a new example on another object
 */
export class ApiStoreCreateExampleEvent extends ApiStoreContextEvent<ApiStoreCreateExampleEventDetail> {
  /**
   * @param type The type of the event
   * @param parentId The domain id of the parent object (Request/Response/Type/Parameter/etc)
   * @param init The example initialization properties.
   */
  constructor(type: string, parentId: string, init: ExampleInit) {
    super(type, { init, parentId });
  }
}

/**
 * Base event detail definition for the events that returns a `result`
 * property on the `detail` object
 */
export interface ContextEventDetailWithResult<T> {
  /**
   * This property is set by the context provider, a promise resolved when the operation finish
   * with the corresponding result.
   */
  result?: Promise<T> | undefined;
}


/**
 * A detail for an event that returns a void result.
 */
export interface StoreEventDetailVoid extends ContextEventDetailWithResult<void> {
}

export interface GraphRecord {
  /**
   * The domain id of the recorded object.
   */
  graphId: string;
  /**
   * The AMF type of the recorded object.
   */
  domainType: string;
  /**
   * When appropriate, the domain id of the parent.
   * This is used, for example, when a parameter of an operation changes to be set as the op id.
   */
  domainParent?: string;
}

export interface TypedGraphRecord<T> extends GraphRecord {
  /**
   * The recorded domain item. This can be used by consumers instantly instead of querying the 
   * graph.
   */
  item: T;
}

export interface ApiStoreChangeRecord<T> extends TypedGraphRecord<T> {
  /**
   * Set when a single property has changed, the name of updated property.
   */
  property?: string;
}

export declare interface ApiStoreDeleteRecord extends GraphRecord {
}

export declare interface ApiStoreCreateRecord<T> extends TypedGraphRecord<T> {
}

export interface ApiStoreCreateEventDetail<T, I> extends ContextEventDetailWithResult<T> {
  /**
   * The initialization properties for the domain object
   */
  init: I;
}

export declare interface ApiStoreCreateHeaderEventDetail extends ApiStoreCreateEventDetail<ApiDefinitions.IApiParameter, ParameterInit> {
  /**
   * The domain id of the parent object (Request/Response)
   */
  parentId: string;
}

export declare interface ApiStoreCreatePayloadEventDetail extends ApiStoreCreateEventDetail<ApiDefinitions.IApiPayload, PayloadInit> {
  /**
   * The domain id of the parent object (Request/Response)
   */
  parentId: string;
}

export declare interface ApiStoreCreateExampleEventDetail extends ApiStoreCreateEventDetail<AmfShapes.IApiDataExample, ExampleInit> {
  /**
   * The domain id of the parent object (Request/Response/Type/Parameter/etc)
   */
  parentId: string;
}

export interface ApiStoreReadEventDetail<T> extends ContextEventDetailWithResult<T> {
  /**
   * The domain id of the domain object to read.
   */
  id: string;
}

export interface ApiStoreReadBulkEventDetail<T> extends ContextEventDetailWithResult<T[]> {
  /**
   * The list of domain ids to read.
   */
  ids: string[];
}

export interface ApiStoreDeleteEventDetail extends ContextEventDetailWithResult<void> {
  /**
   * The domain id of the domain object to remove.
   */
  id: string;
  /**
   * The domain id of the parent object, if applicable.
   */
  parent?: string;
}

export interface ApiStoreUpdateScalarEventDetail extends ContextEventDetailWithResult<void> {
  /**
   * The domain id of the object to change
   */
  id: string;
  /**
   * The name of the scalar property to update
   */
  property: string; 
  /**
   * The value to set.
   */
  value: unknown;
  /**
   * Domain parent id, if applicable
   */
  parent?: string;
}
