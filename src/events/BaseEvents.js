/* eslint-disable max-classes-per-file */

/** @typedef {import('./BaseEvents').ApiStoreChangeRecord} ApiStoreChangeRecord */
/** @typedef {import('./BaseEvents').ApiStoreDeleteRecord} ApiStoreDeleteRecord */
/** @typedef {import('./BaseEvents').ApiStoreCreateRecord} ApiStoreCreateRecord */

/**
 * A base class to use with store events.
 */
export class ApiStoreContextEvent extends CustomEvent {
  /**
   * @param {string} type The event type
   * @param {any=} detail The optional detail object. It adds object's properties to the `detail` with the `result` property.
   */
  constructor(type, detail={}) {
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
export class ApiStoreCreateEvent extends ApiStoreContextEvent {
  /**
   * @param {string} type The type of the event
   * @param {any} init The object initialization properties.
   */
  constructor(type, init) {
    super(type, { init });
  }
}

/**
 * An event to be used to read an object from the API store.
 */
export class ApiStoreReadEvent extends ApiStoreContextEvent {
  /**
   * @param {string} type The type of the event
   * @param {string} id The domain id of the object to read
   */
  constructor(type, id) {
    super(type, { id });
  }
}

/**
 * An event to be used to delete an object from the API store.
 */
export class ApiStoreDeleteEvent extends ApiStoreContextEvent {
  /**
   * @param {string} type The type of the event
   * @param {string} id The domain id of the object to remove
   */
  constructor(type, id) {
    super(type, { id });
  }
}

/**
 * An event to be used to delete an object from the API store.
 */
export class ApiStoreUpdateScalarEvent extends ApiStoreContextEvent {
  /**
   * 
   * @param {string} type The type of the event
   * @param {string} id The domain id of the object to change
   * @param {string} property The name of the scalar property to update
   * @param {any} value The value to set.
   */
  constructor(type, id, property, value) {
    super(type, { id, property, value });
  }
}

/**
 * An event dispatched when an object in the graph store changed.
 * This event notifies components and the application that something in the graph changed.
 */
export class ApiStoreStateUpdateEvent extends CustomEvent {
  /**
   * @param {string} type The event type
   * @param {ApiStoreChangeRecord} detail The change record
   */
   constructor(type, detail) {
    super(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
    });
  }
}

export class ApiStoreStateDeleteEvent extends CustomEvent {
  /**
   * @param {string} type The event type
   * @param {ApiStoreDeleteRecord} detail The delete record
   */
  constructor(type, detail) {
    super(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
    });
  }
}

export class ApiStoreStateCreateEvent extends CustomEvent {
  /**
   * @param {string} type The event type
   * @param {ApiStoreCreateRecord} detail The create record
   */
  constructor(type, detail) {
    super(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
    });
  }
}
