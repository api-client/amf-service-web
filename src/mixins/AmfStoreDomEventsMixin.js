/* eslint-disable class-methods-use-this */
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { EventsTargetMixin } from  '@advanced-rest-client/events-target-mixin';
import { EventTypes } from '../events/EventTypes.js';

/** @typedef {import('../AmfStoreProxy').AmfStoreProxy} AmfStoreProxy */
/** @typedef {import('../events/StoreEvents').ApiStoreLoadGraphEvent} ApiStoreLoadGraphEvent */
/** @typedef {import('../events/StoreEvents').ApiStoreLoadApiEvent} ApiStoreLoadApiEvent */
/** @typedef {import('../events/EndpointEvents').ApiStoreEndpointListOperationsEvent} ApiStoreEndpointListOperationsEvent */
/** @typedef {import('../events/EndpointEvents').ApiStoreEndpointAddEvent} ApiStoreEndpointAddEvent */
/** @typedef {import('../events/EndpointEvents').ApiStoreEndpointDeleteEvent} ApiStoreEndpointDeleteEvent */
/** @typedef {import('../events/EndpointEvents').ApiStoreEndpointReadEvent} ApiStoreEndpointReadEvent */
/** @typedef {import('../events/EndpointEvents').ApiStoreEndpointUpdateEvent} ApiStoreEndpointUpdateEvent */
/** @typedef {import('../events/EndpointEvents').ApiStoreOperationCreateEvent} ApiStoreOperationCreateEvent */
/** @typedef {import('../events/OperationEvents').ApiStoreOperationReadEvent} ApiStoreOperationReadEvent */
/** @typedef {import('../events/OperationEvents').ApiStoreOperationParentReadEvent} ApiStoreOperationParentReadEvent */
/** @typedef {import('../events/OperationEvents').ApiStoreCreateRequestEvent} ApiStoreCreateRequestEvent */
/** @typedef {import('../events/OperationEvents').ApiStoreCreateResponseEvent} ApiStoreCreateResponseEvent */
/** @typedef {import('../events/BaseEvents').ApiStoreContextEvent} ApiStoreContextEvent */
/** @typedef {import('../events/BaseEvents').ApiStoreCreateEvent} ApiStoreCreateEvent */
/** @typedef {import('../events/BaseEvents').ApiStoreDeleteEvent} ApiStoreDeleteEvent */
/** @typedef {import('../events/BaseEvents').ApiStoreUpdateScalarEvent} ApiStoreUpdateScalarEvent */
/** @typedef {import('../events/BaseEvents').ApiStoreReadEvent} ApiStoreReadEvent */
/** @typedef {import('../events/BaseEvents').ApiStoreCreateExampleEvent} ApiStoreCreateExampleEvent */
/** @typedef {import('../events/BaseEvents').ApiStoreCreatePayloadEvent} ApiStoreCreatePayloadEvent */
/** @typedef {import('../events/BaseEvents').ApiStoreCreateHeaderEvent} ApiStoreCreateHeaderEvent */
/** @typedef {import('../events/BaseEvents').ApiStoreReadBulkEvent} ApiStoreReadBulkEvent */
/** @typedef {import('../events/ApiEvents').ApiCreateEvent} ApiCreateEvent */
/** @typedef {import('../events/ServerEvents').ApiServerReadEvent} ApiServerReadEvent */
/** @typedef {import('../events/ServerEvents').ApiServerAddEvent} ApiServerAddEvent */
/** @typedef {import('../events/RequestEvents').ApiStoreCreateQueryParameterEvent} ApiStoreCreateQueryParameterEvent */
/** @typedef {import('../events/RequestEvents').ApiStoreCreateCookieParameterEvent} ApiStoreCreateCookieParameterEvent */

export const initHandler = Symbol('initHandler');
export const loadGraphHandler = Symbol('loadGraphHandler');
export const loadApiHandler = Symbol('loadApiHandler');
export const hasApiHandler = Symbol('hasApiHandler');
export const endpointListHandler = Symbol('endpointListHandler');
export const endpointListWithOperationsHandler = Symbol('endpointListWithOperationsHandler');
export const endpointListOperationsHandler = Symbol('listOperationsHandler');
export const endpointAddHandler = Symbol('endpointAddHandler');
export const endpointDeleteHandler = Symbol('endpointDeleteHandler');
export const endpointGetHandler = Symbol('endpointGetHandler');
export const endpointUpdateHandler = Symbol('endpointUpdateHandler');
export const createWebApiHandler = Symbol('createWebApiHandler');
export const generateRamlHandler = Symbol('generateRamlHandler');
export const generateGraphHandler = Symbol('generateGraphHandler');
export const apiGetHandler = Symbol('apiGetHandler');
export const serverGetHandler = Symbol('serverGetHandler');
export const serverAddHandler = Symbol('serverAddHandler');
export const serverListHandler = Symbol('serverListHandler');
export const documentationListHandler = Symbol('documentationListHandler');
export const readSecurityHandler = Symbol('readSecurityHandler');
export const readSecurityRequirementHandler = Symbol('readSecurityRequirementHandler');
export const readSecuritySettingsHandler = Symbol('readSecuritySettingsHandler');
export const securityListHandler = Symbol('securityListHandler');
export const typeListHandler = Symbol('typeListHandler');
export const addTypeHandler = Symbol('addTypeHandler');
export const readTypeHandler = Symbol('readTypeHandler');
export const readTypeBulkHandler = Symbol('readTypeBulkHandler');
export const updateTypeHandler = Symbol('updateTypeHandler');
export const deleteTypeHandler = Symbol('deleteTypeHandler');
export const addDocumentationHandler = Symbol('addDocumentationHandler');
export const readDocumentationHandler = Symbol('readDocumentationHandler');
export const updateDocumentationHandler = Symbol('updateDocumentationHandler');
export const deleteDocumentationHandler = Symbol('deleteDocumentationHandler');
export const addOperationHandler = Symbol('addOperationHandler');
export const readOperationHandler = Symbol('readOperationHandler');
export const updateOperationHandler = Symbol('updateOperationHandler');
export const deleteOperationHandler = Symbol('deleteOperationHandler');
export const readOperationParentHandler = Symbol('readOperationParentHandler');
export const addRequestHandler = Symbol('addRequestHandler');
export const removeRequestHandler = Symbol('removeRequestHandler');
export const addResponseHandler = Symbol('addResponseHandler');
export const removeResponseHandler = Symbol('removeResponseHandler');
export const readParameterHandler = Symbol('readParameterHandler');
export const readParameterBulkHandler = Symbol('readParameterBulkHandler');
export const updateParameterHandler = Symbol('updateParameterHandler');
export const addParameterExampleHandler = Symbol('addParameterExampleHandler');
export const removeParameterExampleHandler = Symbol('removeParameterExampleHandler');
export const readPayloadHandler = Symbol('readPayloadHandler');
export const readPayloadBulkHandler = Symbol('readPayloadBulkHandler');
export const updatePayloadHandler = Symbol('updatePayloadHandler');
export const addPayloadExampleHandler = Symbol('addPayloadExampleHandler');
export const removePayloadExampleHandler = Symbol('removePayloadExampleHandler');
export const readRequestHandler = Symbol('readRequestHandler');
export const updateRequestHandler = Symbol('updateRequestHandler');
export const addRequestPayloadHandler = Symbol('addRequestPayloadHandler');
export const removeRequestPayloadHandler = Symbol('removeRequestPayloadHandler');
export const addRequestHeaderHandler = Symbol('addRequestHeaderHandler');
export const removeRequestHeaderHandler = Symbol('removeRequestHeaderHandler');
export const addRequestQueryParameterHandler = Symbol('addRequestQueryParameterHandler');
export const removeRequestQueryParameterHandler = Symbol('removeRequestQueryParameterHandler');
export const addRequestCookieParameterHandler = Symbol('addRequestCookieParameterHandler');
export const removeRequestCookieParameterHandler = Symbol('removeRequestCookieParameterHandler');
export const readResponseHandler = Symbol('readResponseHandler');
export const readResponseBatchHandler = Symbol('readResponseBatchHandler');
export const updateResponseHandler = Symbol('updateResponseHandler');
export const addResponseHeaderHandler = Symbol('addResponseHeaderHandler');
export const removeResponseHeaderHandler = Symbol('removeResponseHeaderHandler');
export const addResponsePayloadHandler = Symbol('addResponsePayloadHandler');
export const removeResponsePayloadHandler = Symbol('removeResponsePayloadHandler');
export const readExampleHandler = Symbol('readExampleHandler');
export const readExampleBulkHandler = Symbol('readExampleBulkHandler');
export const updateExampleHandler = Symbol('updateExampleHandler');
export const customDomainPropertyListHandler = Symbol('customDomainPropertyListHandler');
export const customDomainPropertyAddHandler = Symbol('customDomainPropertyAddHandler');
export const customDomainPropertyGetHandler = Symbol('customDomainPropertyGetHandler');
export const customDomainPropertyUpdateHandler = Symbol('customDomainPropertyUpdateHandler');
export const customDomainPropertyDeleteHandler = Symbol('customDomainPropertyDeleteHandler');
export const domainExtensionGetHandler = Symbol('domainExtensionGetHandler');
export const propertyShapeGetHandler = Symbol('propertyShapeGetHandler');
export const propertyShapeAddHandler = Symbol('propertyShapeAddHandler');
export const propertyShapeDeleteHandler = Symbol('propertyShapeDeleteHandler');
export const propertyShapeUpdateHandler = Symbol('propertyShapeUpdateHandler');

/**
 * @param {AmfStoreProxy} base
 */
const mxFunction = base => {
  class AmfStoreDomEventsMixin extends EventsTargetMixin(base) {
    /**
     * @param {...any} args Base class arguments
     */
    constructor(...args) {
      super(...args);
      this[initHandler] = this[initHandler].bind(this);
      this[loadGraphHandler] = this[loadGraphHandler].bind(this);
      this[loadApiHandler] = this[loadApiHandler].bind(this);
      this[hasApiHandler] = this[hasApiHandler].bind(this);
      this[endpointListHandler] = this[endpointListHandler].bind(this);
      this[endpointListWithOperationsHandler] = this[endpointListWithOperationsHandler].bind(this);
      this[endpointListOperationsHandler] = this[endpointListOperationsHandler].bind(this);
      this[endpointAddHandler] = this[endpointAddHandler].bind(this);
      this[endpointDeleteHandler] = this[endpointDeleteHandler].bind(this);
      this[endpointGetHandler] = this[endpointGetHandler].bind(this);
      this[endpointUpdateHandler] = this[endpointUpdateHandler].bind(this);
      this[createWebApiHandler] = this[createWebApiHandler].bind(this);
      this[generateRamlHandler] = this[generateRamlHandler].bind(this);
      this[generateGraphHandler] = this[generateGraphHandler].bind(this);
      this[apiGetHandler] = this[apiGetHandler].bind(this);
      this[serverGetHandler] = this[serverGetHandler].bind(this);
      this[serverAddHandler] = this[serverAddHandler].bind(this);
      this[serverListHandler] = this[serverListHandler].bind(this);
      this[documentationListHandler] = this[documentationListHandler].bind(this);
      this[readSecurityHandler] = this[readSecurityHandler].bind(this);
      this[readSecurityRequirementHandler] = this[readSecurityRequirementHandler].bind(this);
      this[readSecuritySettingsHandler] = this[readSecuritySettingsHandler].bind(this);
      this[securityListHandler] = this[securityListHandler].bind(this);
      this[typeListHandler] = this[typeListHandler].bind(this);
      this[addDocumentationHandler] = this[addDocumentationHandler].bind(this);
      this[readDocumentationHandler] = this[readDocumentationHandler].bind(this);
      this[updateDocumentationHandler] = this[updateDocumentationHandler].bind(this);
      this[deleteDocumentationHandler] = this[deleteDocumentationHandler].bind(this);
      this[addTypeHandler] = this[addTypeHandler].bind(this);
      this[readTypeHandler] = this[readTypeHandler].bind(this);
      this[readTypeBulkHandler] = this[readTypeBulkHandler].bind(this);
      this[updateTypeHandler] = this[updateTypeHandler].bind(this);
      this[deleteTypeHandler] = this[deleteTypeHandler].bind(this);
      this[addOperationHandler] = this[addOperationHandler].bind(this);
      this[readOperationHandler] = this[readOperationHandler].bind(this);
      this[updateOperationHandler] = this[updateOperationHandler].bind(this);
      this[deleteOperationHandler] = this[deleteOperationHandler].bind(this);
      this[readOperationParentHandler] = this[readOperationParentHandler].bind(this);
      this[addRequestHandler] = this[addRequestHandler].bind(this);
      this[removeRequestHandler] = this[removeRequestHandler].bind(this);
      this[addResponseHandler] = this[addResponseHandler].bind(this);
      this[removeResponseHandler] = this[removeResponseHandler].bind(this);
      this[readParameterHandler] = this[readParameterHandler].bind(this);
      this[readParameterBulkHandler] = this[readParameterBulkHandler].bind(this);
      this[updateParameterHandler] = this[updateParameterHandler].bind(this);
      this[addParameterExampleHandler] = this[addParameterExampleHandler].bind(this);
      this[removeParameterExampleHandler] = this[removeParameterExampleHandler].bind(this);
      this[readPayloadHandler] = this[readPayloadHandler].bind(this);
      this[readPayloadBulkHandler] = this[readPayloadBulkHandler].bind(this);
      this[updatePayloadHandler] = this[updatePayloadHandler].bind(this);
      this[addPayloadExampleHandler] = this[addPayloadExampleHandler].bind(this);
      this[removePayloadExampleHandler] = this[removePayloadExampleHandler].bind(this);
      this[readRequestHandler] = this[readRequestHandler].bind(this);
      this[updateRequestHandler] = this[updateRequestHandler].bind(this);
      this[addRequestPayloadHandler] = this[addRequestPayloadHandler].bind(this);
      this[removeRequestPayloadHandler] = this[removeRequestPayloadHandler].bind(this);
      this[addRequestHeaderHandler] = this[addRequestHeaderHandler].bind(this);
      this[removeRequestHeaderHandler] = this[removeRequestHeaderHandler].bind(this);
      this[addRequestQueryParameterHandler] = this[addRequestQueryParameterHandler].bind(this);
      this[removeRequestQueryParameterHandler] = this[removeRequestQueryParameterHandler].bind(this);
      this[addRequestCookieParameterHandler] = this[addRequestCookieParameterHandler].bind(this);
      this[removeRequestCookieParameterHandler] = this[removeRequestCookieParameterHandler].bind(this);
      this[readResponseHandler] = this[readResponseHandler].bind(this);
      this[readResponseBatchHandler] = this[readResponseBatchHandler].bind(this);
      this[updateResponseHandler] = this[updateResponseHandler].bind(this);
      this[addResponseHeaderHandler] = this[addResponseHeaderHandler].bind(this);
      this[removeResponseHeaderHandler] = this[removeResponseHeaderHandler].bind(this);
      this[addResponsePayloadHandler] = this[addResponsePayloadHandler].bind(this);
      this[removeResponsePayloadHandler] = this[removeResponsePayloadHandler].bind(this);
      this[readExampleHandler] = this[readExampleHandler].bind(this);
      this[readExampleBulkHandler] = this[readExampleBulkHandler].bind(this);
      this[updateExampleHandler] = this[updateExampleHandler].bind(this);
      this[customDomainPropertyListHandler] = this[customDomainPropertyListHandler].bind(this);
      this[customDomainPropertyAddHandler] = this[customDomainPropertyAddHandler].bind(this);
      this[customDomainPropertyGetHandler] = this[customDomainPropertyGetHandler].bind(this);
      this[customDomainPropertyUpdateHandler] = this[customDomainPropertyUpdateHandler].bind(this);
      this[customDomainPropertyDeleteHandler] = this[customDomainPropertyDeleteHandler].bind(this);
      this[domainExtensionGetHandler] = this[domainExtensionGetHandler].bind(this);
      this[propertyShapeGetHandler] = this[propertyShapeGetHandler].bind(this);
      this[propertyShapeAddHandler] = this[propertyShapeAddHandler].bind(this);
      this[propertyShapeDeleteHandler] = this[propertyShapeDeleteHandler].bind(this);
      this[propertyShapeUpdateHandler] = this[propertyShapeUpdateHandler].bind(this);
    }

    /**
     * @param {EventTarget} node
     */
    _attachListeners(node) {
      super._attachListeners(node);
      // Store related events
      node.addEventListener(EventTypes.Store.init, this[initHandler]);
      node.addEventListener(EventTypes.Store.loadGraph, this[loadGraphHandler]);
      node.addEventListener(EventTypes.Store.loadApi, this[loadApiHandler]);
      node.addEventListener(EventTypes.Store.hasApi, this[hasApiHandler]);
      // API related events
      node.addEventListener(EventTypes.Api.createWebApi, this[createWebApiHandler]);
      node.addEventListener(EventTypes.Api.generateRaml, this[generateRamlHandler]);
      node.addEventListener(EventTypes.Api.generateGraph, this[generateGraphHandler]);
      node.addEventListener(EventTypes.Api.get, this[apiGetHandler]);
      // Sever related events
      node.addEventListener(EventTypes.Server.get, this[serverGetHandler]);
      node.addEventListener(EventTypes.Server.add, this[serverAddHandler]);
      node.addEventListener(EventTypes.Server.list, this[serverListHandler]);
      // Endpoint related events
      node.addEventListener(EventTypes.Endpoint.add, this[endpointAddHandler]);
      node.addEventListener(EventTypes.Endpoint.get, this[endpointGetHandler]);
      node.addEventListener(EventTypes.Endpoint.update, this[endpointUpdateHandler]);
      node.addEventListener(EventTypes.Endpoint.delete, this[endpointDeleteHandler]);
      node.addEventListener(EventTypes.Endpoint.list, this[endpointListHandler]);
      node.addEventListener(EventTypes.Endpoint.listWithOperations, this[endpointListWithOperationsHandler]);
      node.addEventListener(EventTypes.Endpoint.listOperations, this[endpointListOperationsHandler]);
      node.addEventListener(EventTypes.Endpoint.addOperation, this[addOperationHandler]);
      node.addEventListener(EventTypes.Endpoint.removeOperation, this[deleteOperationHandler]);
      // Operation related events
      node.addEventListener(EventTypes.Operation.get, this[readOperationHandler]);
      node.addEventListener(EventTypes.Operation.update, this[updateOperationHandler]);
      node.addEventListener(EventTypes.Operation.addRequest, this[addRequestHandler]);
      node.addEventListener(EventTypes.Operation.removeRequest, this[removeRequestHandler]);
      node.addEventListener(EventTypes.Operation.addResponse, this[addResponseHandler]);
      node.addEventListener(EventTypes.Operation.removeResponse, this[removeResponseHandler]);
      node.addEventListener(EventTypes.Operation.getParent, this[readOperationParentHandler]);
      // API documentation related events
      node.addEventListener(EventTypes.Documentation.list, this[documentationListHandler]);
      node.addEventListener(EventTypes.Documentation.add, this[addDocumentationHandler]);
      node.addEventListener(EventTypes.Documentation.get, this[readDocumentationHandler]);
      node.addEventListener(EventTypes.Documentation.update, this[updateDocumentationHandler]);
      node.addEventListener(EventTypes.Documentation.delete, this[deleteDocumentationHandler]);
      // API security related events
      node.addEventListener(EventTypes.Security.get, this[readSecurityHandler]);
      node.addEventListener(EventTypes.Security.getRequirement, this[readSecurityRequirementHandler]);
      node.addEventListener(EventTypes.Security.getSettings, this[readSecuritySettingsHandler]);
      node.addEventListener(EventTypes.Security.list, this[securityListHandler]);
      // API types/schemas related events
      node.addEventListener(EventTypes.Type.list, this[typeListHandler]);
      node.addEventListener(EventTypes.Type.add, this[addTypeHandler]);
      node.addEventListener(EventTypes.Type.get, this[readTypeHandler]);
      node.addEventListener(EventTypes.Type.getBulk, this[readTypeBulkHandler]);
      node.addEventListener(EventTypes.Type.update, this[updateTypeHandler]);
      node.addEventListener(EventTypes.Type.delete, this[deleteTypeHandler]);
      node.addEventListener(EventTypes.Type.addProperty, this[propertyShapeAddHandler]);
      node.addEventListener(EventTypes.Type.getProperty, this[propertyShapeGetHandler]);
      node.addEventListener(EventTypes.Type.deleteProperty, this[propertyShapeDeleteHandler]);
      node.addEventListener(EventTypes.Type.updateProperty, this[propertyShapeUpdateHandler]);
      // Parameter related events
      node.addEventListener(EventTypes.Parameter.get, this[readParameterHandler]);
      node.addEventListener(EventTypes.Parameter.getBulk, this[readParameterBulkHandler]);
      node.addEventListener(EventTypes.Parameter.update, this[updateParameterHandler]);
      node.addEventListener(EventTypes.Parameter.addExample, this[addParameterExampleHandler]);
      node.addEventListener(EventTypes.Parameter.removeExample, this[removeParameterExampleHandler]);
      // Payload related events
      node.addEventListener(EventTypes.Payload.get, this[readPayloadHandler]);
      node.addEventListener(EventTypes.Payload.getBulk, this[readPayloadBulkHandler]);
      node.addEventListener(EventTypes.Payload.update, this[updatePayloadHandler]);
      node.addEventListener(EventTypes.Payload.addExample, this[addPayloadExampleHandler]);
      node.addEventListener(EventTypes.Payload.removeExample, this[removePayloadExampleHandler]);
      // Request related events
      node.addEventListener(EventTypes.Request.get, this[readRequestHandler]);
      node.addEventListener(EventTypes.Request.update, this[updateRequestHandler]);
      node.addEventListener(EventTypes.Request.addPayload, this[addRequestPayloadHandler]);
      node.addEventListener(EventTypes.Request.removePayload, this[removeRequestPayloadHandler]);
      node.addEventListener(EventTypes.Request.addHeader, this[addRequestHeaderHandler]);
      node.addEventListener(EventTypes.Request.removeHeader, this[removeRequestHeaderHandler]);
      node.addEventListener(EventTypes.Request.addQueryParameter, this[addRequestQueryParameterHandler]);
      node.addEventListener(EventTypes.Request.removeQueryParameter, this[removeRequestQueryParameterHandler]);
      node.addEventListener(EventTypes.Request.addCookieParameter, this[addRequestCookieParameterHandler]);
      node.addEventListener(EventTypes.Request.removeCookieParameter, this[removeRequestCookieParameterHandler]);
      // Response related events
      node.addEventListener(EventTypes.Response.get, this[readResponseHandler]);
      node.addEventListener(EventTypes.Response.getBulk, this[readResponseBatchHandler]);
      node.addEventListener(EventTypes.Response.update, this[updateResponseHandler]);
      node.addEventListener(EventTypes.Response.addHeader, this[addResponseHeaderHandler]);
      node.addEventListener(EventTypes.Response.removeHeader, this[removeResponseHeaderHandler]);
      node.addEventListener(EventTypes.Response.addPayload, this[addResponsePayloadHandler]);
      node.addEventListener(EventTypes.Response.removePayload, this[removeResponsePayloadHandler]);
      // Example related events
      node.addEventListener(EventTypes.Example.get, this[readExampleHandler]);
      node.addEventListener(EventTypes.Example.getBulk, this[readExampleBulkHandler]);
      node.addEventListener(EventTypes.Example.update, this[updateExampleHandler]);
      // Custom domain property
      node.addEventListener(EventTypes.CustomProperty.add, this[customDomainPropertyAddHandler]);
      node.addEventListener(EventTypes.CustomProperty.get, this[customDomainPropertyGetHandler]);
      node.addEventListener(EventTypes.CustomProperty.update, this[customDomainPropertyUpdateHandler]);
      node.addEventListener(EventTypes.CustomProperty.list, this[customDomainPropertyListHandler]);
      node.addEventListener(EventTypes.CustomProperty.delete, this[customDomainPropertyDeleteHandler]);
      node.addEventListener(EventTypes.CustomProperty.getExtension, this[domainExtensionGetHandler]);
    }

    /**
     * @override
     * @param {EventTarget} node
     */
    _detachListeners(node) {
      super._detachListeners(node);
      node.removeEventListener(EventTypes.Store.init, this[initHandler]);
      node.removeEventListener(EventTypes.Store.loadGraph, this[loadGraphHandler]);
      node.removeEventListener(EventTypes.Store.loadApi, this[loadApiHandler]);
      node.removeEventListener(EventTypes.Store.hasApi, this[hasApiHandler]);
      // API related events
      node.removeEventListener(EventTypes.Api.createWebApi, this[createWebApiHandler]);
      node.removeEventListener(EventTypes.Api.generateRaml, this[generateRamlHandler]);
      node.removeEventListener(EventTypes.Api.generateGraph, this[generateGraphHandler]);
      node.removeEventListener(EventTypes.Api.get, this[apiGetHandler]);
      // Sever related events
      node.removeEventListener(EventTypes.Server.get, this[serverGetHandler]);
      node.removeEventListener(EventTypes.Server.add, this[serverAddHandler]);
      node.removeEventListener(EventTypes.Server.list, this[serverListHandler]);
      // Endpoint related events
      node.removeEventListener(EventTypes.Endpoint.list, this[endpointListHandler]);
      node.removeEventListener(EventTypes.Endpoint.listWithOperations, this[endpointListWithOperationsHandler]);
      node.removeEventListener(EventTypes.Endpoint.listOperations, this[endpointListOperationsHandler]);
      node.removeEventListener(EventTypes.Endpoint.add, this[endpointAddHandler]);
      node.removeEventListener(EventTypes.Endpoint.delete, this[endpointDeleteHandler]);
      node.removeEventListener(EventTypes.Endpoint.get, this[endpointGetHandler]);
      node.removeEventListener(EventTypes.Endpoint.update, this[endpointUpdateHandler]);
      node.removeEventListener(EventTypes.Endpoint.addOperation, this[addOperationHandler]);
      node.removeEventListener(EventTypes.Endpoint.removeOperation, this[deleteOperationHandler]);
      // Operation related events
      node.removeEventListener(EventTypes.Operation.get, this[readOperationHandler]);
      node.removeEventListener(EventTypes.Operation.update, this[updateOperationHandler]);
      node.removeEventListener(EventTypes.Operation.addRequest, this[addRequestHandler]);
      node.removeEventListener(EventTypes.Operation.removeRequest, this[removeRequestHandler]);
      node.removeEventListener(EventTypes.Operation.addResponse, this[addResponseHandler]);
      node.removeEventListener(EventTypes.Operation.removeResponse, this[removeResponseHandler]);
      node.removeEventListener(EventTypes.Operation.getParent, this[readOperationParentHandler]);
      // API documentation related events
      node.removeEventListener(EventTypes.Documentation.list, this[documentationListHandler]);
      node.removeEventListener(EventTypes.Documentation.add, this[addDocumentationHandler]);
      node.removeEventListener(EventTypes.Documentation.get, this[readDocumentationHandler]);
      node.removeEventListener(EventTypes.Documentation.update, this[updateDocumentationHandler]);
      node.removeEventListener(EventTypes.Documentation.delete, this[deleteDocumentationHandler]);
      // API security related events
      node.removeEventListener(EventTypes.Security.get, this[readSecurityHandler]);
      node.removeEventListener(EventTypes.Security.getRequirement, this[readSecurityRequirementHandler]);
      node.removeEventListener(EventTypes.Security.getSettings, this[readSecuritySettingsHandler]);
      node.removeEventListener(EventTypes.Security.list, this[securityListHandler]);
      // API types/schemas related events
      node.removeEventListener(EventTypes.Type.list, this[typeListHandler]);
      node.removeEventListener(EventTypes.Type.add, this[addTypeHandler]);
      node.removeEventListener(EventTypes.Type.get, this[readTypeHandler]);
      node.removeEventListener(EventTypes.Type.getBulk, this[readTypeBulkHandler]);
      node.removeEventListener(EventTypes.Type.update, this[updateTypeHandler]);
      node.removeEventListener(EventTypes.Type.delete, this[deleteTypeHandler]);
      node.removeEventListener(EventTypes.Type.addProperty, this[propertyShapeAddHandler]);
      node.removeEventListener(EventTypes.Type.getProperty, this[propertyShapeGetHandler]);
      node.removeEventListener(EventTypes.Type.deleteProperty, this[propertyShapeDeleteHandler]);
      node.removeEventListener(EventTypes.Type.updateProperty, this[propertyShapeUpdateHandler]);
      // Parameter related events
      node.removeEventListener(EventTypes.Parameter.get, this[readParameterHandler]);
      node.removeEventListener(EventTypes.Parameter.getBulk, this[readParameterBulkHandler]);
      node.removeEventListener(EventTypes.Parameter.update, this[updateParameterHandler]);
      node.removeEventListener(EventTypes.Parameter.addExample, this[addParameterExampleHandler]);
      node.removeEventListener(EventTypes.Parameter.removeExample, this[removeParameterExampleHandler]);
      // Payload related events
      node.removeEventListener(EventTypes.Payload.get, this[readPayloadHandler]);
      node.removeEventListener(EventTypes.Payload.getBulk, this[readPayloadBulkHandler]);
      node.removeEventListener(EventTypes.Payload.update, this[updatePayloadHandler]);
      node.removeEventListener(EventTypes.Payload.addExample, this[addPayloadExampleHandler]);
      node.removeEventListener(EventTypes.Payload.removeExample, this[removePayloadExampleHandler]);
      // Request related events
      node.removeEventListener(EventTypes.Request.get, this[readRequestHandler]);
      node.removeEventListener(EventTypes.Request.update, this[updateRequestHandler]);
      node.removeEventListener(EventTypes.Request.addPayload, this[addRequestPayloadHandler]);
      node.removeEventListener(EventTypes.Request.removePayload, this[removeRequestPayloadHandler]);
      node.removeEventListener(EventTypes.Request.addHeader, this[addRequestHeaderHandler]);
      node.removeEventListener(EventTypes.Request.removeHeader, this[removeRequestHeaderHandler]);
      node.removeEventListener(EventTypes.Request.addQueryParameter, this[addRequestQueryParameterHandler]);
      node.removeEventListener(EventTypes.Request.removeQueryParameter, this[removeRequestQueryParameterHandler]);
      node.removeEventListener(EventTypes.Request.addCookieParameter, this[addRequestCookieParameterHandler]);
      node.removeEventListener(EventTypes.Request.removeCookieParameter, this[removeRequestCookieParameterHandler]);
      // Response related events
      node.removeEventListener(EventTypes.Response.get, this[readResponseHandler]);
      node.removeEventListener(EventTypes.Response.getBulk, this[readResponseBatchHandler]);
      node.removeEventListener(EventTypes.Response.update, this[updateResponseHandler]);
      node.removeEventListener(EventTypes.Response.addHeader, this[addResponseHeaderHandler]);
      node.removeEventListener(EventTypes.Response.removeHeader, this[removeResponseHeaderHandler]);
      node.removeEventListener(EventTypes.Response.addPayload, this[addResponsePayloadHandler]);
      node.removeEventListener(EventTypes.Response.removePayload, this[removeResponsePayloadHandler]);
      // Example related events
      node.removeEventListener(EventTypes.Example.get, this[readExampleHandler]);
      node.removeEventListener(EventTypes.Example.getBulk, this[readExampleBulkHandler]);
      node.removeEventListener(EventTypes.Example.update, this[updateExampleHandler]);
      // Custom domain property
      node.removeEventListener(EventTypes.CustomProperty.add, this[customDomainPropertyAddHandler]);
      node.removeEventListener(EventTypes.CustomProperty.get, this[customDomainPropertyGetHandler]);
      node.removeEventListener(EventTypes.CustomProperty.update, this[customDomainPropertyUpdateHandler]);
      node.removeEventListener(EventTypes.CustomProperty.list, this[customDomainPropertyListHandler]);
      node.removeEventListener(EventTypes.CustomProperty.delete, this[customDomainPropertyDeleteHandler]);
      node.removeEventListener(EventTypes.CustomProperty.getExtension, this[domainExtensionGetHandler]);
    }

    /**
     * @param {CustomEvent} e 
     */
    [initHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.init();
    }

    /**
     * @param {ApiStoreLoadGraphEvent} e 
     */
    [loadGraphHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { model } = e.detail;
      e.detail.result = this.loadGraph(model);
    }

    /**
     * @param {ApiStoreLoadApiEvent} e 
     */
    [loadApiHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { contents, main, vendor, mediaType } = e.detail;
      e.detail.result = this.loadApi(contents, vendor, mediaType, main);
    }

    /**
     * @param {CustomEvent} e 
     */
    [hasApiHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.hasApi();
    }

    /**
     * @param {ApiStoreContextEvent} e 
     */
    [endpointListHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.listEndpoints();
    }

    /**
     * @param {ApiStoreContextEvent} e 
     */
    [endpointListWithOperationsHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.listEndpointsWithOperations();
    }

    /**
     * @param {ApiStoreEndpointListOperationsEvent} e 
     */
    [endpointListOperationsHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { pathOrId } = e;
      e.detail.result = this.listOperations(pathOrId);
    }

    /**
     * @param {ApiStoreEndpointAddEvent} e 
     */
    [endpointAddHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init } = e;
      e.detail.result = this.addEndpoint(init);
    }

    /**
     * @param {ApiStoreEndpointDeleteEvent} e 
     */
    [endpointDeleteHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e;
      e.detail.result = this.deleteEndpoint(id);
    }

    /**
     * @param {ApiStoreEndpointReadEvent} e 
     */
    [endpointGetHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { pathOrId } = e;
      e.detail.result = this.getEndpoint(pathOrId);
    }

    /**
     * @param {ApiStoreEndpointUpdateEvent} e 
     */
    [endpointUpdateHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, property, value } = e;
      e.detail.result = this.updateEndpointProperty(id, property, value);
    }

    /**
     * @param {ApiCreateEvent} e 
     */
    [createWebApiHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init } = e;
      e.detail.result = this.createWebApi(init);
    }

    /**
     * @param {ApiStoreContextEvent} e 
     */
    [generateRamlHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.generateRaml();
    }

    /**
     * @param {ApiStoreContextEvent} e 
     */
    [generateGraphHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.generateGraph();
    }

    /**
     * @param {ApiStoreContextEvent} e 
     */
    [apiGetHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.getApi();
    }

    /**
     * @param {ApiServerReadEvent} e 
     */
    [serverGetHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e;
      e.detail.result = this.getServer(id);
    }

    /**
     * @param {ApiServerAddEvent} e 
     */
    [serverAddHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init } = e;
      e.detail.result = this.addServer(init);
    }

    /**
     * @param {ApiStoreContextEvent} e 
     */
    [serverListHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.listServers();
    }

    /**
     * @param {ApiStoreContextEvent} e 
     */
    [documentationListHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.listDocumentations();
    }

    /**
     * @param {ApiStoreCreateEvent} e 
     */
    [addDocumentationHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init } = e.detail;
      e.detail.result = this.addDocumentation(init);
    }

    /**
     * @param {ApiStoreReadEvent} e 
     */
    [readDocumentationHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.getDocumentation(id);
    }

    /**
     * @param {ApiStoreUpdateScalarEvent} e 
     */
    [updateDocumentationHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, property, value } = e.detail;
      e.detail.result = this.updateDocumentationProperty(id, property, value);
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [deleteDocumentationHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.deleteDocumentation(id);
    }

    /**
     * @param {ApiStoreReadEvent} e 
     */
    [readSecurityHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.getSecurityScheme(id);
    }

    /**
     * @param {ApiStoreReadEvent} e 
     */
    [readSecurityRequirementHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.getSecurityRequirement(id);
    }

    /**
     * @param {ApiStoreReadEvent} e 
     */
    [readSecuritySettingsHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.getSecuritySettings(id);
    }

    /**
     * @param {ApiStoreContextEvent} e 
     */
    [securityListHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.listSecurity();
    }

    /**
     * @param {ApiStoreContextEvent} e 
     */
    [typeListHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.listTypes();
    }

    /**
     * @param {ApiStoreCreateEvent} e 
     */
    [addTypeHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init } = e.detail;
      e.detail.result = this.addType(init);
    }

    /**
     * @param {ApiStoreReadEvent} e 
     */
    [readTypeHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.getType(id);
    }

    /**
     * @param {ApiStoreReadBulkEvent} e 
     */
    [readTypeBulkHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { ids } = e.detail;
      e.detail.result = this.getTypes(ids);
    }

    /**
     * @param {ApiStoreUpdateScalarEvent} e 
     */
    [updateTypeHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, property, value } = e.detail;
      e.detail.result = this.updateTypeProperty(id, property, value);
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [deleteTypeHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.deleteType(id);
    }

    /**
     * @param {ApiStoreCreatePropertyEvent} e 
     */
    [propertyShapeAddHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init, parent } = e.detail;
      e.detail.result = this.addPropertyShape(parent, init);
    }

    /**
     * @param {ApiStoreReadEvent} e 
     */
    [propertyShapeGetHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.getPropertyShape(id);
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [propertyShapeDeleteHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, parent } = e.detail;
      e.detail.result = this.deletePropertyShape(parent, id);
    }

    /**
     * @param {ApiStoreUpdateScalarEvent} e 
     */
    [propertyShapeUpdateHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, property, value, parent } = e.detail;
      e.detail.result = this.updatePropertyShapeProperty(parent, id, property, value);
    }
    
    // node.removeEventListener(EventTypes.Type.updateProperty, this[propertyShapeUpdateHandler]);

    /**
     * @param {ApiStoreOperationCreateEvent} e 
     */
    [addOperationHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { pathOrId, init } = e.detail;
      e.detail.result = this.addOperation(pathOrId, init);
    }

    /**
     * @param {ApiStoreOperationReadEvent} e 
     */
    [readOperationHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { methodOrId, pathOrId } = e.detail;
      e.detail.result = this.getOperation(methodOrId, pathOrId);
    }

    /**
     * @param {ApiStoreUpdateScalarEvent} e 
     */
    [updateOperationHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, property, value } = e.detail;
      e.detail.result = this.updateOperationProperty(id, property, value);
    }

    /**
     * @param {ApiStoreCreateRequestEvent} e 
     */
    [addRequestHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init, parentId } = e.detail;
      e.detail.result = this.addRequest(parentId, init);
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [removeRequestHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, parent } = e.detail;
      e.detail.result = this.deleteRequest(id, parent);
    }

    /**
     * @param {ApiStoreCreateResponseEvent} e 
     */
    [addResponseHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init, parentId } = e.detail;
      e.detail.result = this.addResponse(parentId, init);
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [removeResponseHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, parent } = e.detail;
      e.detail.result = this.deleteResponse(id, parent);
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [deleteOperationHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, parent } = e.detail;
      e.detail.result = this.deleteOperation(id, parent);
    }

    /**
     * @param {ApiStoreOperationParentReadEvent} e 
     */
    [readOperationParentHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { methodOrId, pathOrId } = e.detail;
      e.detail.result = this.getOperationParent(methodOrId, pathOrId);
    }

    /**
     * @param {ApiStoreReadEvent} e 
     */
    [readParameterHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.getParameter(id);
    }

    /**
     * @param {ApiStoreReadBulkEvent} e 
     */
    [readParameterBulkHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { ids } = e.detail;
      e.detail.result = this.getParameters(ids);
    }

    /**
     * @param {ApiStoreUpdateScalarEvent} e 
     */
    [updateParameterHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, property, value } = e.detail;
      e.detail.result = this.updateParameterProperty(id, property, value);
    }

    /**
     * @param {ApiStoreCreateExampleEvent} e 
     */
    [addParameterExampleHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init, parentId } = e.detail;
      e.detail.result = this.addParameterExample(parentId, init);
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [removeParameterExampleHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, parent } = e.detail;
      e.detail.result = this.removeParameterExample(parent, id);
    }

    /**
     * @param {ApiStoreReadEvent} e 
     */
    [readPayloadHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.getPayload(id);
    }

    /**
     * @param {ApiStoreReadBulkEvent} e 
     */
    [readPayloadBulkHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { ids } = e.detail;
      e.detail.result = this.getPayloads(ids);
    }

    /**
     * @param {ApiStoreUpdateScalarEvent} e 
     */
    [updatePayloadHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, property, value } = e.detail;
      e.detail.result = this.updatePayloadProperty(id, property, value);
    }

    /**
     * @param {ApiStoreCreateExampleEvent} e 
     */
    [addPayloadExampleHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init, parentId } = e.detail;
      e.detail.result = this.addPayloadExample(parentId, init);
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [removePayloadExampleHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, parent } = e.detail;
      e.detail.result = this.removePayloadExample(parent, id);
    }

    /**
     * @param {ApiStoreReadEvent} e 
     */
    [readRequestHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.getRequest(id);
    }

    /**
     * @param {ApiStoreUpdateScalarEvent} e 
     */
    [updateRequestHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, property, value } = e.detail;
      e.detail.result = this.updateRequestProperty(id, property, value);
    }

    /**
     * @param {ApiStoreCreatePayloadEvent} e 
     */
    [addRequestPayloadHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init, parentId } = e.detail;
      e.detail.result = this.addRequestPayload(parentId, init);
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [removeRequestPayloadHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, parent } = e.detail;
      e.detail.result = this.removeRequestPayload(parent, id);
    }

    /**
     * @param {ApiStoreCreateHeaderEvent} e 
     */
    [addRequestHeaderHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init, parentId } = e.detail;
      e.detail.result = this.addRequestHeader(parentId, init);
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [removeRequestHeaderHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, parent } = e.detail;
      e.detail.result = this.removeRequestHeader(parent, id);
    }

    /**
     * @param {ApiStoreCreateQueryParameterEvent} e 
     */
    [addRequestQueryParameterHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init, parentId } = e.detail;
      e.detail.result = this.addRequestQueryParameter(parentId, init);
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [removeRequestQueryParameterHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, parent } = e.detail;
      e.detail.result = this.removeRequestQueryParameter(parent, id);
    }

    /**
     * @param {ApiStoreCreateCookieParameterEvent} e 
     */
    [addRequestCookieParameterHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init, parentId } = e.detail;
      e.detail.result = this.addRequestCookieParameter(parentId, init);
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [removeRequestCookieParameterHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, parent } = e.detail;
      e.detail.result = this.removeRequestCookieParameter(parent, id);
    }

    /**
     * @param {ApiStoreReadEvent} e 
     */
    [readResponseHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.getResponse(id);
    }

    /**
     * @param {ApiStoreReadBulkEvent} e 
     */
    [readResponseBatchHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { ids } = e.detail;
      e.detail.result = this.getResponses(ids);
    }

    /**
     * @param {ApiStoreUpdateScalarEvent} e 
     */
    [updateResponseHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, property, value } = e.detail;
      e.detail.result = this.updateResponseProperty(id, property, value);
    }

    /**
     * @param {ApiStoreCreateHeaderEvent} e 
     */
    [addResponseHeaderHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init, parentId } = e.detail;
      e.detail.result = this.addResponseHeader(parentId, init);
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [removeResponseHeaderHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, parent } = e.detail;
      e.detail.result = this.removeResponseHeader(parent, id);
    }

    /**
     * @param {ApiStoreCreatePayloadEvent} e 
     */
    [addResponsePayloadHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init, parentId } = e.detail;
      e.detail.result = this.addResponsePayload(parentId, init);
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [removeResponsePayloadHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, parent } = e.detail;
      e.detail.result = this.removeResponsePayload(parent, id);
    }

    /**
     * @param {ApiStoreReadEvent} e 
     */
    [readExampleHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.getExample(id);
    }

    /**
     * @param {ApiStoreReadBulkEvent} e 
     */
    [readExampleBulkHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { ids } = e.detail;
      e.detail.result = this.getExamples(ids);
    }

    /**
     * @param {ApiStoreUpdateScalarEvent} e 
     */
    [updateExampleHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, property, value } = e.detail;
      e.detail.result = this.updateExampleProperty(id, property, value);
    }

    /**
     * @param {ApiStoreCreateEvent} e 
     */
    [customDomainPropertyAddHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { init } = e.detail;
      e.detail.result = this.addCustomDomainProperty(init);
    }

    /**
     * @param {ApiStoreReadEvent} e 
     */
    [customDomainPropertyGetHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.getCustomDomainProperty(id);
    }

    /**
     * @param {ApiStoreUpdateScalarEvent} e 
     */
     [customDomainPropertyUpdateHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id, property, value } = e.detail;
      e.detail.result = this.updateCustomDomainProperty(id, property, value);
    }

    /**
     * @param {ApiStoreContextEvent} e 
     */
    [customDomainPropertyListHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.detail.result = this.listCustomDomainProperties();
    }

    /**
     * @param {ApiStoreDeleteEvent} e 
     */
    [customDomainPropertyDeleteHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.deleteCustomDomainProperty(id);
    }

    /**
     * @param {ApiStoreReadEvent} e 
     */
    [domainExtensionGetHandler](e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      const { id } = e.detail;
      e.detail.result = this.getDomainExtension(id);
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
