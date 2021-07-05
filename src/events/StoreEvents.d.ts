import { ApiResource, ParserMediaTypes, ParserVendors } from '../types.js';
import { StoreEventDetailVoid } from './BaseEvents.js';

declare interface ApiStoreLoadGraphEventDetail extends StoreEventDetailVoid {
  model: string;
  vendor: ParserVendors;
}

declare interface ApiStoreLoadApiEventDetail extends StoreEventDetailVoid {
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
  constructor(model: string, vendor: ParserVendors);
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
  constructor(contents: ApiResource[], main: string, vendor: ParserVendors, mediaType: ParserMediaTypes);
}

declare interface IStoreEvents {
  /**
   * @param target The node on which to dispatch the event
   * @returns Resolved when the store is loaded.
   */
  init(target: EventTarget): Promise<void>;
  /**
   * @param target The node on which to dispatch the event
   * @param model The model to load.
   * @param vendor The vendor of the API.
   * @returns Resolved when the model is loaded.
   */
  loadGraph(target: EventTarget, model: string, vendor: ParserVendors): Promise<void>;
  /**
   * Import API project into the graph store.
   * 
   * @param contents The list of files to process.
   * @param main The name of the main API file.
   * @param vendor The vendor of the API.
   * @param mediaType The API media type
   * @returns Resolved when the API is loaded.
   */
  loadApi(target: EventTarget, contents: ApiResource[], main: string, vendor: ParserVendors, mediaType: ParserMediaTypes): Promise<void>;
  /**
   * @param target The node on which to dispatch the event
   * @returns True if the store has an API loaded.
   */
  hasApi(target: EventTarget): Promise<boolean>;
}

export declare const StoreEvents: Readonly<IStoreEvents>;
