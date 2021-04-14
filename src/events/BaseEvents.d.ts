export declare class ApiStoreContextEvent<T> extends CustomEvent<StoreEventDetailWithResult<T>> {
  /**
   * @param type The event type
   * @param detail The optional detail object. It adds object's properties to the `detail` with the `result` property.
   */
  constructor(type: string, detail?: any);
}

/**
 * An event to be used to initialize a new object in the API store.
 */
export class ApiStoreCreateEvent<T, I> extends CustomEvent<ApiStoreCreateEventDetail<T, I>> {
  /**
   * @param type The type of the event
   * @param init The object initialization properties.
   */
  constructor(type: string, init: any);
}

/**
 * An event to be used to read an object from the API store.
 */
export class ApiStoreReadEvent<T> extends CustomEvent<ApiStoreReadEventDetail<T>> {
  /**
   * @param type The type of the event
   * @param id The domain id of the object to read
   */
  constructor(type: string, id: string);
}

/**
 * An event to be used to delete an object from the API store.
 */
export class ApiStoreDeleteEvent extends CustomEvent<ApiStoreDeleteEventDetail> {
  /**
   * @param type The type of the event
   * @param id The domain id of the object to remove
   */
  constructor(type: string, id: string);
}

/**
 * An event to be used to delete an object from the API store.
 */
export class ApiStoreUpdateScalarEvent extends CustomEvent<ApiStoreUpdateScalarEventDetail> {
  /**
   * 
   * @param type The type of the event
   * @param id The domain id of the object to remove
   * @param property The name of the scalar property to update
   * @param value The value to set.
   */
  constructor(type: string, id: string, property: string, value: any);
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
   constructor(type: string, detail: ApiStoreChangeRecord<T>);
}

export class ApiStoreStateDeleteEvent extends CustomEvent<ApiStoreDeleteRecord> {
  /**
   * @param type The event type
   * @param detail The delete record
   */
  constructor(type: string, detail: ApiStoreDeleteRecord);
}

export class ApiStoreStateCreateEvent<T> extends CustomEvent<ApiStoreCreateRecord<T>> {
  /**
   * @param type The event type
   * @param detail The create record
   */
  constructor(type: string, detail: ApiStoreCreateRecord<T>);
}

/**
 * Base event detail definition for the events that returns a `result`
 * property on the `detail` object
 */
export declare interface StoreEventDetailWithResult<T> {
  /**
   * This property is set by the store, a promise resolved when the operation finish
   * with the corresponding result.
   */
  result?: Promise<T> | null;
}

/**
 * A detail for an event that returns a void result.
 */
export declare interface StoreEventDetailVoid extends StoreEventDetailWithResult<void> {
}

export declare interface GraphRecord {
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

export declare interface TypedGraphRecord<T> extends GraphRecord {
  /**
   * The recorded domain item. This can be used by consumers instantly instead of querying the 
   * graph.
   */
  item: T;
}

export declare interface ApiStoreChangeRecord<T> extends TypedGraphRecord<T> {
  /**
   * Set when a single property has changed, the name of updated property.
   */
  property?: string;
}

export declare interface ApiStoreDeleteRecord extends GraphRecord {
}

export declare interface ApiStoreCreateRecord<T> extends TypedGraphRecord<T> {
}

export declare interface ApiStoreCreateEventDetail<T, I> extends StoreEventDetailWithResult<T> {
  /**
   * The initialization properties for the domain object
   */
  init: I;
}

export declare interface ApiStoreReadEventDetail<T> extends StoreEventDetailWithResult<T> {
  /**
   * The domain id of the domain object to read.
   */
  id: string;
}

export declare interface ApiStoreDeleteEventDetail extends StoreEventDetailWithResult<void> {
  /**
   * The domain id of the domain object to remove.
   */
  id: string;
}

export declare interface ApiStoreUpdateScalarEventDetail extends StoreEventDetailWithResult<void> {
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
  value: any;
}
