/** @typedef {import('amf-client-js').model.domain.ParametrizedSecurityScheme} ParametrizedSecurityScheme */
/** @typedef {import('amf-client-js').model.domain.Request} Request */
/** @typedef {import('amf-client-js').model.domain.Response} Response */
/** @typedef {import('amf-client-js').model.domain.Payload} Payload */
/** @typedef {import('amf-client-js').model.domain.SecurityScheme} SecurityScheme */
/** @typedef {import('amf-client-js').model.domain.SecurityRequirement} SecurityRequirement */
/** @typedef {import('amf-client-js').model.domain.TemplatedLink} TemplatedLink */
/** @typedef {import('amf-client-js').model.domain.Example} Example */
/** @typedef {import('amf-client-js').model.domain.Parameter} Parameter */
/** @typedef {import('amf-client-js').model.domain.Operation} Operation */
/** @typedef {import('amf-client-js').model.domain.EndPoint} EndPoint */
/** @typedef {import('amf-client-js').model.domain.Server} Server */
/** @typedef {import('amf-client-js').model.domain.CreativeWork} CreativeWork */
/** @typedef {import('amf-client-js').model.domain.NodeShape} NodeShape */
/** @typedef {import('amf-client-js').model.domain.WebApi} WebApi */
/** @typedef {import('./types').ApiParametrizedSecurityScheme} ApiParametrizedSecurityScheme */
/** @typedef {import('./types').ApiRequest} ApiRequest */
/** @typedef {import('./types').ApiSecurityScheme} ApiSecurityScheme */
/** @typedef {import('./types').ApiSecurityRequirement} ApiSecurityRequirement */
/** @typedef {import('./types').ApiTemplatedLink} ApiTemplatedLink */
/** @typedef {import('./types').ApiResponse} ApiResponse */
/** @typedef {import('./types').ApiPayload} ApiPayload */
/** @typedef {import('./types').ApiExample} ApiExample */
/** @typedef {import('./types').ApiParameter} ApiParameter */
/** @typedef {import('./types').ApiOperation} ApiOperation */
/** @typedef {import('./types').ApiEndPoint} ApiEndPoint */
/** @typedef {import('./types').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('./types').ApiServer} ApiServer */
/** @typedef {import('./types').ApiDocumentation} ApiDocumentation */
/** @typedef {import('./types').ApiNodeShapeListItem} ApiNodeShapeListItem */
/** @typedef {import('./types').ApiSecuritySchemeListItem} ApiSecuritySchemeListItem */
/** @typedef {import('./types').ApiEndPointWithOperationsListItem} ApiEndPointWithOperationsListItem */
/** @typedef {import('./types').ApiOperationListItem} ApiOperationListItem */
/** @typedef {import('./types').SerializedApi} SerializedApi */

export class ApiSerializer {
  /**
   * @param {WebApi} object The ParametrizedSecurityScheme to serialize.
   * @returns {SerializedApi} Serialized ParametrizedSecurityScheme
   */
  static api(object) {
    const { 
      id, name, description, identifier, schemes, endPoints, accepts,
      contentType, version, termsOfService, provider, license, documentations,
      servers, security,
    } = object;
    const result = /** @type SerializedApi */ ({
      id,
      schemes: [],
      accepts: [],
      contentType: [],
      endPoints: [],
      documentations: [],
      servers: [],
      security: [],
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (!description.isNullOrEmpty) {
      result.description = description.value();
    }
    if (!identifier.isNullOrEmpty) {
      result.identifier = identifier.value();
    }
    if (!version.isNullOrEmpty) {
      result.version = version.value();
    }
    if (!termsOfService.isNullOrEmpty) {
      result.termsOfService = termsOfService.value();
    }
    if (Array.isArray(schemes) && schemes.length) {
      result.schemes = schemes.map((i) => i.value());
    }
    if (Array.isArray(accepts) && accepts.length) {
      result.accepts = accepts.map((i) => i.value());
    }
    if (Array.isArray(contentType) && contentType.length) {
      result.contentType = contentType.map((i) => i.value());
    }
    if (Array.isArray(endPoints) && endPoints.length) {
      result.endPoints = endPoints.map((i) => i.id);
    }
    if (Array.isArray(documentations) && documentations.length) {
      result.documentations = documentations.map((i) => i.id);
    }
    if (Array.isArray(servers) && servers.length) {
      result.servers = servers.map((i) => i.id);
    }
    if (Array.isArray(security) && security.length) {
      result.security = security.map((i) => i.id);
    }
    if (provider) {
      result.provider = provider.id;
    }
    if (license) {
      result.license = license.id;
    }
    return result;
  }

  /**
   * @param {ParametrizedSecurityScheme} object The ParametrizedSecurityScheme to serialize.
   * @returns {ApiParametrizedSecurityScheme} Serialized ParametrizedSecurityScheme
   */
  static parametrizedSecurityScheme(object) {
    const { id, name, settings, scheme } = object;
    const result = /** @type ApiParametrizedSecurityScheme */ ({
      id,
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (scheme) {
      result.scheme = scheme.id;
    }
    if (settings) {
      result.settings = settings.id;
    }
    return result;
  }

  /**
   * @param {SecurityScheme} object The ParametrizedSecurityScheme to serialize.
   * @returns {ApiSecurityScheme} Serialized ParametrizedSecurityScheme
   */
  static securityScheme(object) {
    const { id, headers, queryParameters, responses, name, type, displayName, description, settings, queryString } = object;
    const result = /** @type ApiSecurityScheme */ ({
      id,
      headers: [],
      queryParameters: [],
      responses: [],
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (!type.isNullOrEmpty) {
      result.type = type.value();
    }
    if (!displayName.isNullOrEmpty) {
      result.displayName = displayName.value();
    }
    if (!description.isNullOrEmpty) {
      result.description = description.value();
    }
    if (settings) {
      result.settings = settings.id;
    }
    if (queryString) {
      result.queryString = queryString.id;
    }
    if (Array.isArray(headers) && headers.length) {
      result.headers = headers.map((p) => p.id);
    }
    if (Array.isArray(queryParameters) && queryParameters.length) {
      result.queryParameters = queryParameters.map((p) => p.id);
    }
    if (Array.isArray(responses) && responses.length) {
      result.responses = responses.map((p) => p.id);
    }
    return result;
  }

  /**
   * @param {SecurityRequirement} object The SecurityRequirement to serialize.
   * @returns {ApiSecurityRequirement} Serialized SecurityRequirement
   */
  static securityRequirement(object) {
    const { id, name, schemes } = object;
    const result = /** @type ApiSecurityRequirement */ ({
      id,
      schemes: [],
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (Array.isArray(schemes) && schemes.length) {
      result.schemes = schemes.map((p) => p.id);
    }
    return result;
  }

  /**
   * @param {SecurityScheme} object The SecurityScheme to serialize as a list item.
   * @returns {ApiSecuritySchemeListItem} Serialized SecurityScheme
   */
  static securitySchemeListItem(object) {
    const { id, name, type, displayName } = object;
    const result = /** @type ApiSecuritySchemeListItem */ ({
      id,
      type: type.value(),
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (!displayName.isNullOrEmpty) {
      result.displayName = displayName.value();
    }
    return result;
  }


  /**
   * @param {Request} object The ParametrizedSecurityScheme to serialize.
   * @returns {ApiRequest} Serialized ParametrizedSecurityScheme
   */
  static request(object) {
    const { id, required, description, queryString, headers, queryParameters, payloads, uriParameters, cookieParameters } = object;
    const result = /** @type ApiRequest */ ({
      id,
      required: required.value(),
      headers: [],
      queryParameters: [],
      payloads: [],
      uriParameters: [],
      cookieParameters: [],
    });
    if (!description.isNullOrEmpty) {
      result.description = description.value();
    }
    if (queryString) {
      result.queryString = queryString.id;
    }
    if (Array.isArray(headers) && headers.length) {
      result.headers = headers.map((p) => p.id);
    }
    if (Array.isArray(queryParameters) && queryParameters.length) {
      result.queryParameters = queryParameters.map((p) => p.id);
    }
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map((p) => p.id);
    }
    if (Array.isArray(uriParameters) && uriParameters.length) {
      result.uriParameters = uriParameters.map((p) => p.id);
    }
    if (Array.isArray(cookieParameters) && cookieParameters.length) {
      result.cookieParameters = cookieParameters.map((p) => p.id);
    }
    return result;
  }

  /**
   * @param {TemplatedLink} object The TemplatedLink to serialize.
   * @returns {ApiTemplatedLink} Serialized TemplatedLink
   */
  static templatedLink(object) {
    const { id, name, description, template, operationId, requestBody, server, mapping } = object;
    const result = /** @type ApiTemplatedLink */ ({
      id,
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (!description.isNullOrEmpty) {
      result.description = description.value();
    }
    if (!template.isNullOrEmpty) {
      result.template = template.value();
    }
    if (!operationId.isNullOrEmpty) {
      result.operationId = operationId.value();
    }
    if (!requestBody.isNullOrEmpty) {
      result.requestBody = requestBody.value();
    }
    if (server) {
      result.server = server.id;
    }
    if (mapping) {
      result.mapping = mapping.id;
    }
    return result;
  }

  /**
   * @param {Response} object The Response to serialize.
   * @returns {ApiResponse} Serialized Response
   */
  static response(object) {
    const { id, headers, payloads, examples, links, name, description, statusCode } = object;
    const result = /** @type ApiResponse */ ({
      id,
      headers: [],
      payloads: [],
      examples: [],
      links: [],
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (!description.isNullOrEmpty) {
      result.description = description.value();
    }
    if (!statusCode.isNullOrEmpty) {
      result.statusCode = statusCode.value();
    }
    if (Array.isArray(headers) && headers.length) {
      result.headers = headers.map((p) => p.id);
    }
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map((p) => p.id);
    }
    if (Array.isArray(examples) && examples.length) {
      result.examples = examples.map((p) => p.id);
    }
    if (Array.isArray(links) && links.length) {
      result.links = links.map((p) => p.id);
    }
    return result;
  }

  /**
   * @param {Payload} object The Payload to serialize.
   * @returns {ApiPayload} Serialized Payload
   */
  static payload(object) {
    const { id, name, examples, encoding, mediaType, schema } = object;
    const result = /** @type ApiPayload */ ({
      id,
      examples: [],
      encoding: [],
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (!mediaType.isNullOrEmpty) {
      result.mediaType = mediaType.value();
    }
    if (schema) {
      result.mediaType = schema.id;
    }
    if (Array.isArray(examples) && examples.length) {
      result.examples = examples.map((p) => p.id);
    }
    if (Array.isArray(encoding) && encoding.length) {
      result.encoding = encoding.map((p) => p.id);
    }
    return result;
  }

  /**
   * @param {Example} object The Example to serialize.
   * @returns {ApiExample} Serialized Example
   */
  static example(object) {
    const { id, strict, name, displayName, description, value, mediaType } = object;
    const result = /** @type ApiExample */ ({
      id,
      strict: strict.value(),
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (!displayName.isNullOrEmpty) {
      result.displayName = displayName.value();
    }
    if (!description.isNullOrEmpty) {
      result.description = description.value();
    }
    if (!value.isNullOrEmpty) {
      result.value = value.value();
    }
    if (!mediaType.isNullOrEmpty) {
      result.mediaType = mediaType.value();
    }
    return result;
  }
  
  /**
   * @param {Parameter} object The Parameter to serialize.
   * @returns {ApiParameter} Serialized Parameter
   */
  static parameter(object) {
    const { id, description, required, allowEmptyValue, deprecated, explode, allowReserved, style, binding, schema, payloads, examples } = object;
    const result = /** @type ApiParameter */ ({
      id,
      payloads: [],
      examples: [],
    });
    if (!description.isNullOrEmpty) {
      result.description = description.value();
    }
    if (!required.isNull) {
      result.required = required.value();
    }
    if (!allowEmptyValue.isNull) {
      result.allowEmptyValue = allowEmptyValue.value();
    }
    if (!deprecated.isNull) {
      result.deprecated = deprecated.value();
    }
    if (!explode.isNull) {
      result.explode = explode.value();
    }
    if (!allowReserved.isNull) {
      result.allowReserved = allowReserved.value();
    }
    if (!style.isNullOrEmpty) {
      result.style = style.value();
    }
    if (!binding.isNullOrEmpty) {
      result.binding = binding.value();
    }
    if (schema) {
      result.schema = schema.id;
    }
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map((p) => p.id);
    }
    if (Array.isArray(examples) && examples.length) {
      result.examples = examples.map((e) => e.id);
    }
    return result;
  }
  
  /**
   * @param {Operation} object The Operation to serialize.
   * @returns {ApiOperation} Serialized Operation
   */
  static operation(object) {
    const { 
      id, method, deprecated, callbacks, responses, servers, security, customDomainProperties,
      name, description, summary, request, documentation, accepts, schemes, contentType,
    } = object;
    const result = /** @type ApiOperation */ ({
      id,
      method: method.value(),
      deprecated: deprecated.value(),
      callbacks: [],
      responses: [],
      servers: [],
      security: [],
      customDomainProperties: [],
      accepts: [],
      schemes: [],
      contentType: [],
    });
    if (!description.isNullOrEmpty) {
      result.description = description.value();
    }
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (!summary.isNullOrEmpty) {
      result.summary = summary.value();
    }
    // @ts-ignore
    if (!object.operationId.isNullOrEmpty) {
      // @ts-ignore
      result.operationId = object.operationId.value();
    }
    if (request) {
      result.request = request.id;
    }
    if (documentation) {
      result.documentation = documentation.id;
    }
    if (Array.isArray(responses)) {
      result.responses = responses.map((r) => r.id);
    }
    if (Array.isArray(callbacks)) {
      result.callbacks = callbacks.map((c) => c.id);
    }
    if (Array.isArray(servers)) {
      result.servers = servers.map((s) => s.id);
    }
    if (Array.isArray(security)) {
      result.security = security.map((s) => s.id);
    }
    if (Array.isArray(accepts)) {
      result.accepts = accepts.map((c) => c.value());
    }
    if (Array.isArray(schemes)) {
      result.schemes = schemes.map((c) => c.value());
    }
    if (Array.isArray(contentType)) {
      result.contentType = contentType.map((c) => c.value());
    }
    if (Array.isArray(customDomainProperties)) {
      result.customDomainProperties = customDomainProperties.map((c) => c.id);
    }
    return result;
  }
  
  /**
   * @param {EndPoint} object The EndPoint to serialize.
   * @returns {ApiEndPoint} Serialized EndPoint
   */
  static endPoint(object) {
    const { 
      id, path, relativePath, description, name, summary, operations, parameters,
      payloads, servers, security,
    } = object;
    const result = /** @type ApiEndPoint */ ({
      id,
      path: path.value(),
      relativePath,
      operations: [],
      parameters: [],
      payloads: [],
      servers: [],
      security: [],
    });
    if (!description.isNullOrEmpty) {
      result.description = description.value();
    }
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (!summary.isNullOrEmpty) {
      result.summary = summary.value();
    }
    if (Array.isArray(operations) && operations.length) {
      result.operations = operations.map((i) => i.id);
    }
    if (Array.isArray(parameters) && parameters.length) {
      result.parameters = parameters.map((i) => i.id);
    }
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map((i) => i.id);
    }
    if (Array.isArray(servers) && servers.length) {
      result.servers = servers.map((i) => i.id);
    }
    if (Array.isArray(security) && security.length) {
      result.security = security.map((i) => i.id);
    }
    return result;
  }
  
  /**
   * @param {EndPoint} object The EndPoint to serialize as a list item.
   * @returns {ApiEndPointListItem} Serialized EndPoint as a list item.
   */
  static endPointListItem(object) {
    const { id, path, name } = object;
    const item = /** @type ApiEndPointListItem */ ({
      id,
      path: path.value(),
    });
    if (!name.isNullOrEmpty) {
      item.name = name.value();
    }
    return item;
  }

  /**
   * @param {EndPoint} object The EndPoint to serialize as a list item.
   * @returns {ApiEndPointWithOperationsListItem} Serialized EndPoint as a list item.
   */
  static endPointWithOperationsListItem(object) {
    const { id, path, name, operations } = object;
    const item = /** @type ApiEndPointWithOperationsListItem */ ({
      id,
      path: path.value(),
      operations: [],
    });
    if (!name.isNullOrEmpty) {
      item.name = name.value();
    }
    if (Array.isArray(operations) && operations.length) {
      item.operations = operations.map((op) => ApiSerializer.operationListItem(op));
    }
    return item;
  }

  /**
   * @param {Operation} object The Operation to serialize as a list item.
   * @returns {ApiOperationListItem} Serialized Operation as a list item.
   */
  static operationListItem(object) {
    const { id, method, name } = object;
    const item = /** @type ApiOperationListItem */ ({
      id,
      method: method.value(),
    });
    if (!name.isNullOrEmpty) {
      item.name = name.value();
    }
    return item;
  }
  
  /**
   * @param {Server} object The Server to serialize.
   * @returns {ApiServer} Serialized Server
   */
  static server(object) {
    const { id, url, description, variables } = object;
    const result = /** @type ApiServer */ ({
      id,
      url: url.value(),
      variables: [],
    });
    if (!description.isNullOrEmpty) {
      result.description = description.value();
    }
    if (Array.isArray(variables) && variables.length) {
      result.variables = variables.map((i) => i.id);
    }
    return result;
  }
  
  /**
   * @param {CreativeWork} object The CreativeWork to serialize.
   * @returns {ApiDocumentation} Serialized CreativeWork
   */
  static documentation(object) {
    const { id, url, description, title } = object;
    const result = /** @type ApiDocumentation */ ({
      id,
    });
    if (!url.isNullOrEmpty) {
      result.url = url.value();
    }
    if (!description.isNullOrEmpty) {
      result.description = description.value();
    }
    if (!title.isNullOrEmpty) {
      result.title = title.value();
    }
    return result;
  }

  /**
   * @param {NodeShape} object The NodeShape to serialize.
   * @returns {ApiNodeShapeListItem} Serialized NodeShape
   */
  static nodeShapeListItem(object) {
    const { id, name, displayName } = object;
    const result = /** @type ApiNodeShapeListItem */ ({
      id,
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (!displayName.isNullOrEmpty) {
      result.displayName = displayName.value();
    }
    return result;
  }
}
