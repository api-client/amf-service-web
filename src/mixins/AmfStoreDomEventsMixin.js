/* eslint-disable class-methods-use-this */
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { EventsTargetMixin } from  '@advanced-rest-client/events-target-mixin';
import { EventTypes } from '../events/EventTypes.js';

/** @typedef {import('../AmfStoreProxy').AmfStoreProxy} AmfStoreProxy */
/** @typedef {import('../AmfService').AmfService} AmfService */

export const eventHandler = Symbol('eventHandler');

/**
 * @type {Record<string, { target: string, args?: string[], eventProperties?: boolean }>}
 */
const eventsMap = {
  [EventTypes.Store.init]: { target: 'init', },
  [EventTypes.Store.loadGraph]: { args: ['model'], target: 'loadGraph', },
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
  [EventTypes.Operation.getRecursive]: { args: ['methodOrId', 'pathOrId'], target: 'getOperationRecursive' },
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
  [EventTypes.Parameter.getRecursive]: { args: ['id'], target: 'getParameterRecursive', },
  [EventTypes.Parameter.getBulk]: { args: ['ids'], target: 'getParameters', },
  [EventTypes.Parameter.getBulkRecursive]: { args: ['ids'], target: 'getParametersRecursive', },
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
 * @param {*} base
 */
const mxFunction = base => {
  class AmfStoreDomEventsMixin extends EventsTargetMixin(base) {
    /**
     * @param {...any} args Base class arguments
     */
    constructor(...args) {
      super(...args);
      this[eventHandler] = this[eventHandler].bind(this);
    }

    /**
     * @param {EventTarget} node
     */
    _attachListeners(node) {
      super._attachListeners(node);
      Object.keys(eventsMap).forEach(type => node.addEventListener(type, this[eventHandler]));
    }

    /**
     * @param {EventTarget} node
     */
    _detachListeners(node) {
      super._detachListeners(node);
      Object.keys(eventsMap).forEach(type => node.removeEventListener(type, this[eventHandler]));
    }

    /**
     * @param {CustomEvent} e 
     */
    [eventHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const info = eventsMap[e.type];
      if (!info) {
        // eslint-disable-next-line no-console
        console.warn(`Incorrectly handled event ${e.type}`);
        return;
      }
      const { args, target } = info;
      if (!Array.isArray(args) || !args.length) {
        e.detail.result = this[target]();
      } else {
        const params = [];
        args.forEach(n => {
          const value = info.eventProperties ? e[n] : e.detail[n];
          params.push(value);
        });
        e.detail.result = this[target](...params);
      }
    }
  }
  return AmfStoreDomEventsMixin;
}

/**
 * This mixin adds events listeners for DOM events related to the AMF store.
 * It does not provide implementations for the functions called by each handler.
 * This to be mixed in with an instance of the `AmfStoreService`.
 * 
 * The implementation by default listens on the `window` object.
 * Set `eventsTarget` property to listen to the events on a specific node.
 * 
 * @mixin
 */
export const AmfStoreDomEventsMixin = dedupeMixin(mxFunction);
