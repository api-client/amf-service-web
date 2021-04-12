import { ApiSecuritySchemeListItem } from '../types';

declare interface ISecurityEvents {
  /**
   * Lists the security definitions for the API.
   * @param target The node on which to dispatch the event
   */
  list(target: EventTarget): Promise<ApiSecuritySchemeListItem[]>;
}

export declare const SecurityEvents: Readonly<ISecurityEvents>;
