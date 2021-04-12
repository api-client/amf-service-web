import { ApiNodeShapeListItem } from '../types';

declare interface ITypeEvents {
  /**
   * Lists the type (schema) definitions for the API.
   * @param target The node on which to dispatch the event
   */
  list(target: EventTarget): Promise<ApiNodeShapeListItem[]>;
}

export declare const TypeEvents: Readonly<ITypeEvents>;
