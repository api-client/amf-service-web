import { ApiCustomDomainProperty, ApiCustomDomainPropertyListItem, ApiDomainExtension, CustomDomainPropertyInit } from '../types.js';

declare interface ICustomPropertyEvents {
  /**
   * Lists the custom domain properties (domain extensions, annotations) definitions for the API.
   * @param target The node on which to dispatch the event
   */
  list(target: EventTarget): Promise<ApiCustomDomainPropertyListItem[]>;
  /**
   * Adds a new type (schema) object to the graph.
   * @param target The node on which to dispatch the event
   * @param init The initialization properties
   */
  add(target: EventTarget, init?: CustomDomainPropertyInit): Promise<ApiCustomDomainProperty>;
  /**
   * Reads the CustomDomainProperty object from the graph.
   * This is a definition of domain extension (RAML annotation).
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the object to read.
   */
  get(target: EventTarget, id: string): Promise<ApiCustomDomainProperty>;
  /**
   * Updates a CustomDomainProperty object from the graph.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the object.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update(target: EventTarget, id: string, property: string, value: any): Promise<void>;
  /**
   * Reads the DomainExtension object from the graph.
   * This is a definition of applied to an object domain extension (RAML annotation).
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the object to read.
   */
  getExtension(target: EventTarget, id: string): Promise<ApiDomainExtension>;
  /**
   * Removes the CustomDomainProperty from the graph.
   * This is a definition of domain extension (RAML annotation), not it's implementation.
   * 
   * @param target The node on which to dispatch the event
   * @param id The domain id of the object object
   */
  delete(target: EventTarget, id: string): Promise<void>;
}

export declare const CustomPropertyEvents: Readonly<ICustomPropertyEvents>;
