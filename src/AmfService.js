/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */

import { ns } from './Namespace.js';
import { ApiProjectResourceLoader } from './ApiProjectResourceLoader.js';
import { ApiSerializer } from './ApiSerializer.js';

// Example https://github.com/aml-org/amf-examples/blob/snapshot/src/test/java/co/acme/model/WebApiBuilder.java

/** @typedef {import('amf-client-js')} AMF */
/** @typedef {import('amf-client-js').Document} Document */
/** @typedef {import('amf-client-js').AMFClient} AMFClient */
/** @typedef {import('amf-client-js').AMFConfiguration} AMFConfiguration */
/** @typedef {import('amf-client-js').amf.core.client.platform.model.domain.DomainElement} DomainElement */
/** @typedef {import('amf-client-js').WebApi} WebApi */
/** @typedef {import('amf-client-js').EndPoint} EndPoint */
/** @typedef {import('amf-client-js').Operation} Operation */
/** @typedef {import('amf-client-js').Request} Request */
/** @typedef {import('amf-client-js').Server} Server */
/** @typedef {import('amf-client-js').Parameter} Parameter */
/** @typedef {import('amf-client-js').Example} Example */
/** @typedef {import('amf-client-js').Payload} Payload */
/** @typedef {import('amf-client-js').Response} Response */
/** @typedef {import('amf-client-js').TemplatedLink} TemplatedLink */
/** @typedef {import('amf-client-js').SecurityRequirement} SecurityRequirement */
/** @typedef {import('amf-client-js').ParametrizedSecurityScheme} ParametrizedSecurityScheme */
/** @typedef {import('amf-client-js').SecurityScheme} SecurityScheme */
/** @typedef {import('amf-client-js').CustomDomainProperty} CustomDomainProperty */
/** @typedef {import('amf-client-js').NodeShape} NodeShape */
/** @typedef {import('amf-client-js').CreativeWork} CreativeWork */
/** @typedef {import('amf-client-js').ScalarShape} ScalarShape */
/** @typedef {import('amf-client-js').amf.core.client.platform.model.domain.Shape} Shape */
/** @typedef {import('amf-client-js').AnyShape} AnyShape */
/** @typedef {import('amf-client-js').UnionShape} UnionShape */
/** @typedef {import('amf-client-js').FileShape} FileShape */
/** @typedef {import('amf-client-js').SchemaShape} SchemaShape */
/** @typedef {import('amf-client-js').TupleShape} TupleShape */
/** @typedef {import('amf-client-js').OAuth2Flow} OAuth2Flow */
/** @typedef {import('amf-client-js').Scope} Scope */
/** @typedef {import('amf-client-js').DomainExtension} DomainExtension */
/** @typedef {import('amf-client-js').Settings} Settings */
/** @typedef {import('amf-client-js').PropertyShape} PropertyShape */
/** @typedef {import('amf-client-js').amf.core.client.platform.model.document.DeclaresModel} BaseUnitWithDeclaresModel */
/** @typedef {import('amf-client-js').amf.core.client.platform.model.document.BaseUnit} BaseUnit */
/** @typedef {import('amf-client-js').Dialect} Dialect */
/** @typedef {import('./types').ApiInit} ApiInit */
/** @typedef {import('./types').EndPointInit} EndPointInit */
/** @typedef {import('./types').OperationInit} OperationInit */
/** @typedef {import('./types').OperationRequestInit} OperationRequestInit */
/** @typedef {import('./types').ApiEndPoint} ApiEndPoint */
/** @typedef {import('./types').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('./types').ApiOperation} ApiOperation */
/** @typedef {import('./types').ApiOperationListItem} ApiOperationListItem */
/** @typedef {import('./types').ApiServer} ApiServer */
/** @typedef {import('./types').ApiServerInit} ApiServerInit */
/** @typedef {import('./types').ApiParameter} ApiParameter */
/** @typedef {import('./types').ApiExample} ApiExample */
/** @typedef {import('./types').ApiPayload} ApiPayload */
/** @typedef {import('./types').ApiResponse} ApiResponse */
/** @typedef {import('./types').ApiTemplatedLink} ApiTemplatedLink */
/** @typedef {import('./types').ApiSecurityRequirement} ApiSecurityRequirement */
/** @typedef {import('./types').ApiParametrizedSecurityScheme} ApiParametrizedSecurityScheme */
/** @typedef {import('./types').ApiSecurityScheme} ApiSecurityScheme */
/** @typedef {import('./types').ApiRequest} ApiRequest */
/** @typedef {import('./types').ApiCustomDomainProperty} ApiCustomDomainProperty */
/** @typedef {import('./types').ApiSecuritySchemeListItem} ApiSecuritySchemeListItem */
/** @typedef {import('./types').ApiDocumentation} ApiDocumentation */
/** @typedef {import('./types').ApiNodeShapeListItem} ApiNodeShapeListItem */
/** @typedef {import('./types').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */
/** @typedef {import('./types').SerializedApi} SerializedApi */
/** @typedef {import('./types').OperationResponseInit} OperationResponseInit */
/** @typedef {import('./types').DocumentationInit} DocumentationInit */
/** @typedef {import('./types').ApiNodeShape} ApiNodeShape */
/** @typedef {import('./types').ApiScalarShape} ApiScalarShape */
/** @typedef {import('./types').ApiUnionShape} ApiUnionShape */
/** @typedef {import('./types').ApiFileShape} ApiFileShape */
/** @typedef {import('./types').ApiSchemaShape} ApiSchemaShape */
/** @typedef {import('./types').ApiShapeUnion} ApiShapeUnion */
/** @typedef {import('./types').ShapeInit} ShapeInit */
/** @typedef {import('./types').ParameterInit} ParameterInit */
/** @typedef {import('./types').PayloadInit} PayloadInit */
/** @typedef {import('./types').ExampleInit} ExampleInit */
/** @typedef {import('./types').ApiSecurityOAuth2Flow} ApiSecurityOAuth2Flow */
/** @typedef {import('./types').ApiSecurityScope} ApiSecurityScope */
/** @typedef {import('./types').ApiResource} ApiResource */
/** @typedef {import('./types').ParserVendors} ParserVendors */
/** @typedef {import('./types').ParserMediaTypes} ParserMediaTypes */
/** @typedef {import('./types').ApiDomainExtension} ApiDomainExtension */
/** @typedef {import('./types').ApiCustomDomainPropertyListItem} ApiCustomDomainPropertyListItem */
/** @typedef {import('./types').CustomDomainPropertyInit} CustomDomainPropertyInit */
/** @typedef {import('./types').ApiSecuritySettingsUnion} ApiSecuritySettingsUnion */
/** @typedef {import('./types').ApiPropertyShape} ApiPropertyShape */
/** @typedef {import('./types').PropertyShapeInit} PropertyShapeInit */
/** @typedef {import('./types').ApiOperationRecursive} ApiOperationRecursive */
/** @typedef {import('./types').ApiParameterRecursive} ApiParameterRecursive */
/** @typedef {import('./types').ApiPayloadRecursive} ApiPayloadRecursive */
/** @typedef {import('./types').ApiRequestRecursive} ApiRequestRecursive */
/** @typedef {import('./types').ApiResponseRecursive} ApiResponseRecursive */
/** @typedef {import('./types').ApiSecurityRequirementRecursive} ApiSecurityRequirementRecursive */
/** @typedef {import('./types').ApiParametrizedSecuritySchemeRecursive} ApiParametrizedSecuritySchemeRecursive */
/** @typedef {import('./types').ApiSecuritySchemeRecursive} ApiSecuritySchemeRecursive */

export class AmfService {
  /**
   * @param {AMF} amf
   */
  constructor(amf) {
    /**
     * @type Document
     */
    this.graph = undefined;
    /**
     * @type {AMF}
     */
    this.amf = amf;
  }

  /**
   * Loads an API project into the store.
   * @param {ApiResource[]} contents The list of files to process.
   * @param {ParserVendors} vendor The vendor of the API.
   * @param {ParserMediaTypes} mediaType The API media type
   * @param {string} main The name of the main API file.
   */
  async loadApi(contents, vendor, mediaType, main) {
    const entryPoint = contents.find((item) => item.path === main);
    if (!entryPoint) {
      throw new Error('Unable to find the API entry point');
    }
    /** @type AMFConfiguration */
    let configuration;
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
    const client = configuration.withResourceLoader(customResourceLoader).createClient();
    const result = await client.parseContent(entryPoint.contents, mediaType);
    
    if (!result.conforms) {
      // eslint-disable-next-line no-console
      console.log(result.toString());
    }
    
    this.graph = /** @type Document */ (result.baseUnit);
  }

  /**
   * Loads existing API model into to graph as Document.
   * @param {string} model
   * @param {ParserVendors} vendor The parser type to use to parse the contents.
   */
  async loadGraph(model, vendor) {
    /** @type AMFClient */
    let client;
    switch (vendor) {
      case 'OAS 2.0': client = this.amf.OASConfiguration.OAS20().createClient(); break;
      case 'OAS 3.0': client = this.amf.OASConfiguration.OAS30().createClient(); break;
      case 'RAML 1.0': client = this.amf.RAMLConfiguration.RAML10().createClient(); break;
      case 'RAML 0.8': client = this.amf.RAMLConfiguration.RAML08().createClient(); break;
      case 'ASYNC 2.0': client = this.amf.AsyncAPIConfiguration.Async20().createClient(); break;
      default: throw new Error(`Unable to recognize API type: ${vendor}`);
      // default: client = this.amf.AMFGraphConfiguration.predefined().createClient();
    }
    const result = await client.parseContent(model);
    if (!result.conforms) {
      // eslint-disable-next-line no-console
      console.log(result.toString());
    }
    this.graph = /** @type Document */ (result.baseUnit);
  }

  /**
   * Creates new Document in the graph.
   * @param {ApiInit=} init Api init options
   * @returns {Promise<string>} The domain id of the created WebAPI
   */
  async createWebApi(init) {
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
    this.graph = doc;
    return wa.id;
  }

  /**
   * Reads the WebApi property.
   * @returns {WebApi}
   */
  webApi() {
    return /** @type WebApi */ (this.graph.encodes);
  }

  /**
   * Generates RAML api from the current graph.
   * @returns {Promise<string>} RAML value for the API.
   */
  async generateRaml() {
    const client = this.amf.WebAPIConfiguration.WebAPI().createClient();
    const transformResult = client.transformCompatibility(
      this.graph,
      this.amf.ProvidedMediaType.Raml10
    );
    // if (transformResult.conforms) {
    //   console.log(transformResult.results);
    // }
    return client.render(transformResult.baseUnit, this.amf.Vendor.RAML10.mediaType);
  }

  /**
   * Generates json+ld from the current graph.
   * @returns {Promise<string>} JSON+ld value of the API.
   */
  async generateGraph() {
    const client = this.amf.WebAPIConfiguration.WebAPI().createClient();
    const transformResult = client.transformCompatibility(
      this.graph,
      this.amf.ProvidedMediaType.AMF
    );
    // if (transformResult.conforms) {
    //   console.log(transformResult.results);
    // }
    return client.render(transformResult.baseUnit, this.amf.Vendor.AMF.mediaType);
  }

  /**
   * Checks whether an API is currently loaded.
   * @returns {boolean} True when the API is loaded.
   */
  hasApi() {
    return !!this.graph;
  }
  
  /**
   * Reads basic info about the API.
   * @returns {Promise<SerializedApi>}
   */
  async getApi() {
    const api = this.webApi();
    if (!api) {
      throw new Error('No API in the graph.');
    }
    return ApiSerializer.api(api);
  }

  /**
   * @returns {Promise<ApiServer[]>} List of servers in this API.
   */
  async listServers() {
    const api = this.webApi();
    const result = /** @type ApiServer[] */ ([]);
    if (Array.isArray(api.servers) && api.servers.length) {
      api.servers.forEach((s) => {
        const item = /** @type ApiServer */ ({
          id: s.id,
          url: s.url.value(),
          variables: [],
        });
        if (!s.description.isNullOrEmpty) {
          item.description = s.description.value();
        }
        if (Array.isArray(s.variables) && s.variables.length) {
          item.variables = s.variables.map((i) => i.id);
        }
        result.push(item);
      });
    }
    return result;
  }

  /**
   * Adds a server definition to the API.
   * @param {ApiServerInit} init 
   * @returns {Promise<ApiServer>} The instance of the created server
   */
  async addServer(init) {
    if (!init.url) {
      throw new Error(`The server URL is not defined.`);
    }
    const api = this.webApi();
    const srv = /** @type Server */ (api.withServer(init.url));
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
   * @param {string} id The domain id of the Server to read
   * @returns {Promise<ApiServer>}
   */
  async getServer(id) {
    const srv = /** @type Server */ (this.graph.findById(id));
    if (!srv) {
      throw new Error(`No Server for ${id}`);
    }
    return ApiSerializer.server(srv);
  }

  /**
   * List all endpoints in the API.
   * @returns {Promise<ApiEndPointListItem[]>}
   */
  async listEndpoints() {
    const api = this.webApi();
    const result = api.endPoints.map((ep) => ApiSerializer.endPointListItem(ep));
    return result;
  }

  /**
   * Lists all endpoints with operations included into the result.
   * @returns {Promise<ApiEndPointWithOperationsListItem[]>}
   */
  async listEndpointsWithOperations() {
    const api = this.webApi();
    return api.endPoints.map((ep) => ApiSerializer.endPointWithOperationsListItem(ep));
  }

  /**
   * Adds a new endpoint to the API and returns generated id for the endpoint.
   * @param {EndPointInit} init EndPoint init parameters
   * @returns {Promise<ApiEndPoint>} The generated id for the endpoint.
   */
  async addEndpoint(init) {
    if (!init.path) {
      throw new Error(`The path argument is required.`);
    }
    const api = this.webApi();
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
   * @param {string} pathOrId The domain id of the endpoint or its path.
   * @returns {EndPoint|undefined}
   */
  findEndpoint(pathOrId) {
    const api = this.webApi();
    return api.endPoints.find((ep) => ep.id === pathOrId || (ep.path && ep.path.value()) === pathOrId);
  }

  /**
   * Removes endpoint from the API.
   * @param {string} id The endpoint domain id.
   * @returns {Promise<void>}
   */
  async deleteEndpoint(id) {
    const api = this.webApi();
    const remaining = api.endPoints.filter(item => item.id !== id);
    api.withEndPoints(remaining);
  }

  /**
   * Reads the information about an endpoint and returns it.
   * @param {string} idOrPath The domain id of the endpoint or its path.
   * @returns {Promise<ApiEndPoint>}
   */
  async getEndpoint(idOrPath) {
    const ep = this.findEndpoint(idOrPath);
    if (!ep) {
      throw new Error(`No end point ${idOrPath} in the graph`);
    }
    return ApiSerializer.endPoint(ep);
  }

  /**
   * Updates a scalar property of an endpoint.
   * @param {string} id The domain id of the endpoint.
   * @param {keyof EndPoint} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiEndPoint>}
   */
  async updateEndpointProperty(id, property, value) {
    const ep = /** @type EndPoint */ (this.graph.findById(id));
    if (!ep) {
      throw new Error(`No endpoint for given id ${id}`);
    }
    switch (property) {
      case 'name': ep.withName(value); break;
      case 'description': ep.withDescription(value); break;
      case 'summary': ep.withSummary(value); break;
      case 'path': ep.withPath(value); break;
      default: throw new Error(`Unsupported patch property of EndPoint: ${property}`);
    }
    return ApiSerializer.endPoint(ep);
  }

  /**
   * Adds an empty operation to an endpoint.
   * @param {string} pathOrId The path or domain id of the endpoint that is the parent of the operation.
   * @param {OperationInit} init The operation initialize options
   * @returns {Promise<ApiOperation>}
   */
  async addOperation(pathOrId, init) {
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
   * @param {string} methodOrId Method name or the domain id of the operation to find
   * @param {string=} pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   * @returns {Operation|undefined}
   */
  findOperation(methodOrId, pathOrId) {
    if (pathOrId) {
      const ep = this.findEndpoint(pathOrId);
      if (!ep) {
        return undefined;
      }
      return ep.operations.find((op) => op.id === methodOrId || (op.method && op.method.value()) === methodOrId);
    }
    const api = this.webApi();
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
   * @param {string} methodOrId Method name or the domain id of the operation to find
   * @param {string=} pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   * @returns {Promise<ApiOperation>}
   */
  async getOperation(methodOrId, pathOrId) {
    const op = this.findOperation(methodOrId, pathOrId);
    if (!op) {
      throw new Error(`No operation ${methodOrId} in the graph`);
    }
    return ApiSerializer.operation(op);
  }

  /**
   * Reads the operation model with all sub-models.
   * @param {string} methodOrId Method name or the domain id of the operation to find
   * @param {string=} pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   * @returns {Promise<ApiOperationRecursive>}
   */
  async getOperationRecursive(methodOrId, pathOrId) {
    const op = this.findOperation(methodOrId, pathOrId);
    if (!op) {
      throw new Error(`No operation ${methodOrId} in the graph`);
    }
    return ApiSerializer.operationRecursive(op);
  }

  /**
   * Lists all operations in an endpoint.
   * @param {string} pathOrId The domain id of the endpoint to list operations from or its path.
   * @returns {Promise<ApiOperationListItem[]>}
   */
  async listOperations(pathOrId) {
    const ep = this.findEndpoint(pathOrId);
    if (!ep) {
      throw new Error(`EndPoint not found: ${pathOrId}`);
    }
    return ep.operations.map((op) => ApiSerializer.operationListItem(op));
  }

  /**
   * Removes an operation from the graph.
   * @param {string} id The operation id to remove.
   * @param {string} endpointId The domain id of the parent endpoint.
   * @returns {Promise<string|undefined>} The id of the affected endpoint. Undefined when operation or endpoint cannot be found.
   */
  async deleteOperation(id, endpointId) {
    const endpoint = /** @type EndPoint */ (this.graph.findById(endpointId));
    if (!endpoint) {
      throw new Error(`No EndPoint for given id ${id}`);
    }
    const remaining = endpoint.operations.filter((op) => op.id !== id);
    endpoint.withOperations(remaining);
    return endpoint.id;
  }

  /**
   * Finds an endpoint that has the operation.
   * @param {string} methodOrId Method name or the domain id of the operation to find
   * @param {string=} pathOrId Optional endpoint path or its id. When not set it searches through all endpoints.
   * @returns {Promise<ApiEndPoint|undefined>}
   */
  async getOperationParent(methodOrId, pathOrId) {
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
   * @param {string} id The id of the operation
   * @returns {EndPoint|undefined}
   */
  findOperationParent(id) {
    const api = this.webApi();
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
   * @param {string} id The domain id of the operation.
   * @param {keyof Operation} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiOperation>}
   */
  async updateOperationProperty(id, property, value) {
    const op = /** @type Operation */ (this.graph.findById(id));
    if (!op) {
      throw new Error(`No operation for given id ${id}`);
    }
    switch (property) {
      case 'method': op.withMethod(value); break;
      case 'name': op.withName(value); break;
      case 'description': op.withDescription(value); break;
      case 'summary': op.withSummary(value); break;
      case 'deprecated': op.withDeprecated(value); break;
      case 'schemes': op.withSchemes(value); break;
      case 'accepts': op.withAccepts(value); break;
      case 'contentType': op.withContentType(value); break;
      default: throw new Error(`Unsupported patch property of Operation: ${property}`);
    }
    return ApiSerializer.operation(op);
  }

  /**
   * @param {string} operationId The operation domain id
   * @param {OperationResponseInit} init The response init options.
   * @returns {Promise<ApiResponse>} The domain id of the created response
   */
  async addResponse(operationId, init) {
    const op = /** @type Operation */ (this.graph.findById(operationId));
    if (!op) {
      throw new Error(`No operation for given id ${operationId}`);
    }
    const model = op.withResponse(init.name);
    if (init.statusCode) {
      model.withStatusCode(init.statusCode);
    }
    if (init.description) {
      model.withDescription(init.description);
    }
    if (Array.isArray(init.headers) && init.headers.length) {
      init.headers.forEach((h) => model.withHeader(h).withBinding('header'));
    }
    if (Array.isArray(init.payloads) && init.payloads.length) {
      init.payloads.forEach((p) => model.withPayload(p));
    }
    return ApiSerializer.response(model);
  }

  /**
   * Reads the response data from the graph.
   * @param {string} id The domain id of the response.
   * @returns {Promise<ApiResponse>}
   */
  async getResponse(id) {
    const response = /** @type Response */ (this.graph.findById(id));
    if (!response) {
      throw new Error(`No Response for ${id}`);
    }
    return ApiSerializer.response(response);
  }

  /**
   * Reads the response data from the graph and returns the full serialized model.
   * @param {string} id The domain id of the response.
   * @returns {Promise<ApiResponseRecursive>}
   */
  async getResponseRecursive(id) {
    const response = /** @type Response */ (this.graph.findById(id));
    if (!response) {
      throw new Error(`No Response for ${id}`);
    }
    return ApiSerializer.responseRecursive(response);
  }

  /**
   * Reads Response data in a bulk operation
   * @param {string[]} ids The ids to read
   * @returns {Promise<ApiResponse[]>}
   */
  async getResponses(ids) {
    /** @type ApiResponse[] */
    const result = [];
    ids.forEach((id) => {
      const param = /** @type Response */ (this.graph.findById(id));
      if (param) {
        result.push(ApiSerializer.response(param));
      } else {
        result.push(undefined);
      }
    });
    return result;
  }

  /**
   * Reads Response data in a bulk operation and returns the full serialized model.
   * @param {string[]} ids The ids to read
   * @returns {Promise<ApiResponseRecursive[]>}
   */
  async getResponsesRecursive(ids) {
    /** @type ApiResponseRecursive[] */
    const result = [];
    ids.forEach((id) => {
      const param = /** @type Response */ (this.graph.findById(id));
      if (param) {
        result.push(ApiSerializer.responseRecursive(param));
      } else {
        result.push(undefined);
      }
    });
    return result;
  }

  /**
   * Adds a header to the response.
   * @param {string} responseId The response domain id
   * @param {ParameterInit} init The Parameter init options.
   * @returns {Promise<ApiParameter>}
   */
  async addResponseHeader(responseId, init) {
    const response = /** @type Response */ (this.graph.findById(responseId));
    if (!response) {
      throw new Error(`No response for given id ${responseId}`);
    }
    const param = response.withHeader(init.name);
    this.fillParameter(param, init);
    return ApiSerializer.parameter(param);
  }

  /**
   * Removes a header from a response
   * @param {string} responseId The response id to remove the header from
   * @param {string} headerId The header id to remove.
   * @returns {Promise<ApiResponse>} Updated response
   */
  async removeResponseHeader(responseId, headerId) {
    const response = /** @type Response */ (this.graph.findById(responseId));
    if (!response) {
      throw new Error(`No response for given id ${responseId}`);
    }
    const remaining = response.headers.filter((i) => i.id !== headerId);
    response.withHeaders(remaining);
    return ApiSerializer.response(response);
  }

  /**
   * Creates a new payload in the response.
   * @param {string} responseId The response domain id
   * @param {PayloadInit} init The payload init options
   * @returns {Promise<ApiPayload>} Created payload object.
   */
  async addResponsePayload(responseId, init) {
    const response = /** @type Response */ (this.graph.findById(responseId));
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
   * @param {string} responseId The response domain id
   * @param {string} payloadId The payload domain id.
   * @returns {Promise<void>}
   */
  async removeResponsePayload(responseId, payloadId) {
    const response = /** @type Response */ (this.graph.findById(responseId));
    if (!response) {
      throw new Error(`No Response for ${responseId}`);
    }
    const remaining = response.payloads.filter((item) => item.id !== payloadId);
    response.withPayloads(remaining);
  }

  /**
   * Updates a scalar property of a Response.
   * @param {string} id The domain id of the response.
   * @param {keyof Response} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiResponse>} The updated response
   */
  async updateResponseProperty(id, property, value) {
    const response = /** @type Response */ (this.graph.findById(id));
    if (!response) {
      throw new Error(`No response for given id ${id}`);
    }
    switch (property) {
      case 'name': response.withName(value); break;
      case 'description': response.withDescription(value); break;
      case 'statusCode': response.withStatusCode(value); break;
      default: throw new Error(`Unsupported patch property of Response: ${property}`);
    }
    return ApiSerializer.response(response);
  }

  /**
   * @param {string} responseId The response id to delete
   * @param {string} operationId The id of the parent operation that has the response
   * @returns {Promise<void>}
   */
  async deleteResponse(responseId, operationId) {
    const operation = this.findOperation(operationId);
    if (!operation) {
      throw new Error(`No operation for given id ${operationId}`);
    }
    const remaining = operation.responses.filter((r) => r.id !== responseId);
    operation.withResponses(remaining);
  }

  /**
   * Reads example value from the store.
   * @param {string} id The id of the example to read.
   * @returns {Promise<ApiExample>}
   */
  async getExample(id) {
    const example = /** @type Example */ (this.graph.findById(id));
    if (!example) {
      throw new Error(`No Example for ${id}`);
    }
    return ApiSerializer.example(example);
  }

  /**
   * Reads Example data in a bulk operation
   * @param {string[]} ids The ids to read
   * @returns {Promise<ApiExample[]>}
   */
  async getExamples(ids) {
    /** @type ApiExample[] */
    const result = [];
    ids.forEach((id) => {
      const param = /** @type Example */ (this.graph.findById(id));
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
   * @param {string} id The domain id of the response.
   * @param {keyof Example} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiExample>} The updated example
   */
  async updateExampleProperty(id, property, value) {
    const example = /** @type Example */ (this.graph.findById(id));
    if (!example) {
      throw new Error(`No response for given id ${id}`);
    }
    switch (property) {
      case 'name': example.withName(value); break;
      case 'displayName': example.withDisplayName(value); break;
      case 'description': example.withDescription(value); break;
      case 'value': example.withValue(value); break;
      case 'mediaType': example.withMediaType(value); break;
      case 'strict': example.withStrict(value); break;
      default: throw new Error(`Unsupported patch property of Example: ${property}`);
    }
    return ApiSerializer.example(example);
  }

  /**
   * Reads Payload data from the graph
   * @param {string} id The domain id of the payload
   * @returns {Promise<ApiPayload>}
   */
  async getPayload(id) {
    const payload = /** @type Payload */ (this.graph.findById(id));
    if (!payload) {
      throw new Error(`No Payload for ${id}`);
    }
    return ApiSerializer.payload(payload);
  }

  /**
   * Reads Payload data from the graph and returns the full serialized model.
   * @param {string} id The domain id of the payload
   * @returns {Promise<ApiPayloadRecursive>}
   */
  async getPayloadRecursive(id) {
    const payload = /** @type Payload */ (this.graph.findById(id));
    if (!payload) {
      throw new Error(`No Payload for ${id}`);
    }
    return ApiSerializer.payloadRecursive(payload);
  }

  /**
   * Reads Payload data in a bulk operation
   * @param {string[]} ids The ids to read
   * @returns {Promise<ApiPayload[]>}
   */
  async getPayloads(ids) {
    /** @type ApiPayload[] */
    const result = [];
    ids.forEach((id) => {
      const param = /** @type Payload */ (this.graph.findById(id));
      if (param) {
        result.push(ApiSerializer.payload(param));
      } else {
        result.push(undefined);
      }
    });
    return result;
  }

  /**
   * Reads Payload data in a bulk operation and returns the full serialized model.
   * @param {string[]} ids The ids to read
   * @returns {Promise<ApiPayloadRecursive[]>}
   */
  async getPayloadsRecursive(ids) {
    /** @type ApiPayloadRecursive[] */
    const result = [];
    ids.forEach((id) => {
      const param = /** @type Payload */ (this.graph.findById(id));
      if (param) {
        result.push(ApiSerializer.payloadRecursive(param));
      } else {
        result.push(undefined);
      }
    });
    return result;
  }

  /**
   * Adds an example to a Payload
   * @param {string} id The if of the Payload to add the example to
   * @param {ExampleInit} init The example init options
   * @returns {Promise<ApiExample>}
   */
  async addPayloadExample(id, init) {
    const payload = /** @type Payload */ (this.graph.findById(id));
    if (!payload) {
      throw new Error(`No Payload for ${id}`);
    }
    const example = payload.withExample(init.name);
    this.fillExample(example, init);
    return ApiSerializer.example(example);
  }

  /**
   * Removes an example from the Payload.
   * @param {string} payloadId The domain id of the Payload
   * @param {string} exampleId The domain id of the Example to remove.
   */
  async removePayloadExample(payloadId, exampleId) {
    const payload = /** @type Payload */ (this.graph.findById(payloadId));
    if (!payload) {
      throw new Error(`No Payload for ${payloadId}`);
    }
    const remaining = payload.examples.filter((item) => item.id !== exampleId);
    payload.withExamples(remaining);
  }

  /**
   * Updates a scalar property of a Payload.
   * @param {string} id The domain id of the payload.
   * @param {keyof Payload} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiPayload>} The updated Payload
   */
  async updatePayloadProperty(id, property, value) {
    const payload = /** @type Payload */ (this.graph.findById(id));
    if (!payload) {
      throw new Error(`No payload for given id ${id}`);
    }
    switch (property) {
      case 'name': payload.withName(value); break;
      case 'mediaType': payload.withMediaType(value); break;
      default: throw new Error(`Unsupported patch property of Response: ${property}`);
    }
    return ApiSerializer.payload(payload);
  }

  /**
   * Reads the TemplatedLink object from the graph.
   * @param {string} id The domain id of the TemplatedLink
   * @returns {Promise<ApiTemplatedLink>}
   */
  async getTemplatedLink(id) {
    const link = /** @type TemplatedLink */ (this.graph.findById(id));
    if (!link) {
      throw new Error(`No TemplatedLink for ${id}`);
    }
    return ApiSerializer.templatedLink(link);
  }

  /**
   * Lists the custom domain properties (domain extensions, annotations) definitions for the API.
   * @returns {Promise<ApiCustomDomainPropertyListItem[]>}
   */
  async listCustomDomainProperties() {
    const result = /** @type ApiCustomDomainPropertyListItem[] */ ([]);
    this.graph.declares.forEach((obj) => {
      const types = obj.graph().types();
      if (!types.includes(ns.aml.vocabularies.document.DomainProperty)) {
        return;
      }
      const object = /** @type CustomDomainProperty */ (obj);
      const item = ApiSerializer.domainPropertyListItem(object);
      result.push(item);
    });
    return result;
  }

  /**
   * Creates a new type in the API.
   * @param {CustomDomainPropertyInit=} init The Shape init options.
   * @returns {Promise<ApiCustomDomainProperty>}
   */
  async addCustomDomainProperty(init) {
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
   * @param {string} id The domain id of the CustomDomainProperty
   * @returns {Promise<ApiCustomDomainProperty>}
   */
  async getCustomDomainProperty(id) {
    const object = /** @type CustomDomainProperty */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No CustomDomainProperty for ${id}`);
    }
    return ApiSerializer.customDomainProperty(object);
  }

  /**
   * Removes a CustomDomainProperty from the API.
   * @param {string} id The domain id of the CustomDomainProperty to remove
   * @returns {Promise<boolean>} True when the property was found and removed.
   */
  async deleteCustomDomainProperty(id) {
    return this.deleteFromDeclares(id);
  }

  /**
   * Updates a scalar property of a CustomDomainProperty.
   * @param {string} id The domain id of the object.
   * @param {keyof CustomDomainProperty} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiCustomDomainProperty>} The updated custom domain property
   */
  async updateCustomDomainProperty(id, property, value) {
    const object = /** @type CustomDomainProperty */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No CustomDomainProperty for given id ${id}`);
    }
    switch (property) {
      case 'description': object.withDescription(value); break;
      case 'displayName': object.withDisplayName(value); break;
      case 'name': object.withName(value); break;
      default: throw new Error(`Unsupported patch property of CustomDomainProperty: ${property}`);
    }
    return ApiSerializer.customDomainProperty(object);
  }

  /**
   * Reads the DomainExtension object from the graph.
   * This is a definition of applied to an object domain extension (RAML annotation).
   * 
   * @param {string} id The domain id of the CustomDomainProperty
   * @returns {Promise<ApiDomainExtension>}
   */
  async getDomainExtension(id) {
    const object = /** @type DomainExtension */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No DomainExtension for ${id}`);
    }
    return ApiSerializer.domainExtension(object);
  }

  /**
   * Reads the Request object from the graph.
   * @param {string} id The domain id of the Request
   * @returns {Promise<ApiRequest>}
   */
  async getRequest(id) {
    const object = /** @type Request */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No Request for ${id}`);
    }
    return ApiSerializer.request(object);
  }

  /**
   * Reads the Request object from the graph and returns the full serialized model.
   * @param {string} id The domain id of the Request
   * @returns {Promise<ApiRequestRecursive>}
   */
  async getRequestRecursive(id) {
    const object = /** @type Request */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No Request for ${id}`);
    }
    return ApiSerializer.requestRecursive(object);
  }

  /**
   * @param {string} operationId The operation domain id
   * @param {OperationRequestInit=} init The request init options. Optional.
   * @returns {Promise<ApiRequest>} The domain id of the created request
   */
  async addRequest(operationId, init) {
    const opts = init || {};
    const op = /** @type Operation */ (this.graph.findById(operationId));
    if (!op) {
      throw new Error(`No operation for given id ${operationId}`);
    }
    const model = /** @type Request */ (op.withRequest());
    if (opts.description) {
      model.withDescription(opts.description);
    }
    if (typeof opts.required === 'boolean') {
      model.withRequired(opts.required);
    }
    if (Array.isArray(opts.headers) && opts.headers.length) {
      opts.headers.forEach((h) => model.withHeader(h).withBinding('header'));
    }
    if (Array.isArray(opts.payloads) && opts.payloads.length) {
      opts.payloads.forEach((p) => model.withPayload(p));
    }
    if (Array.isArray(opts.queryParameters) && opts.queryParameters.length) {
      opts.queryParameters.forEach((p) => model.withQueryParameter(p).withBinding('query'));
    }
    if (Array.isArray(opts.uriParameters) && opts.uriParameters.length) {
      opts.uriParameters.forEach((p) => model.withUriParameter(p).withBinding('url'));
    }
    if (Array.isArray(opts.cookieParameters) && opts.cookieParameters.length) {
      opts.cookieParameters.forEach((p) => model.withCookieParameter(p).withBinding('cookie'));
    }
    return ApiSerializer.request(model);
  }

  /**
   * Adds a header to the request.
   * @param {string} requestId The request domain id
   * @param {ParameterInit} init The Parameter init options.
   * @returns {Promise<ApiParameter>}
   */
  async addRequestHeader(requestId, init) {
    const request = /** @type Request */ (this.graph.findById(requestId));
    if (!request) {
      throw new Error(`No request for given id ${requestId}`);
    }
    const param = request.withHeader(init.name).withBinding('header');
    this.fillParameter(param, init);
    return ApiSerializer.parameter(param);
  }

  /**
   * Removes a header from a request
   * @param {string} requestId The request id to remove the header from
   * @param {string} headerId The header id to remove.
   * @returns {Promise<ApiRequest>} Updated request
   */
  async removeRequestHeader(requestId, headerId) {
    const request = /** @type Request */ (this.graph.findById(requestId));
    if (!request) {
      throw new Error(`No request for given id ${requestId}`);
    }
    const remaining = request.headers.filter((i) => i.id !== headerId);
    request.withHeaders(remaining);
    return ApiSerializer.request(request);
  }

  /**
   * Adds a query parameter to the request.
   * @param {string} requestId The request domain id
   * @param {ParameterInit} init The Parameter init options.
   * @returns {Promise<ApiParameter>}
   */
  async addRequestQueryParameter(requestId, init) {
    const request = /** @type Request */ (this.graph.findById(requestId));
    if (!request) {
      throw new Error(`No request for given id ${requestId}`);
    }
    const param = request.withQueryParameter(init.name).withBinding('query');
    this.fillParameter(param, init);
    return ApiSerializer.parameter(param);
  }

  /**
   * Removes a query parameter from a request
   * @param {string} requestId The request id to remove the parameter from
   * @param {string} paramId The parameter id to remove.
   * @returns {Promise<ApiRequest>} Updated request
   */
  async removeRequestQueryParameter(requestId, paramId) {
    const request = /** @type Request */ (this.graph.findById(requestId));
    if (!request) {
      throw new Error(`No request for given id ${requestId}`);
    }
    const remaining = request.queryParameters.filter((i) => i.id !== paramId);
    request.withQueryParameters(remaining);
    return ApiSerializer.request(request);
  }

  /**
   * Adds a cookie to the request.
   * @param {string} requestId The request domain id
   * @param {ParameterInit} init The Parameter init options.
   * @returns {Promise<ApiParameter>}
   */
  async addRequestCookieParameter(requestId, init) {
    const request = /** @type Request */ (this.graph.findById(requestId));
    if (!request) {
      throw new Error(`No request for given id ${requestId}`);
    }
    const param = request.withCookieParameter(init.name).withBinding('cookie');
    this.fillParameter(param, init);
    return ApiSerializer.parameter(param);
  }

  /**
   * Removes a cookie parameter from a request
   * @param {string} requestId The request id to remove the parameter from
   * @param {string} paramId The parameter id to remove.
   * @returns {Promise<ApiRequest>} Updated request
   */
  async removeRequestCookieParameter(requestId, paramId) {
    const request = /** @type Request */ (this.graph.findById(requestId));
    if (!request) {
      throw new Error(`No request for given id ${requestId}`);
    }
    const remaining = request.cookieParameters.filter((i) => i.id !== paramId);
    request.withCookieParameters(remaining);
    return ApiSerializer.request(request);
  }

  /**
   * Creates a new payload in the request.
   * @param {string} requestId The request domain id
   * @param {PayloadInit} init The payload init options
   * @returns {Promise<ApiPayload>} Created payload object.
   */
  async addRequestPayload(requestId, init) {
    const request = /** @type Request */ (this.graph.findById(requestId));
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
   * @param {string} requestId The request domain id
   * @param {string} payloadId The payload domain id.
   * @returns {Promise<void>}
   */
  async removeRequestPayload(requestId, payloadId) {
    const request = /** @type Request */ (this.graph.findById(requestId));
    if (!request) {
      throw new Error(`No Request for ${requestId}`);
    }
    const remaining = request.payloads.filter((item) => item.id !== payloadId);
    request.withPayloads(remaining);
  }

  /**
   * @param {string} requestId The request id to delete
   * @param {string} operationId The id of the parent operation that has the request
   * @returns {Promise<void>}
   */
  async deleteRequest(requestId, operationId) {
    const operation = this.findOperation(operationId);
    if (!operation) {
      throw new Error(`No operation for ${operationId}`);
    }
    operation.graph().remove(ns.aml.vocabularies.apiContract.expects);
  }

  /**
   * Updates a scalar property of a Request.
   * @param {string} id The domain id of the request.
   * @param {keyof Request} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiRequest>} The updated request
   */
  async updateRequestProperty(id, property, value) {
    const rq = /** @type Request */ (this.graph.findById(id));
    if (!rq) {
      throw new Error(`No request for given id ${id}`);
    }
    switch (property) {
      case 'description': rq.withDescription(value); break;
      case 'required': rq.withRequired(value); break;
      default: throw new Error(`Unsupported patch property of Request: ${property}`);
    }
    return ApiSerializer.request(rq);
  }

  /**
   * @param {Parameter} param 
   * @param {ParameterInit} init 
   */
  fillParameter(param, init) {
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
      param.withDescription(description);
    }
    if (style) {
      param.withStyle(style);
    }
    if (binding) {
      param.withBinding(binding);
    }
    if (dataType) {
      const dt = ns.w3.xmlSchema[dataType];
      if (dt) {
        param.withScalarSchema(name).withDataType(dt);
      }
    }
  }

  /**
   * Reads the info about a parameter.
   * @param {string} id The domain id of the parameter
   * @returns {Promise<ApiParameter>}
   */
  async getParameter(id) {
    const param = /** @type Parameter */ (this.graph.findById(id));
    if (!param) {
      throw new Error(`No Parameter for ${id}`);
    }
    return ApiSerializer.parameter(param);
  }

  /**
   * Reads the info about a parameter and returns the full schema.
   * @param {string} id The domain id of the parameter
   * @returns {Promise<ApiParameterRecursive>}
   */
  async getParameterRecursive(id) {
    const param = /** @type Parameter */ (this.graph.findById(id));
    if (!param) {
      throw new Error(`No Parameter for ${id}`);
    }
    return ApiSerializer.parameterRecursive(param);
  }

  /**
   * Reads the list of Parameters in a single call.
   * @param {string[]} ids
   * @returns {Promise<ApiParameter[]>}
   */
  async getParameters(ids) {
    /** @type ApiParameter[] */
    const result = [];
    ids.forEach((id) => {
      const param = /** @type Parameter */ (this.graph.findById(id));
      if (param) {
        result.push(ApiSerializer.parameter(param));
      } else {
        result.push(undefined);
      }
    });
    return result;
  }

  /**
   * Reads the list of Parameters in a single call and returns the full schema.
   * @param {string[]} ids
   * @returns {Promise<ApiParameterRecursive[]>}
   */
  async getParametersRecursive(ids) {
    /** @type ApiParameterRecursive[] */
    const result = [];
    ids.forEach((id) => {
      const param = /** @type Parameter */ (this.graph.findById(id));
      if (param) {
        result.push(ApiSerializer.parameterRecursive(param));
      } else {
        result.push(undefined);
      }
    });
    return result;
  }

  /**
   * Updates a scalar property of a Parameter.
   * @param {string} id The domain id of the parameter.
   * @param {keyof Parameter} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiParameter>} The updated Parameter
   */
  async updateParameterProperty(id, property, value) {
    const param = /** @type Parameter */ (this.graph.findById(id));
    if (!param) {
      throw new Error(`No parameter for given id ${id}`);
    }
    switch (property) {
      case 'name': param.withName(value); break;
      case 'description': param.withDescription(value); break;
      case 'required': param.withRequired(value); break;
      case 'deprecated': param.withDeprecated(value); break;
      case 'allowEmptyValue': param.withAllowEmptyValue(value); break;
      case 'style': param.withStyle(value); break;
      case 'explode': param.withExplode(value); break;
      case 'allowReserved': param.withAllowReserved(value); break;
      case 'binding': param.withBinding(value); break;
      default: throw new Error(`Unsupported patch property of Parameter: ${property}`);
    }
    return ApiSerializer.parameter(param);
  }

  /**
   * Adds an example to a Parameter
   * @param {string} id The if of the Parameter to add the example to
   * @param {ExampleInit} init The example init options
   * @returns {Promise<ApiExample>}
   */
  async addParameterExample(id, init) {
    const param = /** @type Parameter */ (this.graph.findById(id));
    if (!param) {
      throw new Error(`No Parameter for ${id}`);
    }
    const example = param.withExample(init.name);
    this.fillExample(example, init);
    return ApiSerializer.example(example);
  }

  /**
   * Removes an example from the parameter.
   * @param {string} paramId The domain id of the Parameter
   * @param {string} exampleId The domain id of the Example to remove.
   */
  async removeParameterExample(paramId, exampleId) {
    const param = /** @type Parameter */ (this.graph.findById(paramId));
    if (!param) {
      throw new Error(`No Parameter for ${paramId}`);
    }
    const remaining = param.examples.filter((item) => item.id !== exampleId);
    param.withExamples(remaining);
  }

  /**
   * Fills example properties from the init object
   * @param {Example} example The example to add properties to
   * @param {ExampleInit} init The example init options
   */
  fillExample(example, init) {
    if (init.displayName) {
      example.withDisplayName(init.displayName);
    }
    if (init.description) {
      example.withDescription(init.description);
    }
    if (init.value) {
      example.withValue(init.value);
    }
    if (init.mediaType) {
      example.withMediaType(init.mediaType);
    }
    if (typeof init.strict === 'boolean') {
      example.withStrict(init.strict);
    }
  }

  /**
   * Lists the documentation definitions for the API.
   * @returns {Promise<ApiDocumentation[]>}
   */
  async listDocumentations() {
    const docs = /** @type CreativeWork[] */ (this.graph.findByType(ns.aml.vocabularies.core.CreativeWork));
    return docs.map((doc) => ApiSerializer.documentation(doc));
    // const api = this.webApi();
    // return api.documentations.map((doc) => ApiSerializer.documentation(doc));
  }

  /**
   * Adds a new documentation object to the graph.
   * @param {DocumentationInit} init The initialization properties
   * @returns {Promise<ApiDocumentation>} The created documentation.
   */
  async addDocumentation(init) {
    const { description, title='Unnamed documentation', url } = init;
    const api = this.webApi();
    let doc;
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
   * @param {string} id The domain id of the documentation object
   * @returns {Promise<ApiDocumentation|undefined>} The read documentation.
   */
  async getDocumentation(id) {
    const doc = /** @type CreativeWork */ (this.graph.findById(id));
    if (!doc) {
      return undefined;
    }
    return ApiSerializer.documentation(doc);
  }

  /**
   * Updates a scalar property of a documentation.
   * @param {string} id The domain id of the documentation.
   * @param {keyof CreativeWork} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiDocumentation>}
   */
  async updateDocumentationProperty(id, property, value) {
    const doc = /** @type CreativeWork */ (this.graph.findById(id));
    if (!doc) {
      throw new Error(`No documentation for given id ${id}`);
    }
    switch (property) {
      case 'description': doc.withDescription(value); break;
      case 'title': doc.withTitle(value); break;
      case 'url': doc.withUrl(value); break;
      default: throw new Error(`Unsupported patch property of documentation: ${property}`);
    }
    return ApiSerializer.documentation(doc);
  }

  /**
   * Removes the documentation from the graph.
   * @param {string} id The domain id of the documentation object
   */
  async deleteDocumentation(id) {
    const api = this.webApi();
    const remaining = api.documentations.filter(item => item.id !== id);
    api.withDocumentation(remaining);
  }

  /**
   * Lists the type (schema) definitions for the API.
   * @returns {Promise<ApiNodeShapeListItem[]>}
   */
  async listTypes() {
    const result = /** @type ApiNodeShapeListItem[] */ ([]);
    this.graph.declares.forEach((obj) => {
      const types = obj.graph().types();
      
      if (!types.includes(ns.w3.shacl.NodeShape) && !types.includes(ns.aml.vocabularies.shapes.ScalarShape)) {
        return;
      }
      const type = /** @type NodeShape */ (obj);
      const item = ApiSerializer.nodeShapeListItem(type);
      result.push(item);
    });
    const refs = /** @type Dialect[] */ (this.graph.references());
    refs.forEach((ref) => {
      const { declares } = ref;
      if (!declares || !declares.length) {
        return;
      }
      declares.forEach((obj) => {
        const types = obj.graph().types();
        if (!types.includes(ns.w3.shacl.NodeShape) && !types.includes(ns.aml.vocabularies.shapes.ScalarShape)) {
          return;
        }
        const type = /** @type NodeShape */ (obj);
        const item = ApiSerializer.nodeShapeListItem(type);
        result.push(item);
      });
    });
    return result;
  }

  /**
   * @param {string} id The domain id of the API type (schema).
   * @returns {Promise<ApiShapeUnion>}
   */
  async getType(id) {
    const type = /** @type Shape */ (this.graph.findById(id));
    if (!type) {
      return undefined;
    }
    return ApiSerializer.unknownShape(type);
  }

  /**
   * Reads types data in a bulk operation
   * @param {string[]} ids The ids to read
   * @returns {Promise<ApiShapeUnion[]>}
   */
  async getTypes(ids) {
    /** @type ApiShapeUnion[] */
    const result = [];
    ids.forEach((id) => {
      const param = /** @type Shape */ (this.graph.findById(id));
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
   * @param {ShapeInit=} init The Shape init options.
   * @returns {Shape}
   */
  buildShape(init) {
    const options = init || {};
    const { type, description, name, displayName, readOnly, writeOnly } = options;
    let domainElement = /** @type Shape */ (null);
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
      domainElement.withName(name);
    }
    if (displayName) {
      domainElement.withDisplayName(displayName);
    }
    if (description) {
      domainElement.withDescription(description);
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
   * @param {ShapeInit=} init The Shape init options.
   * @returns {Promise<ApiShapeUnion>}
   */
  async addType(init) {
    const domainElement = this.buildShape(init);
    this.graph.withDeclaredElement(domainElement);
    return ApiSerializer.unknownShape(domainElement);
  }

  /**
   * Removes a type for a given domain id.
   * @param {string} id The type domain id.
   * @returns {Promise<boolean>} True when the type has been found and removed.
   */
  async deleteType(id) {
    return this.deleteFromDeclares(id);
  }

  /**
   * Updates a scalar property of a type.
   * @param {string} id The domain id of the type.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {Promise<ApiShapeUnion>}
   */
  async updateTypeProperty(id, property, value) {
    const object = /** @type AnyShape */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No type for ${id}`);
    }
    const types = object.graph().types();
    if (types.includes(ns.aml.vocabularies.shapes.ScalarShape)) {
      this.updateScalarShapeProperty(/** @type ScalarShape */ (object), property, value);
    } else if (types.includes(ns.w3.shacl.NodeShape)) {
      this.updateNodeShapeProperty(/** @type NodeShape */ (object), property, value);
    } else if (types.includes(ns.aml.vocabularies.shapes.UnionShape)) {
      if (!this.updateAnyShapeProperty(object, property, value)) {
        throw new Error(`Unsupported patch property of UnionShape: ${property}`);
      }
    } else if (types.includes(ns.aml.vocabularies.shapes.FileShape)) {
      this.updateFileShapeProperty(/** @type FileShape */ (object), property, value);
    } else if (types.includes(ns.aml.vocabularies.shapes.SchemaShape)) {
      this.updateSchemaShapeProperty(/** @type SchemaShape */ (object), property, value);
    } else if (types.includes(ns.aml.vocabularies.shapes.TupleShape)) {
      this.updateTupleShapeProperty(/** @type TupleShape */ (object), property, value);
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
   * @param {AnyShape} shape The domain id of the type.
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   * @returns {boolean} `true` when the shape has been updated.
   */
  updateAnyShapeProperty(shape, property, value) {
    switch (property) {
      case 'name': shape.withName(value); break;
      case 'displayName': shape.withDisplayName(value); break;
      case 'description': shape.withDescription(value); break;
      case 'defaultValueStr': shape.withDefaultStr(value); break;
      case 'readOnly': shape.withReadOnly(value); break;
      case 'writeOnly': shape.withWriteOnly(value); break;
      case 'deprecated': shape.withDeprecated(value); break;
      default: return false;
    }
    return true;
  }

  /**
   * Updates a scalar property of a scalar type.
   * @param {ScalarShape} scalar The shape to update
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   */
  updateScalarShapeProperty(scalar, property, value) {
    if (this.updateAnyShapeProperty(scalar, property, value)) {
      return;
    }
    switch (property) {
      case 'dataType': scalar.withDataType(value); break;
      case 'pattern': scalar.withPattern(value); break;
      case 'minLength': scalar.withMinLength(value); break;
      case 'maxLength': scalar.withMaxLength(value); break;
      case 'minimum': scalar.withMinimum(value); break;
      case 'maximum': scalar.withMaximum(value); break;
      case 'exclusiveMinimum': scalar.withExclusiveMinimum(value); break;
      case 'exclusiveMaximum': scalar.withExclusiveMaximum(value); break;
      case 'format': scalar.withFormat(value); break;
      case 'multipleOf': scalar.withMultipleOf(value); break;
      default: throw new Error(`Unsupported patch property of ScalarShape: ${property}`);
    }
  }

  /**
   * Updates a scalar property of a Node type.
   * @param {NodeShape} shape The shape to update
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   */
  updateNodeShapeProperty(shape, property, value) {
    if (this.updateAnyShapeProperty(shape, property, value)) {
      return;
    }
    switch (property) {
      case 'minProperties': shape.withMinProperties(value); break;
      case 'maxProperties': shape.withMaxProperties(value); break;
      case 'closed': shape.withClosed(value); break;
      case 'discriminator': shape.withDiscriminator(value); break;
      case 'discriminatorValue': shape.withDiscriminatorValue(value); break;
      default: throw new Error(`Unsupported patch property of NodeShape: ${property}`);
    }
  }

  /**
   * Updates a scalar property of a file type.
   * @param {FileShape} shape The shape to update
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   */
  updateFileShapeProperty(shape, property, value) {
    if (this.updateAnyShapeProperty(shape, property, value)) {
      return;
    }
    switch (property) {
      case 'fileTypes': shape.withFileTypes(value); break;
      case 'pattern': shape.withPattern(value); break;
      case 'minLength': shape.withMinLength(value); break;
      case 'maxLength': shape.withMaxLength(value); break;
      case 'minimum': shape.withMinimum(value); break;
      case 'maximum': shape.withMaximum(value); break;
      case 'exclusiveMinimum': shape.withExclusiveMinimum(value); break;
      case 'exclusiveMaximum': shape.withExclusiveMaximum(value); break;
      case 'format': shape.withFormat(value); break;
      case 'multipleOf': shape.withMultipleOf(value); break;
      default: throw new Error(`Unsupported patch property of FileShape: ${property}`);
    }
  }

  /**
   * Updates a scalar property of a schema type.
   * @param {SchemaShape} shape The shape to update
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   */
  updateSchemaShapeProperty(shape, property, value) {
    if (this.updateAnyShapeProperty(shape, property, value)) {
      return;
    }
    switch (property) {
      case 'mediaType': shape.withMediatype(value); break;
      case 'raw': shape.withRaw(value); break;
      default: throw new Error(`Unsupported patch property of SchemaShape: ${property}`);
    }
  }

  /**
   * Updates a scalar property of a tuple type.
   * @param {TupleShape} shape The shape to update
   * @param {string} property The property name to update
   * @param {any} value The new value to set.
   */
  updateTupleShapeProperty(shape, property, value) {
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
   * @param {string} id The domain id of the property.
   * @returns {ApiPropertyShape}
   * @throws {Error} An error when the type couldn't be find.
   */
  getPropertyShape(id) {
    const object = /** @type PropertyShape */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No property shape for ${id}`);
    }
    return ApiSerializer.propertyShape(object);
  }

  /**
   * Creates a new property on a type.
   * @param {string} id The id of the type to add the property to.
   * @param {PropertyShapeInit} init The property initialization configuration.
   * @returns {ApiPropertyShape}
   * @throws {Error} An error when the type couldn't be find.
   * @throws {Error} An error when the type is not a NodeShape.
   */
  addPropertyShape(id, init) {
    const object = /** @type NodeShape */ (this.graph.findById(id));
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
   * @param {string} typeId The domain id of a parent type
   * @param {string} propertyId The id of the property to remove.
   * @throws {Error} An error when the type couldn't be find.
   */
  deletePropertyShape(typeId, propertyId) {
    const object = /** @type NodeShape */ (this.graph.findById(typeId));
    if (!object) {
      throw new Error(`No type for ${typeId}`);
    }
    const filtered = object.properties.filter((prop) => prop.id !== propertyId);
    object.withProperties(filtered);
  }

  /**
   * Updates a scalar property of a property of a NodeShape.
   * @param {string} parent The domain id of the parent type.
   * @param {string} id The domain id of the type.
   * @param {keyof PropertyShape} property The property name to update
   * @param {any} value The new value to set.
   * @returns {ApiPropertyShape}
   */
  updatePropertyShapeProperty(parent, id, property, value) {
    const object = /** @type PropertyShape */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No property shape for ${id}`);
    }
    switch (property) {
      case 'name': object.withName(value); break;
      case 'displayName': object.withDisplayName(value); break;
      case 'description': object.withDescription(value); break;
      case 'defaultValueStr': object.withDefaultStr(value); break;
      case 'patternName': object.withPatternName(value); break;
      case 'deprecated': object.withDeprecated(value); break;
      case 'minCount': object.withMinCount(value); break;
      case 'maxCount': object.withMaxCount(value); break;
      case 'readOnly': object.withReadOnly(value); break;
      case 'writeOnly': object.withWriteOnly(value); break;
      default: throw new Error(`Unsupported patch property of PropertyShape: ${property}`);
    }
    return ApiSerializer.propertyShape(object);
  }

  /**
   * Lists the security definitions for the API.
   * @returns {Promise<ApiSecuritySchemeListItem[]>}
   */
  async listSecurity() {
    const result = /** @type ApiSecuritySchemeListItem[] */ ([]);
    const list = /** @type SecurityScheme[] */ (this.graph.findByType(ns.aml.vocabularies.security.SecurityScheme));
    const processed = [];
    list.forEach((item) => {
      let target = item;
      if (item.isLink) {
        target = /** @type SecurityScheme */ (item.linkTarget);
      }
      if (processed.includes(target.id)) {
        return;
      }
      processed.push(target.id);
      result.push(ApiSerializer.securitySchemeListItem(item));
    });
    // this.graph.declares.forEach((obj) => {
    //   const types = obj.graph().types();
    //   if (!types.includes(ns.aml.vocabularies.security.SecurityScheme)) {
    //     return;
    //   }
    //   const type = /** @type SecurityScheme */ (obj);
    //   const item = ApiSerializer.securitySchemeListItem(type);
    //   result.push(item);
    // });
    return result;
  }

  /**
   * Reads the SecurityRequirement object from the graph.
   * @param {string} id The domain id of the SecurityRequirement
   * @returns {Promise<ApiSecurityRequirement>}
   */
  async getSecurityRequirement(id) {
    const object = /** @type SecurityRequirement */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No SecurityRequirement for ${id}`);
    }
    return ApiSerializer.securityRequirement(object);
  }

  /**
   * Reads the SecurityRequirement object from the graph.
   * @param {string} id The domain id of the SecurityRequirement
   * @returns {Promise<ApiSecurityRequirementRecursive>}
   */
  async getSecurityRequirementRecursive(id) {
    const object = /** @type SecurityRequirement */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No SecurityRequirement for ${id}`);
    }
    return ApiSerializer.securityRequirementRecursive(object);
  }

  /**
   * Reads the ParametrizedSecurityScheme object from the graph.
   * @param {string} id The domain id of the ParametrizedSecurityScheme
   * @returns {Promise<ApiParametrizedSecurityScheme>}
   */
  async getParametrizedSecurityScheme(id) {
    const object = /** @type ParametrizedSecurityScheme */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No ParametrizedSecurityScheme for ${id}`);
    }
    const result = ApiSerializer.parametrizedSecurityScheme(object);
    return result;
  }

  /**
   * Reads the ParametrizedSecurityScheme object from the graph.
   * @param {string} id The domain id of the ParametrizedSecurityScheme
   * @returns {Promise<ApiParametrizedSecuritySchemeRecursive>}
   */
  async getParametrizedSecuritySchemeRecursive(id) {
    const object = /** @type ParametrizedSecurityScheme */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No ParametrizedSecurityScheme for ${id}`);
    }
    return ApiSerializer.parametrizedSecuritySchemeRecursive(object);
  }

  /**
   * Reads the SecurityScheme object from the graph.
   * @param {string} id The domain id of the SecurityScheme
   * @returns {Promise<ApiSecurityScheme>}
   */
  async getSecurityScheme(id) {
    const object = /** @type SecurityScheme */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No SecurityScheme for ${id}`);
    }
    return ApiSerializer.securityScheme(object);
  }

  /**
   * Reads the SecurityScheme object from the graph.
   * @param {string} id The domain id of the SecurityScheme
   * @returns {Promise<ApiSecuritySchemeRecursive>}
   */
  async getSecuritySchemeRecursive(id) {
    const object = /** @type SecurityScheme */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No SecurityScheme for ${id}`);
    }
    return ApiSerializer.securitySchemeRecursive(object);
  }

  /**
   * @param {string} id The domain id of the security settings.
   * @returns {Promise<ApiSecuritySettingsUnion>}
   */
  async getSecuritySettings(id) {
    const object = /** @type Settings */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No Security Settings for ${id}`);
    }
    return ApiSerializer.securitySettings(object);
  }

  /**
   * Reads the OAuth2Flow object from the graph.
   * @param {string} id The domain id of the flow to read.
   * @returns {Promise<ApiSecurityOAuth2Flow>}
   */
  async getOAuthFlow(id) {
    const object = /** @type OAuth2Flow */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No OAuth2Flow for ${id}`);
    }
    return ApiSerializer.oAuth2Flow(object);
  }

  /**
   * Reads the OAuth2Flow object from the graph.
   * @param {string} id The domain id of the flow to read.
   * @returns {Promise<ApiSecurityScope>}
   */
  async getOAuthScope(id) {
    const object = /** @type Scope */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No OAuth2Flow for ${id}`);
    }
    return ApiSerializer.scope(object);
  }

  /**
   * Removes an object from the declares array whether it is in the API declares or in the references.
   * @param {string} id The domain object to remove.
   * @returns {boolean} True when the object has been found and removed.
   */
  deleteFromDeclares(id) {
    const dIndex = this.graph.declares.findIndex((item) => item.id === id);
    if (dIndex !== -1) {
      const copy = Array.from(this.graph.declares);
      copy.splice(dIndex, 1);
      this.graph.withDeclares(copy);
      return true;
    }
    const refs = /** @type Dialect[] */ (this.graph.references());
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
