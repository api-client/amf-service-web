/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AmfStoreProxy } from '../service/AmfStoreProxy.js';
import { EventTypes } from '../events/EventTypes.js';

export const eventHandler = Symbol('eventHandler');
export const eventsTarget = Symbol('eventsTarget');
export const oldEventsTarget = Symbol('oldEventsTarget');

const eventsMap: Record<string, { target: keyof AmfStoreProxy, args?: string[], eventProperties?: boolean }> = {
  [EventTypes.Store.init]: { target: 'init', },
  [EventTypes.Store.loadGraph]: { args: ['model', 'vendor'], target: 'loadGraph', },
  [EventTypes.Store.loadApi]: { args: ['contents', 'vendor', 'mediaType', 'main'], target: 'loadApi' },
  [EventTypes.Store.hasApi]: { target: 'hasApi' },
  [EventTypes.Api.createWebApi]: { args: ['init'], target: 'createWebApi', eventProperties: true, },
  [EventTypes.Api.get]: { target: 'getApi' },
  [EventTypes.Api.generateRaml]: { target: 'generateRaml' },
  [EventTypes.Api.generateGraph]: { target: 'generateGraph' },
  [EventTypes.Server.get]: { args: ['id'], target: 'getServer', eventProperties: true, },
  [EventTypes.Server.add]: { args: ['init'], target: 'addServer', eventProperties: true, },
  [EventTypes.Server.list]: { target: 'listServers' },
  [EventTypes.Endpoint.add]: { args: ['init'], target: 'addEndpoint', eventProperties: true, },
  [EventTypes.Endpoint.get]: { args: ['pathOrId'], target: 'getEndpoint', eventProperties: true, },
  [EventTypes.Endpoint.update]: { args: ['id', 'property', 'value'], target: 'updateEndpointProperty', eventProperties: true, },
  [EventTypes.Endpoint.delete]: { args: ['id'], target: 'deleteEndpoint', eventProperties: true, },
  [EventTypes.Endpoint.list]: { target: 'listEndpoints', },
  [EventTypes.Endpoint.listWithOperations]: { target: 'listEndpointsWithOperations', },
  [EventTypes.Endpoint.listOperations]: { args: ['pathOrId'], target: 'listOperations', eventProperties: true, },
  [EventTypes.Endpoint.addOperation]: { args: ['pathOrId', 'init'], target: 'addOperation' },
  [EventTypes.Endpoint.removeOperation]: { args: ['id', 'parent'], target: 'deleteOperation' },
  [EventTypes.Operation.get]: { args: ['methodOrId', 'pathOrId'], target: 'getOperation' },
  [EventTypes.Operation.update]: { args: ['id', 'property', 'value'], target: 'updateOperationProperty' },
  [EventTypes.Operation.addRequest]: { args: ['parentId', 'init'], target: 'addRequest' },
  [EventTypes.Operation.removeRequest]: { args: ['id', 'parent'], target: 'deleteRequest' },
  [EventTypes.Operation.addResponse]: { args: ['parentId', 'init'], target: 'addResponse' },
  [EventTypes.Operation.removeResponse]: { args: ['id', 'parent'], target: 'deleteResponse' },
  [EventTypes.Operation.getParent]: { args: ['methodOrId', 'pathOrId'], target: 'getOperationParent' },
  [EventTypes.Documentation.list]: { target: 'listDocumentations' },
  [EventTypes.Documentation.add]: { args: ['init'], target: 'addDocumentation' },
  [EventTypes.Documentation.get]: { args: ['id'], target: 'getDocumentation' },
  [EventTypes.Documentation.update]: { args: ['id', 'property', 'value'], target: 'updateDocumentationProperty' },
  [EventTypes.Documentation.delete]: { args: ['id'], target: 'deleteDocumentation' },
  [EventTypes.Security.get]: { args: ['id'], target: 'getSecurityScheme' },
  [EventTypes.Security.getRequirement]: { args: ['id'], target: 'getSecurityRequirement' },
  [EventTypes.Security.getSettings]: { args: ['id'], target: 'getSecuritySettings' },
  [EventTypes.Security.list]: { target: 'listSecurity' },
  [EventTypes.Type.list]: { target: 'listTypes' },
  [EventTypes.Type.add]: { args: ['init'], target: 'addType' },
  [EventTypes.Type.get]: { args: ['id'], target: 'getType' },
  [EventTypes.Type.getBulk]: { args: ['ids'], target: 'getTypes' },
  [EventTypes.Type.delete]: { args: ['id'], target: 'deleteType' },
  [EventTypes.Type.update]: { args: ['id', 'property', 'value'], target: 'updateTypeProperty' },
  [EventTypes.Type.addProperty]: { args: ['parent', 'init'], target: 'addPropertyShape' },
  [EventTypes.Type.updateProperty]: { args: ['parent', 'id', 'property', 'value'], target: 'updatePropertyShapeProperty' },
  [EventTypes.Type.deleteProperty]: { args: ['parent', 'id'], target: 'deletePropertyShape' },
  [EventTypes.Type.getProperty]: { args: ['id'], target: 'getPropertyShape' },
  [EventTypes.Parameter.get]: { args: ['id'], target: 'getParameter' },
  [EventTypes.Parameter.getBulk]: { args: ['ids'], target: 'getParameters', },
  [EventTypes.Parameter.update]: { args: ['id', 'property', 'value'], target: 'updateParameterProperty', },
  [EventTypes.Parameter.addExample]: { args: ['parentId', 'init'], target: 'addParameterExample', },
  [EventTypes.Parameter.removeExample]: { args: ['parent', 'id'], target: 'removeParameterExample', },
  [EventTypes.Payload.get]: { args: ['id'], target: 'getPayload', },
  [EventTypes.Payload.getBulk]: { args: ['ids'], target: 'getPayloads', },
  [EventTypes.Payload.update]: { args: ['id', 'property', 'value'], target: 'updatePayloadProperty', },
  [EventTypes.Payload.addExample]: { args: ['parentId', 'init'], target: 'addPayloadExample', },
  [EventTypes.Payload.removeExample]: { args: ['parent', 'id'], target: 'removePayloadExample', },
  [EventTypes.Request.get]: { args: ['id'], target: 'getRequest', },
  [EventTypes.Request.update]: { args: ['id', 'property', 'value'], target: 'updateRequestProperty', },
  [EventTypes.Request.addPayload]: { args: ['parentId', 'init'], target: 'addRequestPayload', },
  [EventTypes.Request.removePayload]: { args: ['parent', 'id'], target: 'removeRequestPayload', },
  [EventTypes.Request.addHeader]: { args: ['parentId', 'init'], target: 'addRequestHeader', },
  [EventTypes.Request.removeHeader]: { args: ['parent', 'id'], target: 'removeRequestHeader', },
  [EventTypes.Request.addQueryParameter]: { args: ['parentId', 'init'], target: 'addRequestQueryParameter', },
  [EventTypes.Request.removeQueryParameter]: { args: ['parent', 'id'], target: 'removeRequestQueryParameter', },
  [EventTypes.Request.addCookieParameter]: { args: ['parentId', 'init'], target: 'addRequestCookieParameter', },
  [EventTypes.Request.removeCookieParameter]: { args: ['parent', 'id'], target: 'removeRequestCookieParameter', },
  [EventTypes.Response.get]: { args: ['id'], target: 'getResponse', },
  [EventTypes.Response.getBulk]: { args: ['ids'], target: 'getResponses', },
  [EventTypes.Response.update]: { args: ['id', 'property', 'value'], target: 'updateResponseProperty', },
  [EventTypes.Response.addHeader]: { args: ['parentId', 'init'], target: 'addResponseHeader', },
  [EventTypes.Response.removeHeader]: { args: ['parent', 'id'], target: 'removeResponseHeader', },
  [EventTypes.Response.addPayload]: { args: ['parentId', 'init'], target: 'addResponsePayload', },
  [EventTypes.Response.removePayload]: { args: ['parent', 'id'], target: 'removeResponsePayload', },
  [EventTypes.Example.get]: { args: ['id'], target: 'getExample', },
  [EventTypes.Example.getBulk]: { args: ['ids'], target: 'getExamples', },
  [EventTypes.Example.update]: { args: ['id', 'property', 'value'], target: 'updateExampleProperty', },
  [EventTypes.CustomProperty.add]: { args: ['init'], target: 'addCustomDomainProperty', },
  [EventTypes.CustomProperty.get]: { args: ['id'], target: 'getCustomDomainProperty', },
  [EventTypes.CustomProperty.update]: { args: ['id', 'property', 'value'], target: 'updateCustomDomainProperty', },
  [EventTypes.CustomProperty.list]: { target: 'listCustomDomainProperties', },
  [EventTypes.CustomProperty.delete]: { args: ['id'], target: 'deleteCustomDomainProperty', },
  [EventTypes.CustomProperty.getExtension]: { args: ['id'], target: 'getDomainExtension', },
};

/**
 * A class that register event listeners for the store and calls the function associated 
 * with each event on the passed object.
 * 
 * This mixin adds events listeners for DOM events related to the AMF store.
 * It does not provide implementations for the functions called by each handler.
 * This to be mixed in with an instance of the `WebWorkerService`.
 * 
 * The implementation by default listens on the `window` object.
 * Set `eventsTarget` property to listen to the events on a specific node.
 * 
 * Usage
 * 
 * ```
 * class Abc extends AmfStoreProxy {
 *   constructor() {
 *     super();
 *     this.handler = new StoreDomEventsHandler(this, document.body);
 *     // ...
 *     this.handler.eventsTarget = window;
 *   }
 * 
 *   ...
 * }
 * ```
 * 
 * @mixin
 */
export class StoreDomEventsHandler {
  [eventsTarget]?: EventTarget;
  [oldEventsTarget]?: EventTarget;

  /**
   * The currently registered events target,
   */
  get eventsTarget(): EventTarget | undefined {
    return this[eventsTarget];
  }

  /**
   * By default the element listens on the `window` object. If this value is set,
   * then all events listeners will be attached to this object instead of `window`.
   * @param value Events handlers target.
   */
  set eventsTarget(value: EventTarget | undefined) {
    const old = this[eventsTarget];
    if (old === value) {
      return;
    }
    this[eventsTarget] = value;
    this._eventsTargetChanged(value);
  }

  /**
   * The target class.
   */
  target: InstanceType<typeof AmfStoreProxy>;

  /**
   * @param target The target class that has implemented all functions
   */
  constructor(target: InstanceType<typeof AmfStoreProxy>, eventsTarget: EventTarget = window || globalThis) {
    this.target = target;
    this[eventHandler] = this[eventHandler].bind(this);
    this.eventsTarget = eventsTarget;
  }

  /**
   * Removes old handlers (if any) and attaches listeners on new event
   * event target.
   *
   * @param eventsTarget Event target to set handlers on. If not set it
   * will set handlers on the `window` object.
   */
  _eventsTargetChanged(eventsTarget?: EventTarget): void {
    if (this[oldEventsTarget]) {
      this._detachListeners(this[oldEventsTarget]);
    }
    this[oldEventsTarget] = eventsTarget || window;
    this._attachListeners(this[oldEventsTarget]);
  }

  _attachListeners(node: EventTarget = window): void {
    Object.keys(eventsMap).forEach((type) =>
      node.addEventListener(type, this[eventHandler])
    );
  }

  _detachListeners(node: EventTarget = window): void {
    Object.keys(eventsMap).forEach((type) =>
      node.removeEventListener(type, this[eventHandler])
    );
  }

  [eventHandler](e: Event): void {
    if (e.defaultPrevented) {
      return;
    }
    e.preventDefault();
    const event = e as CustomEvent
    const info = eventsMap[e.type];
    if (!info) {
      // eslint-disable-next-line no-console
      console.warn(`Incorrectly handled event ${e.type}`);
      return;
    }
    const { args, target } = info;
    if (!Array.isArray(args) || !args.length) {
      event.detail.result = (this.target as any)[target]();
    } else {
      const params: any[] = [];
      args.forEach((n) => {
        const value = info.eventProperties ? (event as any)[n] : event.detail[n];
        params.push(value);
      });
      event.detail.result = (this.target as any)[target](...params);
    }
  }
}
