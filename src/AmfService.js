/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* global amf */
import { ns } from '@api-components/amf-helper-mixin/src/Namespace.js';
import { ApiSerializer } from './ApiSerializer.js';

// Example https://github.com/aml-org/amf-examples/blob/snapshot/src/test/java/co/acme/model/WebApiBuilder.java

/** @typedef {import('amf-client-js').model.document.Document} Document */
/** @typedef {import('amf-client-js').model.domain.DomainElement} DomainElement */
/** @typedef {import('amf-client-js').model.domain.WebApi} WebApi */
/** @typedef {import('amf-client-js').model.domain.EndPoint} EndPoint */
/** @typedef {import('amf-client-js').model.domain.Operation} Operation */
/** @typedef {import('amf-client-js').model.domain.Request} Request */
/** @typedef {import('amf-client-js').model.domain.Server} Server */
/** @typedef {import('amf-client-js').model.domain.Parameter} Parameter */
/** @typedef {import('amf-client-js').model.domain.Example} Example */
/** @typedef {import('amf-client-js').model.domain.Payload} Payload */
/** @typedef {import('amf-client-js').model.domain.Response} Response */
/** @typedef {import('amf-client-js').model.domain.TemplatedLink} TemplatedLink */
/** @typedef {import('amf-client-js').model.domain.SecurityRequirement} SecurityRequirement */
/** @typedef {import('amf-client-js').model.domain.ParametrizedSecurityScheme} ParametrizedSecurityScheme */
/** @typedef {import('amf-client-js').model.domain.SecurityScheme} SecurityScheme */
/** @typedef {import('amf-client-js').model.domain.CustomDomainProperty} CustomDomainProperty */
/** @typedef {import('amf-client-js').model.domain.NodeShape} NodeShape */
/** @typedef {import('amf-client-js').model.domain.CreativeWork} CreativeWork */
/** @typedef {import('amf-client-js').model.domain.ScalarShape} ScalarShape */
/** @typedef {import('amf-client-js').model.domain.Shape} Shape */
/** @typedef {import('amf-client-js').model.domain.AnyShape} AnyShape */
/** @typedef {import('amf-client-js').model.domain.UnionShape} UnionShape */
/** @typedef {import('amf-client-js').model.domain.FileShape} FileShape */
/** @typedef {import('amf-client-js').model.domain.SchemaShape} SchemaShape */
/** @typedef {import('amf-client-js').model.domain.TupleShape} TupleShape */
/** @typedef {import('amf-client-js').model.document.BaseUnitWithDeclaresModel} BaseUnitWithDeclaresModel */
/** @typedef {import('amf-client-js').render.Renderer} Renderer */
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

export class AmfService {
  constructor() {
    /**
     * @type Document
     */
    this.graph = undefined;
  }

  /**
   * Loads existing API model into to graph as Document.
   * @param {string} model
   */
  async loadGraph(model) {
    // @ts-ignore
    const parser = amf.Core.parser('AMF Graph', 'application/ld+json');
    this.graph = await parser.parseStringAsync(model);
  }

  /**
   * Creates new Document in the graph.
   * @param {ApiInit=} init Api init options
   * @returns {Promise<string>} The domain id of the created WebAPI
   */
  async createWebApi(init) {
    const opts = init || {};
    // @ts-ignore
    const g = /** @type Document */ (amf.model.document.Document());
    this.graph = g;
    // @ts-ignore
    const wa = /** @type WebApi */ (amf.model.domain.WebApi());
    g.withEncodes(wa);
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
    // @ts-ignore
    const generator = /** @type Renderer */ (amf.Core.generator('RAML 1.0', 'application/yaml'));
    // @ts-ignore
    const opts = amf.render.RenderOptions().withSourceMaps.withCompactUris;
    // @ts-ignore
    return generator.generateString(this.graph, opts);
  }

  /**
   * Generates json+ld from the current graph.
   * @returns {Promise<string>} JSON+ld value of the API.
   */
  async generateGraph() {
    // @ts-ignore
    const generator = /** @type Renderer */ (amf.Core.generator('AMF Graph', 'application/ld+json'));
    // @ts-ignore
    const opts = amf.render.RenderOptions().withSourceMaps.withCompactUris;
    // @ts-ignore
    return generator.generateString(this.graph, opts);
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
    // @ts-ignore
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
   * @param {string} property The property name to update
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
    // const generator = /** @type Renderer */ (amf.Core.generator('AMF Graph', 'application/ld+json'));
    // const opts = amf.render.RenderOptions().withSourceMaps.withCompactUris;
    // return generator.generateString(op, opts);
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
   * @returns {Promise<string|undefined>} The id of the affected endpoint. Undefined when operation or endpoint cannot be found.
   */
  async deleteOperation(id) {
    const endpoint = this.findOperationParent(id);
    if (!endpoint) {
      return undefined;
    }
    const remaining = endpoint.operations.filter((op) => op.id !== id);
    endpoint.withOperations(remaining);
    return endpoint.id;
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
   * @param {string} property The property name to update
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
   * @param {OperationRequestInit=} init The request init options. Optional.
   * @returns {Promise<string>} The domain id of the created request
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
    return model.id;
  }

  /**
   * @param {string} operationId The operation domain id
   * @param {OperationResponseInit} init The response init options.
   * @returns {Promise<string>} The domain id of the created response
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
      init.headers.forEach((h) => model.withHeader(h));
    }
    if (Array.isArray(init.payloads) && init.payloads.length) {
      init.payloads.forEach((p) => model.withPayload(p));
    }
    return model.id;
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
   * Reads the CustomDomainProperty object from the graph.
   * @param {string} id The domain id of the CustomDomainProperty
   * @returns {Promise<ApiCustomDomainProperty>}
   */
  async getCustomDomainProperty(id) {
    const object = /** @type CustomDomainProperty */ (this.graph.findById(id));
    if (!object) {
      throw new Error(`No CustomDomainProperty for ${id}`);
    }
    const result = /** @type ApiCustomDomainProperty */ ({
      id: object.id,
      isLink: object.isLink,
      domain: [],
    });
    if (!object.name.isNullOrEmpty) {
      result.name = object.name.value();
    }
    if (!object.displayName.isNullOrEmpty) {
      result.displayName = object.displayName.value();
    }
    if (!object.description.isNullOrEmpty) {
      result.description = object.description.value();
    }
    if (!object.linkLabel.isNullOrEmpty) {
      result.linkLabel = object.linkLabel.value();
    }
    if (Array.isArray(object.domain) && object.domain.length) {
      result.domain = object.domain.map((p) => p.value());
    }
    if (object.schema) {
      result.schema = object.schema.id;
    }
    if (object.linkTarget) {
      result.linkTarget = object.linkTarget.id;
    }
    return result;
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
   * Lists the documentation definitions for the API.
   * @returns {Promise<ApiDocumentation[]>}
   */
  async listDocumentations() {
    const docs = /** @type CreativeWork[] */ (this.graph.findByType('http://a.ml/vocabularies/core#CreativeWork'));
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
   * @param {string} property The property name to update
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
    const refs = /** @type BaseUnitWithDeclaresModel[] */ (this.graph.references());
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
   * Creates a new type in the API.
   * @param {ShapeInit=} init The Shape init options.
   * @returns {Promise<ApiShapeUnion>}
   */
  async addType(init) {
    const options = init || {};
    const { type, description, name, displayName, readOnly, writeOnly } = options;
    let domainElement = /** @type Shape */ (null);
    if (type === ns.aml.vocabularies.shapes.ScalarShape) {
      // @ts-ignore
      domainElement = amf.model.domain.ScalarShape();
    } else if (type === ns.w3.shacl.NodeShape) {
      // @ts-ignore
      domainElement = amf.model.domain.NodeShape();
    } else if (type === ns.aml.vocabularies.shapes.UnionShape) {
      // @ts-ignore
      domainElement = amf.model.domain.UnionShape();
    } else if (type === ns.aml.vocabularies.shapes.FileShape) {
      // @ts-ignore
      domainElement = amf.model.domain.FileShape();
    } else if (type === ns.aml.vocabularies.shapes.SchemaShape) {
      // @ts-ignore
      domainElement = amf.model.domain.SchemaShape();
    } else if (type === ns.aml.vocabularies.shapes.ArrayShape) {
      // @ts-ignore
      domainElement = amf.model.domain.ArrayShape();
    } else if (type === ns.aml.vocabularies.shapes.MatrixShape) {
      // @ts-ignore
      domainElement = amf.model.domain.MatrixShape();
    } else if (type === ns.aml.vocabularies.shapes.TupleShape) {
      // @ts-ignore
      domainElement = amf.model.domain.TupleShape();
    } else {
      // @ts-ignore
      domainElement = amf.model.domain.AnyShape();
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
    this.graph.withDeclaredElement(domainElement);
    return ApiSerializer.unknownShape(domainElement);
  }

  /**
   * Removes a type for a given domain id.
   * @param {string} id The type domain id.
   * @returns {Promise<boolean>} True when the type has been found and removed.
   */
  async deleteType(id) {
    const dIndex = this.graph.declares.findIndex((item) => item.id === id);
    if (dIndex !== -1) {
      const copy = Array.from(this.graph.declares);
      copy.splice(dIndex, 1);
      this.graph.withDeclares(copy);
      return true;
    }
    const refs = /** @type BaseUnitWithDeclaresModel[] */ (this.graph.references());
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
      case 'additionalItems': shape.withAdditionalItems(value); break;
      default: throw new Error(`Unsupported patch property of TupleShape: ${property}`);
    }
  }

  /**
   * Lists the security definitions for the API.
   * @returns {Promise<ApiSecuritySchemeListItem[]>}
   */
  async listSecurity() {
    const result = /** @type ApiSecuritySchemeListItem[] */ ([]);
    this.graph.declares.forEach((obj) => {
      const types = obj.graph().types();
      if (!types.includes('http://a.ml/vocabularies/security#SecurityScheme')) {
        return;
      }
      const type = /** @type SecurityScheme */ (obj);
      const item = ApiSerializer.securitySchemeListItem(type);
      result.push(item);
    });
    return result;
  }
}
