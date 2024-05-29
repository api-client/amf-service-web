import { AmfShapes, ApiDefinitions, AmfNamespace as ns } from '@api-client/core/build/esm/browser.js';
import {
  AmfStoreProxy,
  workerValue,
  createResponsePromise,
  sendMessage,
  getId,
  createWorker,
  responseHandler,
  errorHandler,
  processResponse,
} from './AmfStoreProxy.js';
import { StoreDomEventsHandler } from '../lib/StoreDomEventsHandler.js';
import { StorePersistence } from '../lib/StorePersistence.js';
import { ApiStoreChangeRecord, ApiStoreCreateRecord, ApiStoreDeleteRecord, ApiStoreStateCreateEvent, ApiStoreStateDeleteEvent, ApiStoreStateUpdateEvent } from '../events/BaseEvents.js';
import { EventTypes } from '../events/EventTypes.js';
import type { AmfWorkerStoreInit, ApiServerInit, CustomDomainPropertyInit, DocumentationInit, EndPointInit, ExampleInit, OperationInit, OperationRequestInit, OperationResponseInit, ParameterInit, PayloadInit, PropertyShapeInit, ShapeInit, WorkerMessage, WorkerResponse } from '../types.js';

export const optionsValue = Symbol('options');
export const readWorkerUrl = Symbol('readWorkerUrl');

export class WebWorkerService extends AmfStoreProxy {
  override get worker(): Worker {
    if (!this[workerValue]) {
      this[workerValue] = this[createWorker]();
    }
    return this[workerValue] as Worker;
  }

  [optionsValue]: AmfWorkerStoreInit;

  /**
   * Options used to initialize this class.
   */
  get options(): AmfWorkerStoreInit {
    return this[optionsValue];
  }

  events: StoreDomEventsHandler;
  eventsTarget: EventTarget;
  persistance: StorePersistence;

  /**
   * @param persistance The class that manages the persistance layer.
   * @param opts Class initialization options.
   */
  constructor(persistance: StorePersistence, opts: AmfWorkerStoreInit = {}) {
    super();
    this[optionsValue] = Object.freeze(opts);
    const target = opts.eventsTarget || window;
    this.events = new StoreDomEventsHandler(this, target);
    this.eventsTarget = target;
    this.persistance = persistance;
  }

  /**
   * Initializes the backend store.
   */
  override async init(): Promise<void> {
    await this[sendMessage]('init', this.options.amfLocation);
  }

  /**
   * Adds a server definition to the API.
   * @returns The instance of the created server
   */
  override async addServer(init: ApiServerInit): Promise<ApiDefinitions.IApiServer> {
    const result = await super.addServer(init);
    const record: ApiStoreCreateRecord<ApiDefinitions.IApiServer> = {
      graphId: result.id,
      domainType: ns.aml.vocabularies.apiContract.Server,
      item: result,
    };
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Server.State.created, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Adds a new endpoint to the API and returns generated id for the endpoint.
   * @param init EndPoint init parameters
   */
  override async addEndpoint(init: EndPointInit): Promise<ApiDefinitions.IApiEndPoint> {
    const endpoint = await super.addEndpoint(init);
    const record: ApiStoreCreateRecord<ApiDefinitions.IApiEndPoint> = ({
      graphId: endpoint.id,
      domainType: ns.aml.vocabularies.apiContract.EndPoint,
      item: endpoint,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Endpoint.State.created, record));
    this.persistance.persist();
    return endpoint;
  }

  /**
   * Removes endpoint from the API.
   * @param id The endpoint domain id.
   */
  override async deleteEndpoint(id: string): Promise<void> {
    await super.deleteEndpoint(id);
    const record: ApiStoreDeleteRecord = ({
      graphId: id,
      domainType: ns.aml.vocabularies.apiContract.EndPoint,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Endpoint.State.deleted, record));
    this.persistance.persist();
  }

  /**
   * Updates a scalar property of an endpoint.
   * @param id The domain id of the endpoint.
   * @param property The property name to update
   * @param {any} value The new value to set.
   */
  override async updateEndpointProperty(id: string, property: keyof ApiDefinitions.IApiEndPoint, value: unknown): Promise<ApiDefinitions.IApiEndPoint> {
    const endpoint = await super.updateEndpointProperty(id, property, value);
    const record: ApiStoreChangeRecord<ApiDefinitions.IApiEndPoint> = ({
      graphId: id,
      domainType: ns.aml.vocabularies.apiContract.EndPoint,
      item: endpoint,
      property,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.Endpoint.State.updated, record));
    this.persistance.persist();
    return endpoint;
  }

  /**
   * Adds an empty operation to an endpoint.
   * @param pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param init The operation initialize options
   */
  override async addOperation(pathOrId: string, init: OperationInit): Promise<ApiDefinitions.IApiOperation> {
    const operation = await super.addOperation(pathOrId, init);
    const endpoint = await this.getEndpoint(pathOrId);
    const record: ApiStoreCreateRecord<ApiDefinitions.IApiOperation> = ({
      graphId: operation.id,
      domainType: ns.aml.vocabularies.apiContract.Operation,
      item: operation,
      domainParent: endpoint.id,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Operation.State.created, record));
    this.persistance.persist();
    return operation;
  }

  /**
   * Removes an operation from the graph.
   * @param id The operation id to remove.
   * @param endpointId The domain id of the parent endpoint.
   * @returns The id of the affected endpoint. Undefined when operation or endpoint cannot be found.
   */
  override async deleteOperation(id: string, endpointId: string): Promise<string | undefined> {
    const result = await super.deleteOperation(id, endpointId);
    const record: ApiStoreDeleteRecord = ({
      graphId: id,
      domainType: ns.aml.vocabularies.apiContract.Operation,
      domainParent: endpointId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Operation.State.deleted, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Updates a scalar property of an operation.
   * @param id The domain id of the operation.
   * @param property The property name to update
   * @param value The new value to set.
   */
  override async updateOperationProperty(id: string, property: keyof ApiDefinitions.IApiOperation, value: unknown): Promise<ApiDefinitions.IApiOperation> {
    const updated = await super.updateOperationProperty(id, property, value);
    const record: ApiStoreChangeRecord<ApiDefinitions.IApiOperation> = ({
      graphId: id,
      domainType: ns.aml.vocabularies.apiContract.Operation,
      item: updated,
      property,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.Operation.State.updated, record));
    this.persistance.persist();
    return updated;
  }

  /**
   * @param operationId The operation domain id
   * @param {OperationResponseInit} init The response init options.
   * @returns The domain id of the created response
   */
  override async addResponse(operationId: string, init: OperationResponseInit): Promise<ApiDefinitions.IApiResponse> {
    const result = await super.addResponse(operationId, init);
    const record: ApiStoreCreateRecord<ApiDefinitions.IApiResponse> = ({
      graphId: result.id,
      domainType: ns.aml.vocabularies.apiContract.Response,
      item: result,
      domainParent: operationId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Response.State.created, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Adds a header to the response.
   * @param responseId The response domain id
   * @param init The Parameter init options.
   */
  override async addResponseHeader(responseId: string, init: ParameterInit): Promise<ApiDefinitions.IApiParameter> {
    const result = await super.addResponseHeader(responseId, init);
    const record: ApiStoreCreateRecord<ApiDefinitions.IApiParameter> = ({
      graphId: result.id,
      domainType: ns.aml.vocabularies.apiContract.Parameter,
      item: result,
      domainParent: responseId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Parameter.State.created, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Removes a header from a response
   * @param responseId The response id to remove the header from
   * @param headerId The header id to remove.
   * @returns Updated response
   */
  override async removeResponseHeader(responseId: string, headerId: string): Promise<ApiDefinitions.IApiResponse> {
    const result = await super.removeResponseHeader(responseId, headerId);
    const record: ApiStoreDeleteRecord = ({
      graphId: headerId,
      domainType: ns.aml.vocabularies.apiContract.Parameter,
      domainParent: responseId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Parameter.State.deleted, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Creates a new payload in the response.
   * @param responseId The response domain id
   * @param init The payload init options
   * @returns Created payload object.
   */
  override async addResponsePayload(responseId: string, init: PayloadInit): Promise<ApiDefinitions.IApiPayload> {
    const result = await super.addResponsePayload(responseId, init);
    const record: ApiStoreCreateRecord<ApiDefinitions.IApiPayload> = ({
      graphId: result.id,
      domainType: ns.aml.vocabularies.apiContract.Payload,
      item: result,
      domainParent: responseId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Payload.State.created, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Removes a payload from a response object.
   * @param responseId The response domain id
   * @param payloadId The payload domain id.
   */
  override async removeResponsePayload(responseId: string, payloadId: string): Promise<void> {
    await super.removeResponsePayload(responseId, payloadId);
    const record: ApiStoreDeleteRecord = ({
      graphId: payloadId,
      domainType: ns.aml.vocabularies.apiContract.Payload,
      domainParent: responseId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Payload.State.deleted, record));
    this.persistance.persist();
  }

  /**
   * Updates a scalar property of a Response.
   * @param id The domain id of the response.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated response
   */
  override async updateResponseProperty(id: string, property: keyof ApiDefinitions.IApiResponse, value: unknown): Promise<ApiDefinitions.IApiResponse> {
    const updated = await super.updateResponseProperty(id, property, value);
    const record: ApiStoreChangeRecord<ApiDefinitions.IApiResponse> = ({
      graphId: id,
      domainType: ns.aml.vocabularies.apiContract.Response,
      item: updated,
      property,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.Response.State.updated, record));
    this.persistance.persist();
    return updated;
  }

  /**
   * @param responseId The response id to delete
   * @param operationId The id of the parent operation that has the response
   */
  override async deleteResponse(responseId: string, operationId: string): Promise<void> {
    await super.deleteResponse(responseId, operationId);
    const record: ApiStoreDeleteRecord = ({
      graphId: responseId,
      domainType: ns.aml.vocabularies.apiContract.Response,
      domainParent: operationId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Response.State.deleted, record));
    this.persistance.persist();
  }

  /**
   * Updates a scalar property of an Example.
   * @param id The domain id of the response.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated example
   */
  override async updateExampleProperty(id: string, property: keyof AmfShapes.IApiDataExample, value: unknown): Promise<AmfShapes.IApiDataExample> {
    const updated = await super.updateExampleProperty(id, property, value);
    const record: ApiStoreChangeRecord<AmfShapes.IApiDataExample> = ({
      graphId: id,
      domainType: ns.aml.vocabularies.apiContract.Example,
      item: updated,
      property,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.Example.State.updated, record));
    this.persistance.persist();
    return updated;
  }

  /**
   * Adds an example to a Payload
   * @param id The if of the Payload to add the example to
   * @param init The example init options
   */
  override async addPayloadExample(id: string, init: ExampleInit): Promise<AmfShapes.IApiDataExample> {
    const result = await super.addPayloadExample(id, init);
    const record: ApiStoreCreateRecord<AmfShapes.IApiDataExample> = ({
      graphId: result.id,
      domainType: ns.aml.vocabularies.apiContract.Example,
      item: result,
      domainParent: id,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Example.State.created, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Removes an example from the Payload.
   * @param payloadId The domain id of the Payload
   * @param exampleId The domain id of the Example to remove.
   */
  override async removePayloadExample(payloadId: string, exampleId: string): Promise<void> {
    await super.removePayloadExample(payloadId, exampleId);
    const record: ApiStoreDeleteRecord = ({
      graphId: exampleId,
      domainType: ns.aml.vocabularies.apiContract.Example,
      domainParent: payloadId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Example.State.deleted, record));
    this.persistance.persist();
  }

  /**
   * Updates a scalar property of a Payload.
   * @param id The domain id of the payload.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated Payload
   */
  override async updatePayloadProperty(id: string, property: keyof ApiDefinitions.IApiPayload, value: unknown): Promise<ApiDefinitions.IApiPayload> {
    const result = await super.updatePayloadProperty(id, property, value);
    const record: ApiStoreChangeRecord<ApiDefinitions.IApiPayload> = ({
      graphId: id,
      domainType: ns.aml.vocabularies.apiContract.Payload,
      item: result,
      property,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.Payload.State.updated, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Creates a new type in the API.
   * @param init The Shape init options.
   */
  override async addCustomDomainProperty(init?: CustomDomainPropertyInit): Promise<ApiDefinitions.IApiCustomDomainExtension> {
    const result = await super.addCustomDomainProperty(init);
    const record: ApiStoreCreateRecord<ApiDefinitions.IApiCustomDomainExtension> = ({
      graphId: result.id,
      domainType: ns.aml.vocabularies.document.DomainProperty,
      item: result,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.CustomProperty.State.created, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Removes a CustomDomainProperty from the API.
   * @param id The domain id of the CustomDomainProperty to remove
   * @returns True when the property was found and removed.
   */
  override async deleteCustomDomainProperty(id: string): Promise<boolean> {
    const result = await super.deleteCustomDomainProperty(id);
    if (result) {
      const record: ApiStoreDeleteRecord = ({
        graphId: id,
        domainType: ns.aml.vocabularies.document.DomainProperty,
      });
      this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.CustomProperty.State.deleted, record));
      this.persistance.persist();
    }
    return result;
  }

  /**
   * Updates a scalar property of a CustomDomainProperty.
   * @param id The domain id of the object.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated custom domain property
   */
  override async updateCustomDomainProperty(id: string, property: keyof ApiDefinitions.IApiCustomDomainExtension, value: unknown): Promise<ApiDefinitions.IApiCustomDomainExtension> {
    const result = await super.updateCustomDomainProperty(id, property, value);
    const record: ApiStoreChangeRecord<ApiDefinitions.IApiCustomDomainExtension> = ({
      graphId: id,
      domainType: ns.aml.vocabularies.document.DomainProperty,
      item: result,
      property,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.CustomProperty.State.updated, record));
    this.persistance.persist();
    return result;
  }

  /**
   * @param operationId The operation domain id
   * @param init The request init options. Optional.
   * @returns The domain id of the created request
   */
  override async addRequest(operationId: string, init: OperationRequestInit | undefined={}): Promise<ApiDefinitions.IApiRequest> {
    const result = await super.addRequest(operationId, init);
    const record: ApiStoreCreateRecord<ApiDefinitions.IApiRequest> = ({
      graphId: result.id,
      domainType: ns.aml.vocabularies.apiContract.Request,
      item: result,
      domainParent: operationId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Request.State.created, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Adds a header to the request.
   * @param requestId The request domain id
   * @param init The Parameter init options.
   */
  override async addRequestHeader(requestId: string, init: ParameterInit): Promise<ApiDefinitions.IApiParameter> {
    const result = await super.addRequestHeader(requestId, init);
    const record: ApiStoreCreateRecord<ApiDefinitions.IApiParameter> = ({
      graphId: result.id,
      domainType: ns.aml.vocabularies.apiContract.Parameter,
      item: result,
      domainParent: requestId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Parameter.State.created, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Removes a header from a request
   * @param requestId The request id to remove the header from
   * @param headerId The header id to remove.
   * @returns Updated request
   */
  override async removeRequestHeader(requestId: string, headerId: string): Promise<ApiDefinitions.IApiRequest> {
    const result = await super.removeRequestHeader(requestId, headerId);
    const record: ApiStoreDeleteRecord = ({
      graphId: headerId,
      domainType: ns.aml.vocabularies.apiContract.Parameter,
      domainParent: requestId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Parameter.State.deleted, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Adds a query parameter to the request.
   * @param requestId The request domain id
   * @param init The Parameter init options.
   */
  override async addRequestQueryParameter(requestId: string, init: ParameterInit): Promise<ApiDefinitions.IApiParameter> {
    const result = await super.addRequestQueryParameter(requestId, init);
    const record: ApiStoreCreateRecord<ApiDefinitions.IApiParameter> = ({
      graphId: result.id,
      domainType: ns.aml.vocabularies.apiContract.Parameter,
      item: result,
      domainParent: requestId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Parameter.State.created, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Removes a query parameter from a request
   * @param requestId The request id to remove the parameter from
   * @param paramId The parameter id to remove.
   * @returns Updated request
   */
  override async removeRequestQueryParameter(requestId: string, paramId: string): Promise<ApiDefinitions.IApiRequest> {
    const result = await super.removeRequestQueryParameter(requestId, paramId);
    const record: ApiStoreDeleteRecord = ({
      graphId: paramId,
      domainType: ns.aml.vocabularies.apiContract.Parameter,
      domainParent: requestId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Parameter.State.deleted, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Adds a cookie to the request.
   * @param requestId The request domain id
   * @param init The Parameter init options.
   */
  override async addRequestCookieParameter(requestId: string, init: ParameterInit): Promise<ApiDefinitions.IApiParameter> {
    const result = await super.addRequestCookieParameter(requestId, init);
    const record: ApiStoreCreateRecord<ApiDefinitions.IApiParameter> = ({
      graphId: result.id,
      domainType: ns.aml.vocabularies.apiContract.Parameter,
      item: result,
      domainParent: requestId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Parameter.State.created, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Removes a cookie parameter from a request
   * @param requestId The request id to remove the parameter from
   * @param paramId The parameter id to remove.
   * @returns Updated request
   */
  override async removeRequestCookieParameter(requestId: string, paramId: string): Promise<ApiDefinitions.IApiRequest> {
    const result = await super.removeRequestCookieParameter(requestId, paramId);
    const record: ApiStoreDeleteRecord = ({
      graphId: paramId,
      domainType: ns.aml.vocabularies.apiContract.Parameter,
      domainParent: requestId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Parameter.State.deleted, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Creates a new payload in the request.
   * @param requestId The request domain id
   * @param init The payload init options
   * @returns Created payload object.
   */
  override async addRequestPayload(requestId: string, init: PayloadInit): Promise<ApiDefinitions.IApiPayload> {
    const result = await super.addRequestPayload(requestId, init);
    const record: ApiStoreCreateRecord<ApiDefinitions.IApiPayload> = ({
      graphId: result.id,
      domainType: ns.aml.vocabularies.apiContract.Payload,
      item: result,
      domainParent: requestId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Payload.State.created, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Removes a payload from a request object.
   * @param requestId The request domain id
   * @param payloadId The payload domain id.
   */
  override async removeRequestPayload(requestId: string, payloadId: string): Promise<void> {
    await super.removeRequestPayload(requestId, payloadId);
    const record: ApiStoreDeleteRecord = ({
      graphId: payloadId,
      domainType: ns.aml.vocabularies.apiContract.Payload,
      domainParent: requestId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Payload.State.deleted, record));
    this.persistance.persist();
  }

  /**
   * @param requestId The request id to delete
   * @param operationId The id of the parent operation that has the request
   */
  override async deleteRequest(requestId: string, operationId: string): Promise<void> {
    await super.deleteRequest(requestId, operationId);
    const record: ApiStoreDeleteRecord = ({
      graphId: requestId,
      domainType: ns.aml.vocabularies.apiContract.Request,
      domainParent: operationId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Request.State.deleted, record));
    this.persistance.persist();
  }

  /**
   * Updates a scalar property of a Request.
   * @param id The domain id of the request.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated request
   */
  override async updateRequestProperty(id: string, property: keyof ApiDefinitions.IApiRequest, value: unknown): Promise<ApiDefinitions.IApiRequest> {
    const updated = await super.updateRequestProperty(id, property, value);
    const record: ApiStoreChangeRecord<ApiDefinitions.IApiRequest> = ({
      graphId: id,
      domainType: ns.aml.vocabularies.apiContract.Request,
      item: updated,
      property,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.Request.State.updated, record));
    this.persistance.persist();
    return updated;
  }

  /**
   * Updates a scalar property of a Parameter.
   * @param id The domain id of the parameter.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated Parameter
   */
  override async updateParameterProperty(id: string, property: keyof ApiDefinitions.IApiParameter, value: unknown): Promise<ApiDefinitions.IApiParameter> {
    const updated = await super.updateParameterProperty(id, property, value);
    const record: ApiStoreChangeRecord<ApiDefinitions.IApiParameter> = ({
      graphId: id,
      domainType: ns.aml.vocabularies.apiContract.Parameter,
      item: updated,
      property,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.Parameter.State.updated, record));
    this.persistance.persist();
    return updated;
  }

  /**
   * Adds an example to a Parameter
   * @param id The if of the Parameter to add the example to
   * @param init The example init options
   */
  override async addParameterExample(id: string, init: ExampleInit): Promise<AmfShapes.IApiDataExample> {
    const result = await super.addParameterExample(id, init);
    const record: ApiStoreCreateRecord<AmfShapes.IApiDataExample> = ({
      graphId: result.id,
      domainType: ns.aml.vocabularies.apiContract.Example,
      item: result,
      domainParent: id,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Example.State.created, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Removes an example from the parameter.
   * @param paramId The domain id of the Parameter
   * @param exampleId The domain id of the Example to remove.
   */
  override async removeParameterExample(paramId: string, exampleId: string): Promise<void> {
    await super.removeParameterExample(paramId, exampleId);
    const record: ApiStoreDeleteRecord = ({
      graphId: exampleId,
      domainType: ns.aml.vocabularies.apiContract.Example,
      domainParent: paramId,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Example.State.deleted, record));
    this.persistance.persist();
  }

  /**
   * Adds a new documentation object to the graph.
   * @param init The initialization properties
   * @returns The created documentation.
   */
  override async addDocumentation(init: DocumentationInit): Promise<ApiDefinitions.IApiDocumentation> {
    const doc = await super.addDocumentation(init);
    const record: ApiStoreCreateRecord<ApiDefinitions.IApiDocumentation> = ({
      graphId: doc.id,
      domainType: ns.aml.vocabularies.core.CreativeWork,
      item: doc,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Documentation.State.created, record));
    this.persistance.persist();
    return doc;
  }

  /**
   * Updates a scalar property of a documentation.
   * @param id The domain id of the documentation.
   * @param {keyof CreativeWork} property The property name to update
   * @param {any} value The new value to set.
   */
  override async updateDocumentationProperty(id: string, property: keyof ApiDefinitions.IApiDocumentation, value: unknown): Promise<ApiDefinitions.IApiDocumentation> {
    const updated = await super.updateDocumentationProperty(id, property, value);
    const record: ApiStoreChangeRecord<ApiDefinitions.IApiDocumentation> = ({
      graphId: id,
      domainType: ns.aml.vocabularies.core.CreativeWork,
      item: updated,
      property,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.Documentation.State.updated, record));
    this.persistance.persist();
    return updated;
  }

  /**
   * Removes the documentation from the graph.
   * @param id The domain id of the documentation object
   */
  override async deleteDocumentation(id: string): Promise<void> {
    await super.deleteDocumentation(id);
    const record: ApiStoreDeleteRecord = ({
      graphId: id,
      domainType: ns.aml.vocabularies.core.CreativeWork,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Documentation.State.deleted, record));
    this.persistance.persist();
  }

  /**
   * Creates a new type in the API.
   * @param init The Shape init options.
   */
  override async addType(init?: ShapeInit): Promise<AmfShapes.IShapeUnion> {
    const result = await super.addType(init);
    const record: ApiStoreCreateRecord<AmfShapes.IShapeUnion> = ({
      graphId: result.id,
      domainType: result.types[0],
      item: result,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Type.State.created, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Removes a type for a given domain id.
   * @param id The type domain id.
   */
  override async deleteType(id: string): Promise<boolean> {
    const type = await this.getType(id);
    const result = await super.deleteType(id);
    if (!result) {
      return false;
    }
    const record: ApiStoreDeleteRecord = ({
      graphId: id,
      domainType: type.types[0],
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Type.State.deleted, record));
    this.persistance.persist();
    return true;
  }

  /**
   * Updates a scalar property of a type.
   * @param id The domain id of the type.
   * @param property The property name to update
   * @param value The new value to set.
   */
  override async updateTypeProperty(id: string, property: string, value: unknown): Promise<AmfShapes.IShapeUnion> {
    const type = await super.updateTypeProperty(id, property, value);
    const record: ApiStoreChangeRecord<AmfShapes.IShapeUnion> = ({
      graphId: id,
      domainType: type.types[0],
      item: type,
      property,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.Type.State.updated, record));
    this.persistance.persist();
    return type;
  }

  /**
   * Creates a new property on a type.
   * @param id The id of the type to add the property to.
   * @param init The property initialization configuration.
   * @throws {Error} An error when the type couldn't be find.
   * @throws {Error} An error when the type is not a NodeShape.
   */
  override async addPropertyShape(id: string, init: PropertyShapeInit): Promise<AmfShapes.IApiPropertyShape> {
    const result = await super.addPropertyShape(id, init);
    const record: ApiStoreCreateRecord<AmfShapes.IApiPropertyShape> = ({
      graphId: result.id,
      domainType: ns.w3.shacl.PropertyShape,
      item: result,
      domainParent: id,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateCreateEvent(EventTypes.Type.State.propertyCreated, record));
    this.persistance.persist();
    return result;
  }

  /**
   * Removes a property from a node shape.
   * @param typeId The domain id of a parent type
   * @param propertyId The id of the property to remove.
   * @throws {Error} An error when the type couldn't be find.
   */
  override async deletePropertyShape(typeId: string, propertyId: string): Promise<void> {
    await super.deletePropertyShape(typeId, propertyId);
    const record: ApiStoreDeleteRecord = ({
      graphId: propertyId,
      domainParent: typeId,
      domainType: ns.w3.shacl.PropertyShape,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateDeleteEvent(EventTypes.Type.State.propertyDeleted, record));
    this.persistance.persist();
  }

  /**
   * Updates a scalar property of a property of a NodeShape.
   * @param parent The domain id of the parent type.
   * @param id The domain id of the type.
   * @param property The property name to update
   * @param value The new value to set.
   */
  override async updatePropertyShapeProperty(parent: string, id: string, property: keyof AmfShapes.IApiPropertyShape, value: unknown): Promise<AmfShapes.IApiPropertyShape> {
    const type = await super.updatePropertyShapeProperty(parent, id, property, value);
    const record: ApiStoreChangeRecord<AmfShapes.IApiPropertyShape> = ({
      graphId: id,
      domainType: ns.w3.shacl.PropertyShape,
      item: type,
      property,
      domainParent: parent,
    });
    this.eventsTarget.dispatchEvent(new ApiStoreStateUpdateEvent(EventTypes.Type.State.propertyUpdated, record));
    this.persistance.persist();
    return type;
  }

  /**
   * Creates an instance of the web worker.
   */
  [createWorker](): Worker {
    const { options } = this;
    let worker;
    if (typeof options.createWebWorker === 'function') {
      worker = options.createWebWorker();
    } else {
      const url = this[readWorkerUrl]();
      worker = new Worker(url, {
        type: 'module',
        name: 'AmfServiceWorker',
      });
    }
    worker.addEventListener('message', this[responseHandler]);
    worker.addEventListener('error', this[errorHandler]);
    return worker;
  }

  /**
   * The worker location in the final build of the app may be anywhere.
   */
  [readWorkerUrl](): string {
    const { workerLocation } = this.options;
    const url = workerLocation || new URL('../workers/AmfWorker.js', import.meta.url).toString();
    return url;
  }

  [responseHandler](e: MessageEvent): void {
    const result = e.data as WorkerResponse;
    this[processResponse](result);
  }

  /**
   * Sends a message to the worker.
   * @param type The type of the message
   * @param args A list of optional arguments.
   */
  [sendMessage](type: string, ...args: unknown[]): Promise<unknown> {
    const { worker } = this;
    const id = this[getId]();
    const result = this[createResponsePromise](id);
    const message: WorkerMessage = ({
      id,
      type,
      arguments: args,
    });
    worker.postMessage(message);
    return result;
  }
}
