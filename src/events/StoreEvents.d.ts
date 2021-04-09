import { StoreEventDetailVoid } from './BaseEvents.js';

declare interface ApiStoreLoadGraphEventDetail extends StoreEventDetailVoid {
  model: string;
}

/**
 * Dispatched to load a graph model into the store.
 */
export class ApiStoreLoadGraphEvent extends CustomEvent<ApiStoreLoadGraphEventDetail> {
  /**
   * @param model The model to load.
   */
  constructor(model: string);
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
   * @returns Resolved when the model is loaded.
   */
  loadGraph(target: EventTarget, model: string): Promise<void>;
}

export declare const StoreEvents: Readonly<IStoreEvents>;
