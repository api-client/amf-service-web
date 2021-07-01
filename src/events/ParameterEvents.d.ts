import { ApiParameter, ExampleInit, ApiExample } from '../types';

declare interface IParameterEvents {
  /**
   * Reads a Parameter from the store.
   * @param target The node on which to dispatch the event
   * @param id The id of the Parameter to read.
   */
  get(target: EventTarget, id: string): Promise<ApiParameter>;
  /**
   * Reads a list of Parameters in a bulk operation.
   * @param target The node on which to dispatch the event
   * @param ids The list of ids to read.
   */
  getBulk(target: EventTarget, ids: string[]): Promise<ApiParameter[]>;
  /**
   * Updates a scalar property of a Parameter.
   * @param target The node on which to dispatch the event
   * @param id The domain id of the Parameter.
   * @param property The property name to update
   * @param value The new value to set.
   */
  update(target: EventTarget, id: string, property: string, value: any): Promise<void>;
  /**
   * Adds a new example to the Parameter object.
   * @param target The node on which to dispatch the event
   * @param parameterId The parameter domain id
   * @param init The example init options.
   */
  addExample(target: EventTarget, parameterId: string, init: ExampleInit): Promise<ApiExample>;
  /**
   * Removes the example from the parameter.
   * @param target The node on which to dispatch the event
   * @param exampleId The domain id of the example to remove
   * @param parameterId The parameter domain id
   */
  removeExample(target: EventTarget, exampleId: string, parameterId: string): Promise<void>;
}

export declare const ParameterEvents: Readonly<IParameterEvents>;
