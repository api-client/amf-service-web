import { AmfNamespace as ns, ApiDefinitions, AmfShapes } from "@api-client/core/build/esm/browser.js";
import type * as AMF from 'amf-client-js';
import { ApiProjectResourceLoader } from './ApiProjectResourceLoader.js';
import { ApiSerializer } from './ApiSerializer.js';
import { isShape } from '../lib/Utils.js';
import { ApiCustomDomainExtensionListItem, ApiInit, ApiNodeShapeListItem, ApiResource, ApiServerInit, CustomDomainPropertyInit, DocumentationInit, EndPointInit, ExampleInit, OperationInit, OperationRequestInit, OperationResponseInit, ParameterInit, ParserMediaTypes, ParserVendors, PayloadInit, PropertyShapeInit, ShapeInit } from "../types.js";
import * as Validator from '../lib/Validation.js';

/**
 * The service that manipulates a single API graph object.
 * It exposes an API to read, update, and delete nodes in the API's graph object.
 * It has own (graph unrelated) methods to list API objects. These are useful when building a UI.
 * 
 * Note on using the AMF parser. This library does not import the AMF parser 
 * which is NodeJS only library and won't work in a browser. You need to pass a reference 
 * to the AMF parser manually. This way this library can be lean and agile.
 */
export class AmfService {
  /**
   * A reference to the AMF parser. 
   * Since this class does not import AMF library, the reference to it has to be set.
   */
  amf: typeof AMF;

  _graph?: AMF.Document

  get graph(): AMF.Document {
    if (!this._graph) {
      throw new Error('No API graph set.');
    }
    return this._graph;
  }

  /**
   * The AMF client used initialize the API.
   */
  client?: AMF.AMFBaseUnitClient

  /**
   * The AMF element client used initialize the API.
   */
  elementClient?: AMF.AMFElementClient;

  /**
   * @param amf A reference to the AMF parser library.
   */
  constructor(amf: typeof AMF) {
    this.amf = amf;
  }

  /**
   * Loads an API project into the store.
   * @param contents The list of files to process.
   * @param vendor The vendor of the API.
   * @param mediaType The API media type
   * @param main The name of the main API file.
   */
  async loadApi(contents: ApiResource[], vendor: ParserVendors, mediaType: ParserMediaTypes, main: string): Promise<void> {
    const entryPoint = contents.find((item) => item.path === main);
    if (!entryPoint) {
      throw new Error('Unable to find the API entry point');
    }
    let configuration: AMF.AMFConfiguration;
    switch (vendor) {
      case 'OAS 2.0': configuration = this.amf.OASConfiguration.OAS20(); break;
      case 'OAS 3.0': configuration = this.amf.OASConfiguration.OAS30(); break;
      case 'RAML 1.0': configuration = this.amf.RAMLConfiguration.RAML10(); break;
      case 'RAML 0.8': configuration = this.amf.RAMLConfiguration.RAML08(); break;
      case 'ASYNC 2.0': configuration = this.amf.AsyncAPIConfiguration.Async20(); break;
      default: throw new Error(`Unable to recognize API type: ${vendor}`);
      // default: client = this.amf.AMFGraphConfiguration.predefined().createClient();
    }

    const customResourceLoader = this.amf.ResourceLoaderFactory.create(
      new ApiProjectResourceLoader(contents, this.amf)
    );
    const configured = configuration.withResourceLoader(customResourceLoader);
    this.client = configured.baseUnitClient();
    this.elementClient = configured.elementClient();
    const result = await this.client.parseContent(entryPoint.contents, mediaType);

    if (!result.conforms) {
      // eslint-disable-next-line no-console
      console.log(result.toString());
    }
    this._graph = result.baseUnit as AMF.Document;
  }

  /**
   * Loads existing API model into to graph as Document.
   * @param vendor The parser type to use to parse the contents.
   */
  async loadGraph(model: string, vendor: ParserVendors): Promise<void> {
    let configuration: AMF.AMFConfiguration;
    switch (vendor) {
      case 'OAS 2.0': configuration = this.amf.OASConfiguration.OAS20(); break;
      case 'OAS 3.0': configuration = this.amf.OASConfiguration.OAS30(); break;
      case 'RAML 1.0': configuration = this.amf.RAMLConfiguration.RAML10(); break;
      case 'RAML 0.8': configuration = this.amf.RAMLConfiguration.RAML08(); break;
      case 'ASYNC 2.0': configuration = this.amf.AsyncAPIConfiguration.Async20(); break;
      default: throw new Error(`Unable to recognize API type: ${vendor}`);
    }
    this.client = configuration.baseUnitClient();
    this.elementClient = configuration.elementClient();
    const result = await this.client.parseContent(model);
    if (!result.conforms) {
      // eslint-disable-next-line no-console
      console.log(result.toString());
    }
    this._graph = result.baseUnit as AMF.Document;
  }

  /**
   * Creates new Document in the graph.
   * @param init Api init options
   * @returns The domain id of the created WebAPI
   */
  async createWebApi(init?: ApiInit): Promise<string> {
    const opts = init || {};
    const wa = new this.amf.WebApi();
    if (opts.name) {
      wa.withName(opts.name);
    }
    if (opts.description) {
      wa.withDescription(opts.description);
    }
    if (opts.version) {
      wa.withVersion(opts.version);
    }
    if (opts.termsOfService) {
      wa.withTermsOfService(opts.termsOfService);
    }
    if (Array.isArray(opts.schemes) && opts.schemes.length) {
      wa.withSchemes(opts.schemes);
    }
    if (Array.isArray(opts.accepts) && opts.accepts.length) {
      wa.withAccepts(opts.accepts);
    }
    if (Array.isArray(opts.contentType) && opts.contentType.length) {
      wa.withContentType(opts.contentType);
    }
    const doc = new this.amf.Document().withId('amf://document');
    doc.withEncodes(wa);
    this._graph = doc;
    return wa.id;
  }

  /**
   * Reads the WebApi property.
   */
  webApi(): AMF.WebApi | undefined {
    return this.graph?.encodes as AMF.WebApi | undefined;
  }

  /**
   * Generates RAML api from the current graph.
   * @returns RAML value for the API.
   */
  async generateRaml(): Promise<string> {
    const { graph } = this;
    const configuration = this.amf.RAMLConfiguration.RAML10();
    const client = configuration.baseUnitClient();
    return client.render(graph);
  }

  /**
   * Generates json+ld from the current graph.
   * @returns JSON+ld value of the API.
   */
  async generateGraph(): Promise<string> {
    const { graph } = this;
    const configuration = this.amf.AMLConfiguration.predefined();
    const client = configuration.baseUnitClient();
    return client.render(graph, 'application/ld+json');
  }

  /**
   * Checks whether an API is currently loaded.
   * @returns True when the API is loaded.
   */
  hasApi(): boolean {
    return !!this._graph;
  }

  /**
   * Reads basic info about the API.
   */
  async getApi(): Promise<ApiDefinitions.IApiBase> {
    const api = this.webApi();
    if (!api) {
      throw new Error('No API in the graph.');
    }

    return ApiSerializer.api(api);
  }

  /**
   * @returns List of servers in this API.
   */
  async listServers(): Promise<ApiDefinitions.IApiServer[]> {
    const api = this.webApi();
    if (!api) {
      return [];
    }
    if (Array.isArray(api.servers) && api.servers.length) {
      return api.servers.map((s) => ApiSerializer.server(s));
    }
    return [];
    // const result: ApiDefinitions.IApiServer[] = [];
    // if (Array.isArray(api.servers) && api.servers.length) {
    //   api.servers.forEach((s) => {
    //     const item: ApiDefinitions.IApiServer = {
    //       id: s.id,
    //       url: s.url.value(),
    //       variables: [],
    //       customDomainProperties: [],
    //     };
    //     if (!s.description.isNullOrEmpty) {
    //       item.description = s.description.value();
    //     }
    //     if (Array.isArray(s.variables) && s.variables.length) {
    //       item.variables = s.variables.map((i) => i.id);
    //     }
    //     result.push(item);
    //   });
    // }
    // return result;
  }

  /**
   * Adds a server definition to the API.
   * @returns The instance of the created server
   */
  async addServer(init: ApiServerInit): Promise<ApiDefinitions.IApiServer> {
    if (!init.url) {
      throw new Error(`The server URL is not defined.`);
    }
    const api = this.webApi();
    if (!api) {
      throw new Error(`No API in the graph.`);
    }
    const srv = api.withServer(init.url) as AMF.Server;
    if (init.description) {
      srv.withDescription(init.description);
    }
    if (Array.isArray(init.variables) && init.variables.length) {
      init.variables.forEach(v => srv.withVariable(v));
    }
    return ApiSerializer.server(srv);
  }

  /**
   * Reads the Server definition from the graph.
   * @param id The domain id of the Server to read
   */
  async getServer(id: string): Promise<ApiDefinitions.IApiServer> {
    const srv = this.graph.findById(id) as AMF.Server | undefined;
    if (!srv) {
      throw new Error(`No Server for ${id}`);
    }
    return ApiSerializer.server(srv);
  }

  /**
   * List all endpoints in the API.
   */
  async listEndpoints(): Promise<ApiDefinitions.IApiEndPointListItem[]> {
    const api = this.webApi();
    if (!api) {
      throw new Error(`No API in the graph.`);
    }
    const result = api.endPoints.map((ep) => ApiSerializer.endPointListItem(ep));
    return result;
  }

  /**
   * Lists all endpoints with operations included into the result.
   */
  async listEndpointsWithOperations(): Promise<ApiDefinitions.IApiEndPointWithOperationsListItem[]> {
    const api = this.webApi();
    if (!api) {
      throw new Error(`No API in the graph.`);
    }
    return api.endPoints.map((ep) => ApiSerializer.endPointWithOperationsListItem(ep));
  }

  /**
   * Adds a new endpoint to the API and returns generated id for the endpoint.
   * @param init EndPoint init parameters
   * @returns The generated id for the endpoint.
   */
  async addEndpoint(init: EndPointInit): Promise<ApiDefinitions.IApiEndPoint> {
    if (!init.path) {
      throw new Error(`The path argument is required.`);
    }
    const api = this.webApi();
    if (!api) {
      throw new Error(`No API in the graph.`);
    }
    const endpoint = api.withEndPoint(init.path);
    if (init.description) {
      endpoint.withDescription(init.description);
    }
    if (init.name) {
      endpoint.withName(init.name);
    }
    if (init.summary) {
      endpoint.withSummary(init.summary);
    }
    return ApiSerializer.endPoint(endpoint);
  }

  /**
   * Finds an endpoint by path or domain id.
   * @param pathOrId The domain id of the endpoint or its path.
   */
  findEndpoint(pathOrId: string): AMF.EndPoint | undefined {
    const api = this.webApi();
    if (!api) {
      throw new Error(`No API in the graph.`);
    }
    return api.endPoints.find((ep) => ep.id === pathOrId || (ep.path && ep.path.value()) === pathOrId);
  }

  /**
   * Removes endpoint from the API.
   * @param id The endpoint domain id.
   */
  async deleteEndpoint(id: string): Promise<void> {
    const api = this.webApi();
    if (!api) {
      throw new Error(`No API in the graph.`);
    }
    const remaining = api.endPoints.filter(item => item.id !== id);
    api.withEndPoints(remaining);
  }

  /**
   * Reads the information about an endpoint and returns it.
   * @param idOrPath The domain id of the endpoint or its path.
   */
  async getEndpoint(idOrPath: string): Promise<ApiDefinitions.IApiEndPoint> {
    const ep = this.findEndpoint(idOrPath);
    if (!ep) {
      throw new Error(`No end point ${idOrPath} in the graph`);
    }
    return ApiSerializer.endPoint(ep);
  }

  /**
   * Updates a scalar property of an endpoint.
   * @param id The domain id of the endpoint.
   * @param property The property name to update
   * @param value The new value to set.
   */
  async updateEndpointProperty(id: string, property: keyof ApiDefinitions.IApiEndPoint, value: unknown): Promise<ApiDefinitions.IApiEndPoint> {
    const ep = this.graph.findById(id) as AMF.EndPoint | undefined;
    if (!ep) {
      throw new Error(`No endpoint for given id ${id}`);
    }
    switch (property) {
      case 'name': ep.withName(Validator.ensureString(value)); break;
      case 'description': ep.withDescription(Validator.ensureString(value)); break;
      case 'summary': ep.withSummary(Validator.ensureString(value)); break;
      case 'path': ep.withPath(Validator.ensureString(value)); break;
      default: throw new Error(`Unsupported patch property of EndPoint: ${property}`);
    }
    return ApiSerializer.endPoint(ep);
  }

  /**
   * Adds an empty operation to an endpoint.
   * @param pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param init The operation initialize options
   */
  async addOperation(pathOrId: string, init: OperationInit): Promise<ApiDefinitions.IApiOperation> {
    if (!init.method) {
      throw new Error(`The method argument is required.`);
    }
    const ep = this.findEndpoint(pathOrId);
    if (!ep) {
      throw new Error(`Endpoint ${pathOrId} not found in the graph.`);
    }
    const operation = ep.withOperation(init.method);
    if (init.name) {
      operation.withName(init.name);
    }
    if (init.description) {
      operation.withDescription(init.description);
    }
    if (init.summary) {
      operation.withSummary(init.summary);
    }
    if (typeof init.deprecated === 'boolean') {
      operation.withDeprecated(init.deprecated);
    }
    if (Array.isArray(init.schemes) && init.schemes.length) {
      operation.withSchemes(init.schemes);
    }
    if (Array.isArray(init.accepts) && init.accepts.length) {
      operation.withAccepts(init.accepts);
    }
    if (Array.isArray(init.contentType) && init.contentType.length) {
      operation.withContentType(init.contentType);
    }
    return ApiSerializer.operation(operation);
  }

  /**
   * Searches for an operation in the API.
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  findOperation(methodOrId: string, pathOrId?: string | undefined): AMF.Operation | undefined {
    if (pathOrId) {
      const ep = this.findEndpoint(pathOrId);
      if (!ep) {
        return undefined;
      }
      return ep.operations.find((op) => op.id === methodOrId || (op.method && op.method.value()) === methodOrId);
    }
    const api = this.webApi();
    if (!api) {
      throw new Error(`No API in the graph.`);
    }
    const { endPoints } = api;
    for (let i = 0, len = endPoints.length; i < len; i++) {
      const ep = endPoints[i];
      const operation = ep.operations.find((op) => op.id === methodOrId || (op.method && op.method.value()) === methodOrId);
      if (operation) {
        return operation;
      }
    }
    return undefined;
  }

  /**
   * Reads the operation model.
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  async getOperation(methodOrId: string, pathOrId?: string | undefined): Promise<ApiDefinitions.IApiOperation> {
    const op = this.findOperation(methodOrId, pathOrId);
    if (!op) {
      throw new Error(`No operation ${methodOrId} in the graph`);
    }
    return ApiSerializer.operation(op);
  }

  /**
   * Lists all operations in an endpoint.
   * @param pathOrId The domain id of the endpoint to list operations from or its path.
   */
  async listOperations(pathOrId: string): Promise<ApiDefinitions.IApiOperationListItem[]> {
    const ep = this.findEndpoint(pathOrId);
    if (!ep) {
      throw new Error(`EndPoint not found: ${pathOrId}`);
    }
    return ep.operations.map((op) => ApiSerializer.operationListItem(op));
  }

  /**
   * Removes an operation from the graph.
   * @param id The operation id to remove.
   * @param endpointId The domain id of the parent endpoint.
   * @returns The id of the affected endpoint. Undefined when operation or endpoint cannot be found.
   */
  async deleteOperation(id: string, endpointId: string): Promise<string | undefined> {
    const endpoint = this.graph.findById(endpointId) as AMF.EndPoint | undefined;
    if (!endpoint) {
      throw new Error(`No EndPoint for given id ${id}`);
    }
    const remaining = endpoint.operations.filter((op) => op.id !== id);
    endpoint.withOperations(remaining);
    return endpoint.id;
  }

  /**
   * Finds an endpoint that has the operation.
   * @param methodOrId Method name or the domain id of the operation to find
   * @param pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   */
  async getOperationParent(methodOrId: string, pathOrId?: string): Promise<ApiDefinitions.IApiEndPoint | undefined> {
    const operation = await this.getOperation(methodOrId, pathOrId);
    if (!operation) {
      return undefined;
    }
    const parent = this.findOperationParent(operation.id);
    if (!parent) {
      return undefined;
    }
    return ApiSerializer.endPoint(parent);
  }

  /**
   * Finds the parent endpoint for the operation
   * @param id The id of the operation
   */
  findOperationParent(id: string): AMF.EndPoint | undefined {
    const api = this.webApi();
    if (!api) {
      throw new Error(`No API in the graph.`);
    }
    const { endPoints } = api;
    for (let i = 0, len = endPoints.length; i < len; i++) {
      const ep = endPoints[i];
      const operation = ep.operations.find((op) => op.id === id);
      if (operation) {
        return ep;
      }
    }
    return undefined;
  }

  /**
   * Updates a scalar property of an operation.
   * @param id The domain id of the operation.
   * @param property The property name to update
   * @param value The new value to set.
   */
  async updateOperationProperty(id: string, property: keyof ApiDefinitions.IApiOperation, value: unknown): Promise<ApiDefinitions.IApiOperation> {
    const op = this.graph.findById(id) as AMF.Operation | undefined;
    if (!op) {
      throw new Error(`No operation for given id ${id}`);
    }
    switch (property) {
      case 'method': op.withMethod(Validator.ensureString(value)); break;
      case 'name': op.withName(Validator.ensureString(value)); break;
      case 'description': op.withDescription(Validator.ensureString(value)); break;
      case 'summary': op.withSummary(Validator.ensureString(value)); break;
      case 'deprecated': op.withDeprecated(Validator.ensureBoolean(value)); break;
      case 'schemes': op.withSchemes(Validator.ensureStringArray(value)); break;
      case 'accepts': op.withAccepts(Validator.ensureStringArray(value)); break;
      case 'contentType': op.withContentType(Validator.ensureStringArray(value)); break;
      default: throw new Error(`Unsupported patch property of Operation: ${property}`);
    }
    return ApiSerializer.operation(op);
  }

  /**
   * @param operationId The operation domain id
   * @param init The response init options.
   * @returns The domain id of the created response
   */
  async addResponse(operationId: string, init: OperationResponseInit): Promise<ApiDefinitions.IApiResponse> {
    const op = this.graph.findById(operationId) as AMF.Operation;
    if (!op) {
      throw new Error(`No operation for given id ${operationId}`);
    }
    const model = op.withResponse(Validator.ensureString(init.name));
    if (init.statusCode) {
      model.withStatusCode(Validator.ensureString(init.statusCode));
    }
    if (init.description) {
      model.withDescription(Validator.ensureString(init.description));
    }
    if (Array.isArray(init.headers) && init.headers.length) {
      Validator.ensureStringArray(init.headers).forEach((h) => model.withHeader(h).withBinding('header'));
    }
    if (Array.isArray(init.payloads) && init.payloads.length) {
      Validator.ensureStringArray(init.payloads).forEach((p) => model.withPayload(p));
    }
    return ApiSerializer.response(model);
  }

  /**
   * Reads the response data from the graph.
   * @param id The domain id of the response.
   */
  async getResponse(id: string): Promise<ApiDefinitions.IApiResponse> {
    const response = this.graph.findById(id) as AMF.Response;
    if (!response) {
      throw new Error(`No Response for ${id}`);
    }
    return ApiSerializer.response(response);
  }

  /**
   * Reads Response data in a bulk operation
   * @param ids The ids to read
   */
  async getResponses(ids: string[]): Promise<(ApiDefinitions.IApiResponse | undefined)[]> {
    const result: (ApiDefinitions.IApiResponse | undefined)[] = [];
    ids.forEach((id) => {
      const param = this.graph.findById(id) as AMF.Response;
      if (param) {
        result.push(ApiSerializer.response(param));
      } else {
        result.push(undefined);
      }
    });
    return result;
  }

  /**
   * Adds a header to the response.
   * @param responseId The response domain id
   * @param init The Parameter init options.
   */
  async addResponseHeader(responseId: string, init: ParameterInit): Promise<ApiDefinitions.IApiParameter> {
    const response = this.graph.findById(responseId) as AMF.Response;
    if (!response) {
      throw new Error(`No response for given id ${responseId}`);
    }
    const param = response.withHeader(init.name);
    this.fillParameter(param, init);
    return ApiSerializer.parameter(param);
  }

  /**
   * Removes a header from a response
   * @param responseId The response id to remove the header from
   * @param headerId The header id to remove.
   * @returns Updated response
   */
  async removeResponseHeader(responseId: string, headerId: string): Promise<ApiDefinitions.IApiResponse> {
    const response = this.graph.findById(responseId) as AMF.Response;
    if (!response) {
      throw new Error(`No response for given id ${responseId}`);
    }
    const remaining = response.headers.filter((i) => i.id !== headerId);
    response.withHeaders(remaining);
    return ApiSerializer.response(response);
  }

  /**
   * Creates a new payload in the response.
   * @param responseId The response domain id
   * @param init The payload init options
   * @returns Created payload object.
   */
  async addResponsePayload(responseId: string, init: PayloadInit): Promise<ApiDefinitions.IApiPayload> {
    const response = this.graph.findById(responseId) as AMF.Response;
    if (!response) {
      throw new Error(`No Response for ${responseId}`);
    }
    const p = response.withPayload(init.mediaType);
    if (init.name) {
      p.withName(init.name);
    }
    return ApiSerializer.payload(p);
  }

  /**
   * Removes a payload from a response object.
   * @param responseId The response domain id
   * @param payloadId The payload domain id.
   */
  async removeResponsePayload(responseId: string, payloadId: string): Promise<void> {
    const response = this.graph.findById(responseId) as AMF.Response;
    if (!response) {
      throw new Error(`No Response for ${responseId}`);
    }
    const remaining = response.payloads.filter((item) => item.id !== payloadId);
    response.withPayloads(remaining);
  }

  /**
   * Updates a scalar property of a Response.
   * @param id The domain id of the response.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated response
   */
  async updateResponseProperty(id: string, property: keyof ApiDefinitions.IApiResponse, value: unknown): Promise<ApiDefinitions.IApiResponse> {
    const response = this.graph.findById(id) as AMF.Response;
    if (!response) {
      throw new Error(`No response for given id ${id}`);
    }
    switch (property) {
      case 'name': response.withName(Validator.ensureString(value)); break;
      case 'description': response.withDescription(Validator.ensureString(value)); break;
      case 'statusCode': response.withStatusCode(Validator.ensureString(value)); break;
      default: throw new Error(`Unsupported patch property of Response: ${property}`);
    }
    return ApiSerializer.response(response);
  }

  /**
   * @param responseId The response id to delete
   * @param operationId The id of the parent operation that has the response
   */
  async deleteResponse(responseId: string, operationId: string): Promise<void> {
    const operation = this.findOperation(operationId);
    if (!operation) {
      throw new Error(`No operation for given id ${operationId}`);
    }
    const remaining = operation.responses.filter((r) => r.id !== responseId);
    operation.withResponses(remaining);
  }

  /**
   * Reads example value from the store.
   * @param id The id of the example to read.
   */
  async getExample(id: string): Promise<AmfShapes.IApiDataExample> {
    const example = this.graph.findById(id) as AMF.Example;
    if (!example) {
      throw new Error(`No Example in the graph when reading an example (${id})`);
    }
    return ApiSerializer.example(example);
  }

  /**
   * Reads Example data in a bulk operation
   * @param ids The ids to read
   */
  async getExamples(ids: string[]): Promise<(AmfShapes.IApiDataExample | undefined)[]> {
    const result: (AmfShapes.IApiDataExample | undefined)[] = [];
    ids.forEach((id) => {
      const param = this.graph.findById(id) as AMF.Example;
      if (param) {
        result.push(ApiSerializer.example(param));
      } else {
        result.push(undefined);
      }
    });
    return result;
  }

  /**
   * Updates a scalar property of an Example.
   * @param id The domain id of the response.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated example
   */
  async updateExampleProperty(id: string, property: keyof AmfShapes.IApiDataExample, value: unknown): Promise<AmfShapes.IApiDataExample> {
    const example = this.graph.findById(id) as AMF.Example;
    if (!example) {
      throw new Error(`No example in the graph when updating example (${id})`);
    }
    switch (property) {
      case 'name': example.withName(Validator.ensureString(value)); break;
      case 'displayName': example.withDisplayName(Validator.ensureString(value)); break;
      case 'description': example.withDescription(Validator.ensureString(value)); break;
      case 'value': example.withValue(Validator.ensureString(value)); break;
      case 'mediaType': example.withMediaType(Validator.ensureString(value)); break;
      case 'strict': example.withStrict(Validator.ensureBoolean(value)); break;
      default: throw new Error(`Unknown property "${property}" when updating an example.`);
    }
    return ApiSerializer.example(example);
  }

  /**
   * Reads Payload data from the graph
   * @param id The domain id of the payload
   */
  async getPayload(id: string): Promise<ApiDefinitions.IApiPayload> {
    const payload = this.graph.findById(id) as AMF.Payload;
    if (!payload) {
      throw new Error(`No Payload for ${id}`);
    }
    return ApiSerializer.payload(payload);
  }

  /**
   * Reads Payload data in a bulk operation
   * @param ids The ids to read
   */
  async getPayloads(ids: string[]): Promise<(ApiDefinitions.IApiPayload | undefined)[]> {
    const result: (ApiDefinitions.IApiPayload | undefined)[] = [];
    ids.forEach((id) => {
      const param = this.graph.findById(id) as AMF.Payload;
      if (param) {
        result.push(ApiSerializer.payload(param));
      } else {
        result.push(undefined);
      }
    });
    return result;
  }

  /**
   * Adds an example to a Payload
   * @param id The if of the Payload to add the example to
   * @param init The example init options
   */
  async addPayloadExample(id: string, init: ExampleInit): Promise<AmfShapes.IApiDataExample> {
    const payload = this.graph.findById(id) as AMF.Payload;
    if (!payload) {
      throw new Error(`No Payload for ${id}`);
    }
    const example = payload.withExample(init.name);
    this.fillExample(example, init);
    return ApiSerializer.example(example);
  }

  /**
   * Removes an example from the Payload.
   * @param payloadId The domain id of the Payload
   * @param exampleId The domain id of the Example to remove.
   */
  async removePayloadExample(payloadId: string, exampleId: string): Promise<void> {
    const payload = this.graph.findById(payloadId) as AMF.Payload;
    if (!payload) {
      throw new Error(`No Payload for ${payloadId}`);
    }
    const remaining = payload.examples.filter((item) => item.id !== exampleId);
    payload.withExamples(remaining);
  }

  /**
   * Updates a scalar property of a Payload.
   * @param id The domain id of the payload.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated Payload
   */
  async updatePayloadProperty(id: string, property: keyof ApiDefinitions.IApiPayload, value: unknown): Promise<ApiDefinitions.IApiPayload> {
    const payload = this.graph.findById(id) as AMF.Payload;
    if (!payload) {
      throw new Error(`No payload for given id ${id}`);
    }
    switch (property) {
      case 'name': payload.withName(Validator.ensureString(value)); break;
      case 'mediaType': payload.withMediaType(Validator.ensureString(value)); break;
      default: throw new Error(`Unsupported patch property of Response: ${property}`);
    }
    return ApiSerializer.payload(payload);
  }

  /**
   * Reads the TemplatedLink object from the graph.
   * @param id The domain id of the TemplatedLink
   */
  async getTemplatedLink(id: string): Promise<ApiDefinitions.IApiTemplatedLink> {
    const link = this.graph.findById(id) as AMF.TemplatedLink;
    if (!link) {
      throw new Error(`No TemplatedLink for ${id}`);
    }
    return ApiSerializer.templatedLink(link);
  }

  /**
   * Lists the custom domain properties (domain extensions, annotations) definitions for the API.
   */
  async listCustomDomainProperties(): Promise<ApiCustomDomainExtensionListItem[]> {
    const result: ApiCustomDomainExtensionListItem[] = [];
    this.graph.declares.forEach((obj) => {
      const types = obj.graph().types();
      if (!types.includes(ns.aml.vocabularies.document.DomainProperty)) {
        return;
      }
      const object = obj as AMF.CustomDomainProperty;
      const item = ApiSerializer.domainPropertyListItem(object);
      result.push(item);
    });
    return result;
  }

  /**
   * Creates a new type in the API.
   * @param init The Shape init options.
   */
  async addCustomDomainProperty(init?: CustomDomainPropertyInit): Promise<ApiDefinitions.IApiCustomDomainExtension> {
    const options = init || {};
    const { description, name, displayName } = options;
    const domainElement = new this.amf.CustomDomainProperty();
    if (name) {
      domainElement.withName(name);
    }
    if (displayName) {
      domainElement.withDisplayName(displayName);
    }
    if (description) {
      domainElement.withDescription(description);
    }
    this.graph.withDeclaredElement(domainElement);
    return ApiSerializer.customDomainProperty(domainElement);
  }

  /**
   * Reads the CustomDomainProperty object from the graph.
   * This is a definition of domain extension (RAML annotation).
   * 
   * @param id The domain id of the CustomDomainProperty
   */
  async getCustomDomainProperty(id: string): Promise<ApiDefinitions.IApiCustomDomainExtension> {
    const object = this.graph.findById(id) as AMF.CustomDomainProperty;
    if (!object) {
      throw new Error(`No CustomDomainProperty for ${id}`);
    }
    return ApiSerializer.customDomainProperty(object);
  }

  /**
   * Removes a CustomDomainProperty from the API.
   * @param id The domain id of the CustomDomainProperty to remove
   * @returns True when the property was found and removed.
   */
  async deleteCustomDomainProperty(id: string): Promise<boolean> {
    return this.deleteFromDeclares(id);
  }

  /**
   * Updates a scalar property of a CustomDomainProperty.
   * @param id The domain id of the object.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated custom domain property
   */
  async updateCustomDomainProperty(id: string, property: keyof ApiDefinitions.IApiCustomDomainExtension, value: unknown): Promise<ApiDefinitions.IApiCustomDomainExtension> {
    const object = this.graph.findById(id) as AMF.CustomDomainProperty;
    if (!object) {
      throw new Error(`No CustomDomainProperty for given id ${id}`);
    }
    switch (property) {
      case 'description': object.withDescription(Validator.ensureString(value)); break;
      case 'displayName': object.withDisplayName(Validator.ensureString(value)); break;
      case 'name': object.withName(Validator.ensureString(value)); break;
      default: throw new Error(`Unsupported patch property of CustomDomainProperty: ${property}`);
    }
    return ApiSerializer.customDomainProperty(object);
  }

  /**
   * Reads the DomainExtension object from the graph.
   * This is a definition of applied to an object domain extension (RAML annotation).
   * 
   * @param id The domain id of the CustomDomainProperty
   */
  async getDomainExtension(id: string): Promise<ApiDefinitions.IApiDomainExtension> {
    const object = this.graph.findById(id) as AMF.DomainExtension;
    if (!object) {
      throw new Error(`No DomainExtension for ${id}`);
    }
    return ApiSerializer.domainExtension(object);
  }

  /**
   * Reads the Request object from the graph.
   * @param id The domain id of the Request
   */
  async getRequest(id: string): Promise<ApiDefinitions.IApiRequest> {
    const object = this.graph.findById(id) as AMF.Request;
    if (!object) {
      throw new Error(`No Request for ${id}`);
    }
    return ApiSerializer.request(object);
  }

  /**
   * @param operationId The operation domain id
   * @param init The request init options. Optional.
   * @returns The domain id of the created request
   */
  async addRequest(operationId: string, init?: OperationRequestInit): Promise<ApiDefinitions.IApiRequest> {
    const opts = init || {};
    const op = this.graph.findById(operationId) as AMF.Operation;
    if (!op) {
      throw new Error(`No operation for given id ${operationId}`);
    }
    const model = op.withRequest();
    if (opts.description) {
      model.withDescription(opts.description);
    }
    if (typeof opts.required === 'boolean') {
      model.withRequired(opts.required);
    }
    if (Array.isArray(opts.headers) && opts.headers.length) {
      Validator.ensureStringArray(opts.headers).forEach((h) => model.withHeader(h).withBinding('header'));
    }
    if (Array.isArray(opts.payloads) && opts.payloads.length) {
      Validator.ensureStringArray(opts.payloads).forEach((p) => model.withPayload(p));
    }
    if (Array.isArray(opts.queryParameters) && opts.queryParameters.length) {
      Validator.ensureStringArray(opts.queryParameters).forEach((p) => {
        const param = model.withQueryParameter(p).withBinding('query');
        param.withScalarSchema(p).withDataType(ns.w3.xmlSchema.string);
      });
    }
    if (Array.isArray(opts.uriParameters) && opts.uriParameters.length) {
      Validator.ensureStringArray(opts.uriParameters).forEach((p) => {
        const param = model.withUriParameter(p).withBinding('url');
        param.withScalarSchema(p).withDataType(ns.w3.xmlSchema.string);
      });
    }
    if (Array.isArray(opts.cookieParameters) && opts.cookieParameters.length) {
      Validator.ensureStringArray(opts.cookieParameters).forEach((p) => {
        const param = model.withCookieParameter(p).withBinding('cookie');
        param.withScalarSchema(p).withDataType(ns.w3.xmlSchema.string);
      });
    }
    return ApiSerializer.request(model);
  }

  /**
   * Adds a header to the request.
   * @param requestId The request domain id
   * @param init The Parameter init options.
   */
  async addRequestHeader(requestId: string, init: ParameterInit): Promise<ApiDefinitions.IApiParameter> {
    const request = this.graph.findById(requestId) as AMF.Request;
    if (!request) {
      throw new Error(`No request for given id ${requestId}`);
    }
    const param = request.withHeader(init.name).withBinding('header');
    this.fillParameter(param, init);
    return ApiSerializer.parameter(param);
  }

  /**
   * Removes a header from a request
   * @param requestId The request id to remove the header from
   * @param headerId The header id to remove.
   * @returns Updated request
   */
  async removeRequestHeader(requestId: string, headerId: string): Promise<ApiDefinitions.IApiRequest> {
    const request = this.graph.findById(requestId) as AMF.Request;
    if (!request) {
      throw new Error(`No request for given id ${requestId}`);
    }
    const remaining = request.headers.filter((i) => i.id !== headerId);
    request.withHeaders(remaining);
    return ApiSerializer.request(request);
  }

  /**
   * Adds a query parameter to the request.
   * @param requestId The request domain id
   * @param init The Parameter init options.
   */
  async addRequestQueryParameter(requestId: string, init: ParameterInit): Promise<ApiDefinitions.IApiParameter> {
    const request = this.graph.findById(requestId) as AMF.Request;
    if (!request) {
      throw new Error(`No request for given id ${requestId}`);
    }
    const param = request.withQueryParameter(init.name).withBinding('query');
    this.fillParameter(param, init);
    return ApiSerializer.parameter(param);
  }

  /**
   * Removes a query parameter from a request
   * @param requestId The request id to remove the parameter from
   * @param paramId The parameter id to remove.
   * @returns Updated request
   */
  async removeRequestQueryParameter(requestId: string, paramId: string): Promise<ApiDefinitions.IApiRequest> {
    const request = this.graph.findById(requestId) as AMF.Request;
    if (!request) {
      throw new Error(`No request for given id ${requestId}`);
    }
    const remaining = request.queryParameters.filter((i) => i.id !== paramId);
    request.withQueryParameters(remaining);
    return ApiSerializer.request(request);
  }

  /**
   * Adds a cookie to the request.
   * @param requestId The request domain id
   * @param init The Parameter init options.
   */
  async addRequestCookieParameter(requestId: string, init: ParameterInit): Promise<ApiDefinitions.IApiParameter> {
    const request = this.graph.findById(requestId) as AMF.Request;
    if (!request) {
      throw new Error(`No request for given id ${requestId}`);
    }
    const param = request.withCookieParameter(init.name).withBinding('cookie');
    this.fillParameter(param, init);
    return ApiSerializer.parameter(param);
  }

  /**
   * Removes a cookie parameter from a request
   * @param requestId The request id to remove the parameter from
   * @param paramId The parameter id to remove.
   * @returns Updated request
   */
  async removeRequestCookieParameter(requestId: string, paramId: string): Promise<ApiDefinitions.IApiRequest> {
    const request = this.graph.findById(requestId) as AMF.Request;
    if (!request) {
      throw new Error(`No request for given id ${requestId}`);
    }
    const remaining = request.cookieParameters.filter((i) => i.id !== paramId);
    request.withCookieParameters(remaining);
    return ApiSerializer.request(request);
  }

  /**
   * Creates a new payload in the request.
   * @param requestId The request domain id
   * @param init The payload init options
   * @returns Created payload object.
   */
  async addRequestPayload(requestId: string, init: PayloadInit): Promise<ApiDefinitions.IApiPayload> {
    const request = this.graph.findById(requestId) as AMF.Request;
    if (!request) {
      throw new Error(`No Request for ${requestId}`);
    }
    const p = request.withPayload(init.mediaType);
    if (init.name) {
      p.withName(init.name);
    }
    return ApiSerializer.payload(p);
  }

  /**
   * Removes a payload from a request object.
   * @param requestId The request domain id
   * @param payloadId The payload domain id.
   */
  async removeRequestPayload(requestId: string, payloadId: string): Promise<void> {
    const request = this.graph.findById(requestId) as AMF.Request;
    if (!request) {
      throw new Error(`No Request for ${requestId}`);
    }
    const remaining = request.payloads.filter((item) => item.id !== payloadId);
    request.withPayloads(remaining);
  }

  /**
   * @param requestId The request id to delete
   * @param operationId The id of the parent operation that has the request
   */
  async deleteRequest(requestId: string, operationId: string): Promise<void> {
    const operation = this.findOperation(operationId);
    if (!operation) {
      throw new Error(`No operation for ${operationId}`);
    }
    operation.graph().removeField(ns.aml.vocabularies.apiContract.expects);
  }

  /**
   * Updates a scalar property of a Request.
   * @param id The domain id of the request.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated request
   */
  async updateRequestProperty(id: string, property: keyof ApiDefinitions.IApiRequest, value: unknown): Promise<ApiDefinitions.IApiRequest> {
    const rq = this.graph.findById(id) as AMF.Request;
    if (!rq) {
      throw new Error(`No request for given id ${id}`);
    }
    switch (property) {
      case 'description': rq.withDescription(Validator.ensureString(value)); break;
      case 'required': rq.withRequired(Validator.ensureBoolean(value)); break;
      default: throw new Error(`Unknown property "${property}" of a Request.`);
    }
    return ApiSerializer.request(rq);
  }

  fillParameter(param: AMF.Parameter, init: ParameterInit): void {
    const { name, deprecated, description, required, allowEmptyValue, style, explode, allowReserved, binding, dataType } = init;
    if (typeof deprecated === 'boolean') {
      param.withDeprecated(deprecated);
    }
    if (typeof required === 'boolean') {
      param.withRequired(required);
    }
    if (typeof allowEmptyValue === 'boolean') {
      param.withAllowEmptyValue(allowEmptyValue);
    }
    if (typeof explode === 'boolean') {
      param.withExplode(explode);
    }
    if (typeof allowReserved === 'boolean') {
      param.withAllowReserved(allowReserved);
    }
    if (description) {
      param.withDescription(Validator.ensureString(description));
    }
    if (style) {
      param.withStyle(Validator.ensureString(style));
    }
    if (binding) {
      param.withBinding(Validator.ensureString(binding));
    }
    if (dataType) {
      const dt = ns.w3.xmlSchema[dataType];
      if (dt) {
        param.withScalarSchema(Validator.ensureString(name)).withDataType(Validator.ensureString(dt));
      }
    }
  }

  /**
   * Reads the info about a parameter.
   * @param id The domain id of the parameter
   */
  async getParameter(id: string): Promise<ApiDefinitions.IApiParameter> {
    const param = this.graph.findById(id) as AMF.Parameter;
    if (!param) {
      throw new Error(`No Parameter for ${id}`);
    }
    return ApiSerializer.parameter(param);
  }

  /**
   * Reads the list of Parameters in a single call.
   */
  async getParameters(ids: string[]): Promise<(ApiDefinitions.IApiParameter | undefined)[]> {
    const result: (ApiDefinitions.IApiParameter | undefined)[] = [];
    ids.forEach((id) => {
      const param = this.graph.findById(id) as AMF.Parameter;
      if (param) {
        result.push(ApiSerializer.parameter(param));
      } else {
        result.push(undefined);
      }
    });
    return result;
  }

  /**
   * Updates a scalar property of a Parameter.
   * @param id The domain id of the parameter.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns The updated Parameter
   */
  async updateParameterProperty(id: string, property: keyof ApiDefinitions.IApiParameter, value: unknown): Promise<ApiDefinitions.IApiParameter> {
    const param = this.graph.findById(id) as AMF.Parameter;
    if (!param) {
      throw new Error(`No parameter for given id ${id}`);
    }
    switch (property) {
      case 'name': param.withName(Validator.ensureString(value)); break;
      case 'description': param.withDescription(Validator.ensureString(value)); break;
      case 'required': param.withRequired(Validator.ensureBoolean(value)); break;
      case 'deprecated': param.withDeprecated(Validator.ensureBoolean(value)); break;
      case 'allowEmptyValue': param.withAllowEmptyValue(Validator.ensureBoolean(value)); break;
      case 'style': param.withStyle(Validator.ensureString(value)); break;
      case 'explode': param.withExplode(Validator.ensureBoolean(value)); break;
      case 'allowReserved': param.withAllowReserved(Validator.ensureBoolean(value)); break;
      case 'binding': param.withBinding(Validator.ensureString(value)); break;
      default: throw new Error(`Unknown property "${property}" of a Parameter.`);
    }
    return ApiSerializer.parameter(param);
  }

  /**
   * Adds an example to a Parameter
   * @param id The if of the Parameter to add the example to
   * @param init The example init options
   */
  async addParameterExample(id: string, init: ExampleInit): Promise<AmfShapes.IApiDataExample> {
    const param = this.graph.findById(id) as AMF.Parameter;
    if (!param) {
      throw new Error(`No Parameter in the graph for ${id}`);
    }
    const example = param.withExample(init.name);
    this.fillExample(example, init);
    return ApiSerializer.example(example);
  }

  /**
   * Removes an example from the parameter.
   * @param paramId The domain id of the Parameter
   * @param exampleId The domain id of the Example to remove.
   */
  async removeParameterExample(paramId: string, exampleId: string): Promise<void> {
    const param = this.graph.findById(paramId) as AMF.Parameter;
    if (!param) {
      throw new Error(`No Parameter for ${paramId}`);
    }
    const remaining = param.examples.filter((item) => item.id !== exampleId);
    param.withExamples(remaining);
  }

  /**
   * Fills example properties from the init object
   * @param example The example to add properties to
   * @param init The example init options
   */
  fillExample(example: AMF.Example, init: ExampleInit): void {
    if (init.displayName) {
      example.withDisplayName(Validator.ensureString(init.displayName));
    }
    if (init.description) {
      example.withDescription(Validator.ensureString(init.description));
    }
    if (init.value) {
      example.withValue(Validator.ensureString(init.value));
    }
    if (init.mediaType) {
      example.withMediaType(Validator.ensureString(init.mediaType));
    }
    if (typeof init.strict === 'boolean') {
      example.withStrict(init.strict);
    }
  }

  /**
   * Lists the documentation definitions for the API.
   */
  async listDocumentations(): Promise<ApiDefinitions.IApiDocumentation[]> {
    const docs = this.graph.findByType(ns.aml.vocabularies.core.CreativeWork) as AMF.CreativeWork[];
    return docs.map((doc) => ApiSerializer.documentation(doc));
    // const api = this.webApi();
    // return api.documentations.map((doc) => ApiSerializer.documentation(doc));
  }

  /**
   * Adds a new documentation object to the graph.
   * @param init The initialization properties
   * @returns The created documentation.
   */
  async addDocumentation(init: DocumentationInit): Promise<ApiDefinitions.IApiDocumentation> {
    const { description, title = 'Unnamed documentation', url } = init;
    const api = this.webApi();
    if (!api) {
      throw new Error(`No API in the graph.`);
    }
    let doc: AMF.CreativeWork;
    if (url) {
      doc = api.withDocumentationUrl(url);
      doc.withTitle(title);
    } else {
      doc = api.withDocumentationTitle(title);
    }
    if (description) {
      doc.withDescription(description);
    }
    return ApiSerializer.documentation(doc);
  }

  /**
   * Reads the documentation object from the store.
   * @param id The domain id of the documentation object
   * @returns The read documentation.
   */
  async getDocumentation(id: string): Promise<ApiDefinitions.IApiDocumentation | undefined> {
    const doc = this.graph.findById(id) as AMF.CreativeWork;
    if (!doc) {
      return undefined;
    }
    return ApiSerializer.documentation(doc);
  }

  /**
   * Updates a scalar property of a documentation.
   * @param id The domain id of the documentation.
   * @param property The property name to update
   * @param value The new value to set.
   */
  async updateDocumentationProperty(id: string, property: keyof ApiDefinitions.IApiDocumentation, value: unknown): Promise<ApiDefinitions.IApiDocumentation> {
    const doc = this.graph.findById(id) as AMF.CreativeWork;
    if (!doc) {
      throw new Error(`No documentation for given id ${id}`);
    }
    switch (property) {
      case 'description': doc.withDescription(Validator.ensureString(value)); break;
      case 'title': doc.withTitle(Validator.ensureString(value)); break;
      case 'url': doc.withUrl(Validator.ensureString(value)); break;
      default: throw new Error(`Unknown property "${property}" of a Documentation.`);
    }
    return ApiSerializer.documentation(doc);
  }

  /**
   * Removes the documentation from the graph.
   * @param id The domain id of the documentation object
   */
  async deleteDocumentation(id: string): Promise<void> {
    const api = this.webApi();
    if (!api) {
      throw new Error(`No API in the graph.`);
    }
    const remaining = api.documentations.filter(item => item.id !== id);
    api.withDocumentation(remaining);
  }

  /**
   * Lists the type (schema) definitions for the API.
   */
  async listTypes(): Promise<ApiNodeShapeListItem[]> {
    const result: ApiNodeShapeListItem[] = [];
    this.graph.declares.forEach((obj) => {
      const types = obj.graph().types();
      if (!isShape(types)) {
        return;
      }
      const type = obj as AMF.NodeShape;
      const item = ApiSerializer.nodeShapeListItem(type);
      result.push(item);
    });
    const refs = this.graph.references() as AMF.Dialect[];
    refs.forEach((ref) => {
      const { declares } = ref;
      if (!declares || !declares.length) {
        return;
      }
      declares.forEach((obj) => {
        const types = obj.graph().types();
        if (!isShape(types)) {
          return;
        }
        const type = obj as AMF.NodeShape;
        const item = ApiSerializer.nodeShapeListItem(type);
        result.push(item);
      });
    });
    return result;
  }

  /**
   * @param id The domain id of the API type (schema).
   */
  async getType(id: string): Promise<AmfShapes.IShapeUnion | undefined> {
    const type = this.graph.findById(id) as AMF.Shape;
    if (!type) {
      return undefined;
    }
    return ApiSerializer.unknownShape(type);
  }

  /**
   * Reads types data in a bulk operation
   * @param ids The ids to read
   */
  async getTypes(ids: string[]): Promise<(AmfShapes.IShapeUnion | undefined)[]> {
    const result: (AmfShapes.IShapeUnion | undefined)[] = [];
    ids.forEach((id) => {
      const param = this.graph.findById(id) as AMF.Shape;
      if (param) {
        result.push(ApiSerializer.unknownShape(param));
      } else {
        result.push(undefined);
      }
    });
    return result;
  }

  /**
   * Creates a new type in the API.
   * @param init The Shape init options.
   */
  buildShape(init?: ShapeInit | undefined): AMF.Shape {
    const options = init || {};
    const { type, description, name, displayName, readOnly, writeOnly } = options;
    let domainElement: AMF.Shape;
    if (type === ns.aml.vocabularies.shapes.ScalarShape) {
      domainElement = new this.amf.ScalarShape();
    } else if (type === ns.w3.shacl.NodeShape) {
      domainElement = new this.amf.NodeShape();
    } else if (type === ns.aml.vocabularies.shapes.UnionShape) {
      domainElement = new this.amf.UnionShape();
    } else if (type === ns.aml.vocabularies.shapes.FileShape) {
      domainElement = new this.amf.FileShape();
    } else if (type === ns.aml.vocabularies.shapes.SchemaShape) {
      domainElement = new this.amf.SchemaShape();
    } else if (type === ns.aml.vocabularies.shapes.ArrayShape) {
      domainElement = new this.amf.ArrayShape();
    } else if (type === ns.aml.vocabularies.shapes.MatrixShape) {
      domainElement = new this.amf.MatrixShape();
    } else if (type === ns.aml.vocabularies.shapes.TupleShape) {
      domainElement = new this.amf.TupleShape();
    } else {
      domainElement = new this.amf.AnyShape();
    }
    if (name) {
      domainElement.withName(Validator.ensureString(name));
    }
    if (displayName) {
      domainElement.withDisplayName(Validator.ensureString(displayName));
    }
    if (description) {
      domainElement.withDescription(Validator.ensureString(description));
    }
    if (typeof readOnly === 'boolean') {
      domainElement.withReadOnly(readOnly);
    }
    if (typeof writeOnly === 'boolean') {
      domainElement.withWriteOnly(writeOnly);
    }
    return domainElement;
  }

  /**
   * Creates a new type in the API.
   * @param init The Shape init options.
   */
  async addType(init?: ShapeInit): Promise<AmfShapes.IShapeUnion> {
    const domainElement = this.buildShape(init);
    this.graph.withDeclaredElement(domainElement);
    return ApiSerializer.unknownShape(domainElement);
  }

  /**
   * Removes a type for a given domain id.
   * @param id The type domain id.
   * @returns True when the type has been found and removed.
   */
  async deleteType(id: string): Promise<boolean> {
    return this.deleteFromDeclares(id);
  }

  /**
   * Updates a scalar property of a type.
   * @param id The domain id of the type.
   * @param property The property name to update
   * @param value The new value to set.
   */
  async updateTypeProperty(id: string, property: string, value: unknown): Promise<AmfShapes.IShapeUnion> {
    const object = this.graph.findById(id) as AMF.AnyShape;
    if (!object) {
      throw new Error(`No type for ${id}`);
    }
    const types = object.graph().types();
    if (types.includes(ns.aml.vocabularies.shapes.ScalarShape)) {
      this.updateScalarShapeProperty(object as AMF.ScalarShape, property, value);
    } else if (types.includes(ns.w3.shacl.NodeShape)) {
      this.updateNodeShapeProperty(object as AMF.NodeShape, property, value);
    } else if (types.includes(ns.aml.vocabularies.shapes.UnionShape)) {
      if (!this.updateAnyShapeProperty(object, property, value)) {
        throw new Error(`Unsupported patch property of UnionShape: ${property}`);
      }
    } else if (types.includes(ns.aml.vocabularies.shapes.FileShape)) {
      this.updateFileShapeProperty(object as AMF.FileShape, property, value);
    } else if (types.includes(ns.aml.vocabularies.shapes.SchemaShape)) {
      this.updateSchemaShapeProperty(object as AMF.SchemaShape, property, value);
    } else if (types.includes(ns.aml.vocabularies.shapes.TupleShape)) {
      this.updateTupleShapeProperty(object as AMF.TupleShape, property, value);
    } else if (types.includes(ns.aml.vocabularies.shapes.ArrayShape) || types.includes(ns.aml.vocabularies.shapes.MatrixShape)) {
      if (!this.updateAnyShapeProperty(object, property, value)) {
        throw new Error(`Unsupported patch property of ArrayShape: ${property}`);
      }
    } else if (!this.updateAnyShapeProperty(object, property, value)) {
      throw new Error(`Unsupported patch property of AnyShape: ${property}`);
    }
    return ApiSerializer.unknownShape(object);
  }

  /**
   * Updates a scalar property of a scalar type.
   * @param shape The domain id of the type.
   * @param property The property name to update
   * @param value The new value to set.
   * @returns `true` when the shape has been updated.
   */
  updateAnyShapeProperty(shape: AMF.AnyShape, property: string, value: unknown): boolean {
    switch (property) {
      case 'name': shape.withName(Validator.ensureString(value)); break;
      case 'displayName': shape.withDisplayName(Validator.ensureString(value)); break;
      case 'description': shape.withDescription(Validator.ensureString(value)); break;
      case 'defaultValueStr': shape.withDefaultStr(Validator.ensureString(value)); break;
      case 'readOnly': shape.withReadOnly(Validator.ensureBoolean(value)); break;
      case 'writeOnly': shape.withWriteOnly(Validator.ensureBoolean(value)); break;
      case 'deprecated': shape.withDeprecated(Validator.ensureBoolean(value)); break;
      default: return false;
    }
    return true;
  }

  /**
   * Updates a scalar property of a scalar type.
   * @param scalar The shape to update
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateScalarShapeProperty(scalar: AMF.ScalarShape, property: string, value: unknown): void {
    if (this.updateAnyShapeProperty(scalar, property, value)) {
      return;
    }
    switch (property) {
      case 'dataType': scalar.withDataType(Validator.ensureString(value)); break;
      case 'pattern': scalar.withPattern(Validator.ensureString(value)); break;
      case 'minLength': scalar.withMinLength(Validator.ensureNumber(value)); break;
      case 'maxLength': scalar.withMaxLength(Validator.ensureNumber(value)); break;
      case 'minimum': scalar.withMinimum(Validator.ensureNumber(value)); break;
      case 'maximum': scalar.withMaximum(Validator.ensureNumber(value)); break;
      case 'exclusiveMinimum': scalar.withExclusiveMinimum(Validator.ensureBoolean(value)); break;
      case 'exclusiveMaximum': scalar.withExclusiveMaximum(Validator.ensureBoolean(value)); break;
      case 'format': scalar.withFormat(Validator.ensureString(value)); break;
      case 'multipleOf': scalar.withMultipleOf(Validator.ensureNumber(value)); break;
      default: throw new Error(`Unsupported patch property of ScalarShape: ${property}`);
    }
  }

  /**
   * Updates a scalar property of a Node type.
   * @param shape The shape to update
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateNodeShapeProperty(shape: AMF.NodeShape, property: string, value: unknown): void {
    if (this.updateAnyShapeProperty(shape, property, value)) {
      return;
    }
    switch (property) {
      case 'minProperties': shape.withMinProperties(Validator.ensureNumber(value)); break;
      case 'maxProperties': shape.withMaxProperties(Validator.ensureNumber(value)); break;
      case 'closed': shape.withClosed(Validator.ensureBoolean(value)); break;
      case 'discriminator': shape.withDiscriminator(Validator.ensureString(value)); break;
      case 'discriminatorValue': shape.withDiscriminatorValue(Validator.ensureString(value)); break;
      default: throw new Error(`Unsupported patch property of NodeShape: ${property}`);
    }
  }

  /**
   * Updates a scalar property of a file type.
   * @param shape The shape to update
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateFileShapeProperty(shape: AMF.FileShape, property: string, value: unknown): void {
    if (this.updateAnyShapeProperty(shape, property, value)) {
      return;
    }
    switch (property) {
      case 'fileTypes': shape.withFileTypes(Validator.ensureStringArray(value)); break;
      case 'pattern': shape.withPattern(Validator.ensureString(value)); break;
      case 'minLength': shape.withMinLength(Validator.ensureNumber(value)); break;
      case 'maxLength': shape.withMaxLength(Validator.ensureNumber(value)); break;
      case 'minimum': shape.withMinimum(Validator.ensureNumber(value)); break;
      case 'maximum': shape.withMaximum(Validator.ensureNumber(value)); break;
      case 'exclusiveMinimum': shape.withExclusiveMinimum(Validator.ensureBoolean(value)); break;
      case 'exclusiveMaximum': shape.withExclusiveMaximum(Validator.ensureBoolean(value)); break;
      case 'format': shape.withFormat(Validator.ensureString(value)); break;
      case 'multipleOf': shape.withMultipleOf(Validator.ensureNumber(value)); break;
      default: throw new Error(`Unsupported patch property of FileShape: ${property}`);
    }
  }

  /**
   * Updates a scalar property of a schema type.
   * @param shape The shape to update
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateSchemaShapeProperty(shape: AMF.SchemaShape, property: string, value: unknown): void {
    if (this.updateAnyShapeProperty(shape, property, value)) {
      return;
    }
    switch (property) {
      case 'mediaType': shape.withMediatype(Validator.ensureString(value)); break;
      case 'raw': shape.withRaw(Validator.ensureString(value)); break;
      default: throw new Error(`Unsupported patch property of SchemaShape: ${property}`);
    }
  }

  /**
   * Updates a scalar property of a tuple type.
   * @param shape The shape to update
   * @param property The property name to update
   * @param value The new value to set.
   */
  updateTupleShapeProperty(shape: AMF.TupleShape, property: string, value: unknown): void {
    if (this.updateAnyShapeProperty(shape, property, value)) {
      return;
    }
    switch (property) {
      // case 'additionalItems': shape.withAdditionalItems(value); break;
      default: throw new Error(`Unsupported patch property of TupleShape: ${property}`);
    }
  }

  /**
   * Reads the definition of a property of a NodeShape.
   * @param id The domain id of the property.
   * @throws {Error} An error when the type couldn't be find.
   */
  getPropertyShape(id: string): AmfShapes.IApiPropertyShape {
    const object = this.graph.findById(id) as AMF.PropertyShape;
    if (!object) {
      throw new Error(`No property shape for ${id}`);
    }
    return ApiSerializer.propertyShape(object);
  }

  /**
   * Creates a new property on a type.
   * @param id The id of the type to add the property to.
   * @param init The property initialization configuration.
   * @throws {Error} An error when the type couldn't be find.
   * @throws {Error} An error when the type is not a NodeShape.
   */
  addPropertyShape(id: string, init: PropertyShapeInit): AmfShapes.IApiPropertyShape {
    const object = this.graph.findById(id) as AMF.NodeShape;
    if (!object) {
      throw new Error(`No type for ${id}`);
    }
    const types = object.graph().types();
    if (!types.includes(ns.w3.shacl.NodeShape)) {
      throw new Error(`Unable to add a property to a non Node shape.`);
    }
    if (!init) {
      throw new Error(`Missing property initialization object.`);
    }
    const { name } = init;
    if (!name) {
      throw new Error(`Missing property name.`);
    }
    const addedProperty = object.withProperty(name);
    if (typeof init.displayName === 'string') {
      addedProperty.withDisplayName(init.displayName);
    }
    if (typeof init.description === 'string') {
      addedProperty.withDescription(init.description);
    }
    if (typeof init.defaultValueStr === 'string') {
      addedProperty.withDefaultStr(init.defaultValueStr);
    }
    if (typeof init.patternName === 'string') {
      addedProperty.withPatternName(init.patternName);
    }
    if (typeof init.deprecated === 'boolean') {
      addedProperty.withDeprecated(init.deprecated);
    }
    if (typeof init.readOnly === 'boolean') {
      addedProperty.withReadOnly(init.readOnly);
    }
    if (typeof init.writeOnly === 'boolean') {
      addedProperty.withWriteOnly(init.writeOnly);
    }
    if (typeof init.minCount === 'number') {
      addedProperty.withMinCount(init.minCount);
    }
    if (typeof init.maxCount === 'number') {
      addedProperty.withMaxCount(init.maxCount);
    }
    if (typeof init.range === 'object') {
      const domainElement = this.buildShape(init.range);
      addedProperty.withRange(domainElement);
    }
    return ApiSerializer.propertyShape(addedProperty);
  }

  /**
   * Removes a property from a node shape.
   * @param typeId The domain id of a parent type
   * @param propertyId The id of the property to remove.
   * @throws {Error} An error when the type couldn't be find.
   */
  deletePropertyShape(typeId: string, propertyId: string): void {
    const object = this.graph.findById(typeId) as AMF.NodeShape;
    if (!object) {
      throw new Error(`No type for ${typeId}`);
    }
    const filtered = object.properties.filter((prop) => prop.id !== propertyId);
    object.withProperties(filtered);
  }

  /**
   * Updates a scalar property of a property of a NodeShape.
   * @param parent The domain id of the parent type.
   * @param id The domain id of the type.
   * @param property The property name to update
   * @param value The new value to set.
   */
  updatePropertyShapeProperty(parent: string, id: string, property: keyof AmfShapes.IApiPropertyShape, value: unknown): AmfShapes.IApiPropertyShape {
    const object = this.graph.findById(id) as AMF.PropertyShape;
    if (!object) {
      throw new Error(`No property shape for ${id}`);
    }
    switch (property) {
      case 'name': object.withName(Validator.ensureString(value)); break;
      case 'displayName': object.withDisplayName(Validator.ensureString(value)); break;
      case 'description': object.withDescription(Validator.ensureString(value)); break;
      case 'defaultValueStr': object.withDefaultStr(Validator.ensureString(value)); break;
      // case 'patternName': object.withPatternName(value); break;
      case 'deprecated': object.withDeprecated(Validator.ensureBoolean(value)); break;
      case 'minCount': object.withMinCount(Validator.ensureNumber(value)); break;
      case 'maxCount': object.withMaxCount(Validator.ensureNumber(value)); break;
      case 'readOnly': object.withReadOnly(Validator.ensureBoolean(value)); break;
      case 'writeOnly': object.withWriteOnly(Validator.ensureBoolean(value)); break;
      default: throw new Error(`Unsupported patch property of PropertyShape: ${property}`);
    }
    return ApiSerializer.propertyShape(object);
  }

  /**
   * Lists the security definitions for the API.
   */
  async listSecurity(): Promise<ApiDefinitions.IApiSecuritySchemeListItem[]> {
    const result: ApiDefinitions.IApiSecuritySchemeListItem[] = [];
    // const list = /** @type SecurityScheme[] */ (this.graph.findByType(ns.aml.vocabularies.security.SecurityScheme));
    const processed: string[] = [];
    // list.forEach((item) => {
    //   let target = item;
    //   if (item.isLink) {
    //     target = /** @type SecurityScheme */ (item.linkTarget);
    //   }
    //   if (processed.includes(target.id)) {
    //     return;
    //   }
    //   processed.push(target.id);
    //   result.push(ApiSerializer.securitySchemeListItem(item));
    // });
    this.graph.declares.forEach((obj) => {
      let target = obj as AMF.SecurityScheme;
      if (target.isLink) {
        target = target.linkTarget  as AMF.SecurityScheme;
      }
      const types = target.graph().types();
      if (!types.includes(ns.aml.vocabularies.security.SecurityScheme)) {
        return;
      }
      if (processed.includes(target.id)) {
        return;
      }
      processed.push(target.id);
      const item = ApiSerializer.securitySchemeListItem(target);
      result.push(item);
    });
    return result;
  }

  /**
   * Reads the SecurityRequirement object from the graph.
   * @param id The domain id of the SecurityRequirement
   */
  async getSecurityRequirement(id: string): Promise<ApiDefinitions.IApiSecurityRequirement> {
    const object = this.graph.findById(id) as AMF.SecurityRequirement;
    if (!object) {
      throw new Error(`No SecurityRequirement for ${id}`);
    }
    return ApiSerializer.securityRequirement(object);
  }

  /**
   * Reads the ParametrizedSecurityScheme object from the graph.
   * @param id The domain id of the ParametrizedSecurityScheme
   */
  async getParametrizedSecurityScheme(id: string): Promise<ApiDefinitions.IApiParametrizedSecurityScheme> {
    const { graph } = this;
    const object = graph.findById(id) as AMF.ParametrizedSecurityScheme;
    if (!object) {
      throw new Error(`No ParametrizedSecurityScheme for ${id}`);
    }
    const result = ApiSerializer.parametrizedSecurityScheme(object);
    return result;
  }
  
  /**
   * Reads the SecurityScheme object from the graph.
   * @param id The domain id of the SecurityScheme
   */
  async getSecurityScheme(id: string): Promise<ApiDefinitions.IApiSecurityScheme> {
    const object = this.graph.findById(id) as AMF.SecurityScheme;
    if (!object) {
      throw new Error(`No SecurityScheme for ${id}`);
    }
    return ApiSerializer.securityScheme(object);
  }

  /**
   * @param id The domain id of the security settings.
   */
  async getSecuritySettings(id: string): Promise<ApiDefinitions.IApiSecuritySettingsUnion> {
    const object = this.graph.findById(id) as AMF.Settings;
    if (!object) {
      throw new Error(`No Security Settings for ${id}`);
    }
    return ApiSerializer.securitySettings(object);
  }

  /**
   * Reads the OAuth2Flow object from the graph.
   * @param id The domain id of the flow to read.
   */
  async getOAuthFlow(id: string): Promise<ApiDefinitions.IApiSecurityOAuth2Flow> {
    const object = this.graph.findById(id) as AMF.OAuth2Flow;
    if (!object) {
      throw new Error(`No OAuth2Flow for ${id}`);
    }
    return ApiSerializer.oAuth2Flow(object);
  }

  /**
   * Reads the OAuth2Flow object from the graph.
   * @param id The domain id of the flow to read.
   */
  async getOAuthScope(id: string): Promise<ApiDefinitions.IApiSecurityScope> {
    const object = this.graph.findById(id) as AMF.Scope;
    if (!object) {
      throw new Error(`No OAuth2Flow for ${id}`);
    }
    return ApiSerializer.scope(object);
  }

  /**
   * Removes an object from the declares array whether it is in the API declares or in the references.
   * @param id The domain object to remove.
   * @returns True when the object has been found and removed.
   */
  deleteFromDeclares(id: string): boolean {
    const dIndex = this.graph.declares.findIndex((item) => item.id === id);
    if (dIndex !== -1) {
      const copy = Array.from(this.graph.declares);
      copy.splice(dIndex, 1);
      this.graph.withDeclares(copy);
      return true;
    }
    const refs = this.graph.references() as AMF.Dialect[];
    for (let i = 0, len = refs.length; i < len; i++) {
      const ref = refs[i];
      const { declares } = ref;
      if (!declares || !declares.length) {
        continue;
      }
      const index = declares.findIndex((item) => item.id === id);
      if (index !== -1) {
        const copy = Array.from(declares);
        copy.splice(dIndex, 1);
        ref.withDeclares(copy);
        return true;
      }
    }
    return false;
  }
}
