import { ApiDocumentation, DocumentationInit } from '../types';

declare interface IDocumentationEvents {
  /**
   * Lists the documentation definitions for the API.
   * @param target The node on which to dispatch the event
   * @returns The list of documentations.
   */
  list(target: EventTarget): Promise<ApiDocumentation[]>;
  /**
   * Adds a new documentation object to the graph.
   * @param target The node on which to dispatch the event
   * @param init The initialization properties
   */
  add(target: EventTarget, init: DocumentationInit): Promise<ApiDocumentation>;
  /**
   * Reads a documentation from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the document to read.
   */
  get(target: EventTarget, id: string): Promise<ApiDocumentation>;
  /**
   * Updates a scalar property of a documentation.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the documentation.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update(target: EventTarget, id: string, property: string, value: any): Promise<void>;
  /**
   * Removes the documentation from the graph.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the documentation object
   */
  delete(target: EventTarget, id: string): Promise<void>;
}

export declare const DocumentationEvents: Readonly<IDocumentationEvents>;
