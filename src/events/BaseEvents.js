/* eslint-disable max-classes-per-file */

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
