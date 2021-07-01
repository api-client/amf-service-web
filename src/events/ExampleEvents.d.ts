import { ApiExample } from '../types';

declare interface IExampleEvents {
  /**
   * Reads a Example from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the Example to read.
   */
  get(target: EventTarget, id: string): Promise<ApiExample>;
  /**
   * Reads a list of Examples in a bulk operation.
   * @param target The node on which to dispatch the event
   * @param ids The list of ids to read.
   */
  getBulk(target: EventTarget, ids: string[]): Promise<ApiExample[]>;
  /**
   * Updates a scalar property of a Example.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the Example.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update(target: EventTarget, id: string, property: string, value: any): Promise<void>;
}

export declare const ExampleEvents: Readonly<IExampleEvents>;
