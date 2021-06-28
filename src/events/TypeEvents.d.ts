import AMF from 'amf-client-js';
import { ApiNodeShapeListItem, ApiPropertyShape, ApiShapeUnion, PropertyShapeInit, ShapeInit } from '../types';
import { ApiStoreContextEvent } from './BaseEvents';

/**
 * An event to be used to initialize a new property on a NodeShape.
 */
export declare class ApiStoreCreatePropertyEvent extends ApiStoreContextEvent<ApiPropertyShape> {
  /**
   * @param parent The domain id of the parent object (NodeShape)
   * @param init The parameter initialization properties.
   */
  constructor(parent: string, init: PropertyShapeInit);
}

declare interface ITypeEvents {
  /**
   * Lists the type (schema) definitions for the API.
   * @param target The node on which to dispatch the event
   */
  list(target: EventTarget): Promise<ApiNodeShapeListItem[]>;
  /**
   * Adds a new type (schema) object to the graph.
   * @param target The node on which to dispatch the event
   * @param init The initialization properties
   */
  add(target: EventTarget, init?: ShapeInit): Promise<ApiShapeUnion>;
  /**
   * Reads a type (schema) from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the object to read.
   */
  get(target: EventTarget, id: string): Promise<ApiShapeUnion>;
  /**
   * Updates a scalar property of a type (schema).
   * @param target The node on which to dispatch the event
   * @param id The domain id of the object.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update(target: EventTarget, id: string, property: string, value: any): Promise<void>;
  /**
   * Removes the type (schema) from the graph.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the object object
   */
  delete(target: EventTarget, id: string): Promise<void>;
  /**
   * Creates a new property on a type.
   * @param target The node on which to dispatch the event
   * @param id The id of the type to add the property to.
   * @param init The property initialization configuration.
   */
  addProperty(target: EventTarget, id: string, init: PropertyShapeInit): Promise<ApiPropertyShape>;
  /**
   * Reads the definition of a property of a NodeShape.
   * @param target The node on which to dispatch the event
   * @param id The id of the object to read.
   */
  getProperty(target: EventTarget, id: string): Promise<ApiPropertyShape>;
  /**
   * Removes a property from a node shape.
   * @param target The node on which to dispatch the event
   * @param id The id of the property to remove.
   * @param typeId The domain id of a parent type
   */
  deleteProperty(target: EventTarget, id: string, typeId: string): Promise<void>;
  /**
   * Updates a scalar property of a property of a NodeShape.
   * @param target The node on which to dispatch the event
   * @param parent The domain id of the parent type.
   * @param id The domain id of the object.
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateProperty(target: EventTarget, parent: string, id: string, property: keyof AMF.model.domain.PropertyShape, value: any): Promise<void>;
}

export declare const TypeEvents: Readonly<ITypeEvents>;
