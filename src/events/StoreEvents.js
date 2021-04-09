import { EventTypes } from './EventTypes.js';

/**
 * Dispatched to load a graph model into the store.
 */
export class ApiStoreLoadGraphEvent extends CustomEvent {
  /**
   * @param {string} model The model to load.
   */
  constructor(model) {
    super(EventTypes.Store.loadGraph, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        model,
        result: undefined,
      }
    });
  }
}

export const StoreEvents = {
  /**
   * @param {EventTarget} target The node on which to dispatch the event
   * @returns {Promise<void>} Resolved when the store is loaded.
   */
  init: async (target) => {
    const e = new CustomEvent(EventTypes.Store.init, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        result: undefined,
      }
    });
    target.dispatchEvent(e);
    await e.detail.result;
  },

  /**
   * @param {EventTarget} target The node on which to dispatch the event
   * @param {string} model The model to load.
   * @returns {Promise<void>} Resolved when the model is loaded.
   */
  loadGraph: async (target, model) => {
    const e = new ApiStoreLoadGraphEvent(model);
    target.dispatchEvent(e);
    return e.detail.result;
  },
};

Object.freeze(StoreEvents);
