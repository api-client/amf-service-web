import { ApiResource, ParserMediaTypes, ParserVendors } from '../types.js';
import { StoreEventDetailVoid } from './BaseEvents.js';
import { EventTypes } from './EventTypes.js';

interface ApiStoreLoadGraphEventDetail extends StoreEventDetailVoid {
  model: string;
  vendor: ParserVendors;
}

interface ApiStoreLoadApiEventDetail extends StoreEventDetailVoid {
  contents: ApiResource[];
  main: string;
  vendor: ParserVendors;
  mediaType: ParserMediaTypes;
}

/**
 * Dispatched to load a graph model into the store.
 */
export class ApiStoreLoadGraphEvent extends CustomEvent<ApiStoreLoadGraphEventDetail> {
  /**
   * @param model The model to load.
   * @param vendor The vendor of the API.
   */
  constructor(model: string, vendor: ParserVendors) {
    super(EventTypes.Store.loadGraph, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        model,
        vendor,
        result: undefined,
      }
    });
  }
}

/**
 * An event dispatches to import API data into the store.
 */
export class ApiStoreLoadApiEvent extends CustomEvent<ApiStoreLoadApiEventDetail> {
  /**
   * Loads an API project into the store.
   * @param contents The list of files to process.
   * @param main The name of the main API file.
   * @param vendor The vendor of the API.
   * @param mediaType The API media type
   */
  constructor(contents: ApiResource[], main: string, vendor: ParserVendors, mediaType: ParserMediaTypes) {
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
   * @param target The node on which to dispatch the event
   * @returns Resolved when the store is loaded.
   */
  init: (target: EventTarget = window): Promise<void> => {
    const e = new CustomEvent(EventTypes.Store.init, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        result: undefined,
      }
    });
    target.dispatchEvent(e);
    return e.detail.result as unknown as Promise<void>;
  },

  /**
   * @param target The node on which to dispatch the event
   * @param model The model to load.
   * @param vendor The vendor of the API.
   * @returns Resolved when the model is loaded.
   */
  loadGraph: async (model: string, vendor: ParserVendors, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreLoadGraphEvent(model, vendor);
    target.dispatchEvent(e);
    return e.detail.result;
  },

  /**
   * Import API project into the graph store.
   * 
   * @param contents The list of files to process.
   * @param main The name of the main API file.
   * @param vendor The vendor of the API.
   * @param mediaType The API media type
   * @returns Resolved when the API is loaded.
   */
  loadApi: async (contents: ApiResource[], main: string, vendor: ParserVendors, mediaType: ParserMediaTypes, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreLoadApiEvent(contents, main, vendor, mediaType);
    target.dispatchEvent(e);
    await e.detail.result;
  },

  /**
   * @param target The node on which to dispatch the event
   * @returns True if the store has an API loaded.
   */
  hasApi: async (target: EventTarget = window): Promise<boolean | undefined> => {
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
