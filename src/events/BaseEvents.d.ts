/**
 * Base event detail definition for the events that returns a `result`
 * property on the `detail` object
 */
export declare interface StoreEventDetailWithResult<T> {
  /**
   * This property is set by the store, a promise resolved when the operation finish
   * with the corresponding result.
   */
  result?: Promise<T>|null;
}


/**
 * A detail for an event that returns a void result.
 */
export declare interface StoreEventDetailVoid extends StoreEventDetailWithResult<void> {
}

export declare class ApiStoreContextEvent<T> extends CustomEvent<StoreEventDetailWithResult<T>> {
  /**
   * @param type The event type
   * @param detail The optional detail object. It adds object's properties to the `detail` with the `result` property.
   */
  constructor(type: string, detail?: any);
}
