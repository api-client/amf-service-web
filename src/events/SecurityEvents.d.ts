import { ApiSecurityRequirement, ApiSecurityRequirementRecursive, ApiSecurityScheme, ApiSecuritySchemeListItem, ApiSecuritySchemeRecursive, ApiSecuritySettingsUnion } from '../types';

declare interface ISecurityEvents {
  /**
   * Reads a Security definition from the store.
   * Note, do not use this method to read the definition of a security scheme applied to an endpoint or operation.
   * For that use `getRequirement()` instead.
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  get(target: EventTarget, id: string): Promise<ApiSecurityScheme>;
  /**
   * Reads a Security definition from the store and returns the full (recursive) model.
   * Note, do not use this method to read the definition of a security scheme applied to an endpoint or operation.
   * For that use `getRequirement()` instead.
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  getRecursive(target: EventTarget, id: string): Promise<ApiSecuritySchemeRecursive>;
  /**
   * Reads a security requirement for an endpoint or operation.
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  getRequirement(target: EventTarget, id: string): Promise<ApiSecurityRequirement>;
  /**
   * Reads a security requirement for an endpoint or operation and returns the full (recursive) model.
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  getRequirementRecursive(target: EventTarget, id: string): Promise<ApiSecurityRequirementRecursive>;

  /**
   * Reads a security settings for an endpoint or operation.
   * 
   * @param target The node on which to dispatch the event
   * @param id The id of the Payload to read.
   */
  getSettings(target: EventTarget, id: string): Promise<ApiSecuritySettingsUnion>;

  /**
   * Lists the security definitions for the API.
   * @param target The node on which to dispatch the event
   */
  list(target: EventTarget): Promise<ApiSecuritySchemeListItem[]>;
}

export declare const SecurityEvents: Readonly<ISecurityEvents>;
