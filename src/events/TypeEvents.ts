import { AmfShapes } from '@api-client/core';
import { EventTypes } from './EventTypes.js';
import { ApiStoreContextEvent, ApiStoreCreateEvent, ApiStoreReadEvent, ApiStoreUpdateScalarEvent, ApiStoreDeleteEvent, ApiStoreReadBulkEvent } from './BaseEvents.js';
import { ApiNodeShapeListItem, PropertyShapeInit, ShapeInit } from '../types.js';

/**
 * An event to be used to initialize a new property on a NodeShape.
 */
export class ApiStoreCreatePropertyEvent extends ApiStoreContextEvent<{ init: PropertyShapeInit, parent: string }, AmfShapes.IApiPropertyShape> {
  /**
   * @param parent The domain id of the parent object (NodeShape)
   * @param init The parameter initialization properties.
   */
  constructor(parent: string, init: PropertyShapeInit) {
    super(EventTypes.Type.addProperty, { init, parent });
  }
}

export const TypeEvents = {
  /**
   * Lists the type (schema) definitions for the API.
   * @param target The node on which to dispatch the event
   */
  list: async (target: EventTarget = window): Promise<ApiNodeShapeListItem[] | undefined> => {
    const e = new ApiStoreContextEvent(EventTypes.Type.list, {});
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Adds a new type (schema) object to the graph.
   * @param target The node on which to dispatch the event
   * @param init The initialization properties
   */
  add: async (init: ShapeInit, target: EventTarget = window): Promise<AmfShapes.IShapeUnion | undefined> => {
    const e = new ApiStoreCreateEvent(EventTypes.Type.add, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a type (schema) from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the object to read.
   */
  get: async (id: string, target: EventTarget = window): Promise<AmfShapes.IShapeUnion | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Type.get, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads a list of types (schemas) in a bulk operation.
   * @param target The node on which to dispatch the event
   * @param ids The list of ids to read.
   */
  getBulk: async (ids: string[], target: EventTarget = window): Promise<AmfShapes.IShapeUnion[] | undefined> => {
    const e = new ApiStoreReadBulkEvent(EventTypes.Type.getBulk, ids);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Updates a scalar property of a type (schema).
   * @param target The node on which to dispatch the event
   * @param id The domain id of the object.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update: async (id: string, property: string, value: unknown, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Type.update, id, property, value);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Removes the type (schema) from the graph.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the object object
   */
  delete: async (id: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreDeleteEvent(EventTypes.Type.delete, id);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Creates a new property on a type.
   * @param target The node on which to dispatch the event
   * @param id The id of the type to add the property to.
   * @param init The property initialization configuration.
   */
  addProperty: async (id: string, init: PropertyShapeInit, target: EventTarget = window): Promise<AmfShapes.IApiPropertyShape | undefined> => {
    const e = new ApiStoreCreatePropertyEvent(id, init);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Reads the definition of a property of a NodeShape.
   * @param target The node on which to dispatch the event
   * @param id The id of the object to read.
   */
  getProperty: async (id: string, target: EventTarget = window): Promise<AmfShapes.IApiPropertyShape | undefined> => {
    const e = new ApiStoreReadEvent(EventTypes.Type.getProperty, id);
    target.dispatchEvent(e);
    return e.detail.result;
  },
  /**
   * Removes a property from a node shape.
   * @param target The node on which to dispatch the event
   * @param id The id of the property to remove.
   * @param typeId The domain id of a parent type
   */
  deleteProperty: async (id: string, typeId: string, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreDeleteEvent(EventTypes.Type.deleteProperty, id, typeId);
    target.dispatchEvent(e);
    await e.detail.result;
  },
  /**
   * Updates a scalar property of a property of a NodeShape.
   * @param target The node on which to dispatch the event
   * @param parent The domain id of the parent type.
   * @param id The domain id of the object.
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateProperty: async (parent: string, id: string, property: string, value: unknown, target: EventTarget = window): Promise<void> => {
    const e = new ApiStoreUpdateScalarEvent(EventTypes.Type.updateProperty, id, property, value, parent);
    target.dispatchEvent(e);
    await e.detail.result;
  },
};

Object.freeze(TypeEvents);
