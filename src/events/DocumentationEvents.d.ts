import { ApiDocumentation } from '../types';

declare interface IDocumentationEvents {
  /**
   * Lists the documentation definitions for the API.
   * @param target The node on which to dispatch the event
   * @returns The list of documentations.
   */
  list(target: EventTarget): Promise<ApiDocumentation[]>;
}

export declare const DocumentationEvents: Readonly<IDocumentationEvents>;
