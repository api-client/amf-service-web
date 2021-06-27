/* eslint-disable max-classes-per-file */
import { EventTypes } from './EventTypes.js';

/** @typedef {import('../types').ApiResource} ApiResource */
/** @typedef {import('../types').ParserVendors} ParserVendors */
/** @typedef {import('../types').ParserMediaTypes} ParserMediaTypes */

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

/**
 * An event dispatches to import API data into the store.
 */
export class ApiStoreLoadApiEvent extends CustomEvent {
  /**
   * Loads an API project into the store.
   * @param {ApiResource[]} contents The list of files to process.
   * @param {string} main The name of the main API file.
   * @param {ParserVendors} vendor The vendor of the API.
   * @param {ParserMediaTypes} mediaType The API media type
   */
  constructor(contents, main, vendor, mediaType) {
    super(EventTypes.Store.loadApi, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        contents, main, vendor, mediaType,
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

  /**
   * Import API project into the graph store.
   * @param {EventTarget} target 
   * @param {ApiResource[]} contents The list of files to process.
   * @param {string} main The name of the main API file.
   * @param {ParserVendors} vendor The vendor of the API.
   * @param {ParserMediaTypes} mediaType The API media type
   * @returns {Promise<void>} Resolved when the API is loaded.
   */
  loadApi: async (target, contents, main, vendor, mediaType) => {
    const e = new ApiStoreLoadApiEvent(contents, main, vendor, mediaType);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * @param {EventTarget} target 
   * @returns {Promise<boolean>} True if the store has an API loaded.
   */
  hasApi: async (target) => {
    const e = new CustomEvent(EventTypes.Store.hasApi, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        result: undefined,
      }
    });
    target.dispatchEvent(e);
    return e.detail.result;
  }
};

Object.freeze(StoreEvents);
