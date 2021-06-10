/* eslint-disable class-methods-use-this */
import { ns } from './Namespace.js';

/** @typedef {import('amf-client-js').model.domain.ParametrizedSecurityScheme} ParametrizedSecurityScheme */
/** @typedef {import('amf-client-js').model.domain.Request} Request */
/** @typedef {import('amf-client-js').model.domain.Response} Response */
/** @typedef {import('amf-client-js').model.domain.Payload} Payload */
/** @typedef {import('amf-client-js').model.domain.SecurityScheme} SecurityScheme */
/** @typedef {import('amf-client-js').model.domain.SecurityRequirement} SecurityRequirement */
/** @typedef {import('amf-client-js').model.domain.Settings} Settings */
/** @typedef {import('amf-client-js').model.domain.OAuth1Settings} OAuth1Settings */
/** @typedef {import('amf-client-js').model.domain.OAuth2Settings} OAuth2Settings */
/** @typedef {import('amf-client-js').model.domain.OAuth2Flow} OAuth2Flow */
/** @typedef {import('amf-client-js').model.domain.HttpSettings} HttpSettings */
/** @typedef {import('amf-client-js').model.domain.ApiKeySettings} ApiKeySettings */
/** @typedef {import('amf-client-js').model.domain.OpenIdConnectSettings} OpenIdConnectSettings */
/** @typedef {import('amf-client-js').model.domain.TemplatedLink} TemplatedLink */
/** @typedef {import('amf-client-js').model.domain.Example} Example */
/** @typedef {import('amf-client-js').model.domain.Parameter} Parameter */
/** @typedef {import('amf-client-js').model.domain.Operation} Operation */
/** @typedef {import('amf-client-js').model.domain.EndPoint} EndPoint */
/** @typedef {import('amf-client-js').model.domain.Server} Server */
/** @typedef {import('amf-client-js').model.domain.CreativeWork} CreativeWork */
/** @typedef {import('amf-client-js').model.domain.NodeShape} NodeShape */
/** @typedef {import('amf-client-js').model.domain.WebApi} WebApi */
/** @typedef {import('amf-client-js').model.domain.PropertyShape} PropertyShape */
/** @typedef {import('amf-client-js').model.domain.Shape} Shape */
/** @typedef {import('amf-client-js').model.domain.AnyShape} AnyShape */
/** @typedef {import('amf-client-js').model.domain.ScalarShape} ScalarShape */
/** @typedef {import('amf-client-js').model.domain.UnionShape} UnionShape */
/** @typedef {import('amf-client-js').model.domain.FileShape} FileShape */
/** @typedef {import('amf-client-js').model.domain.SchemaShape} SchemaShape */
/** @typedef {import('amf-client-js').model.domain.DataArrangeShape} DataArrangeShape */
/** @typedef {import('amf-client-js').model.domain.ArrayShape} ArrayShape */
/** @typedef {import('amf-client-js').model.domain.TupleShape} TupleShape */
/** @typedef {import('amf-client-js').model.domain.DataNode} DataNode */
/** @typedef {import('amf-client-js').model.domain.ScalarNode} ScalarNode */
/** @typedef {import('amf-client-js').model.domain.ObjectNode} ObjectNode */
/** @typedef {import('amf-client-js').model.domain.ArrayNode} ArrayNode */
/** @typedef {import('amf-client-js').model.domain.XMLSerializer} XMLSerializer */
/** @typedef {import('amf-client-js').model.domain.Scope} Scope */
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
/** @typedef {import('./types').ApiShape} ApiShape */
/** @typedef {import('./types').ApiPropertyShape} ApiPropertyShape */
/** @typedef {import('./types').ApiAnyShape} ApiAnyShape */
/** @typedef {import('./types').ApiNodeShape} ApiNodeShape */
/** @typedef {import('./types').ApiScalarShape} ApiScalarShape */
/** @typedef {import('./types').ApiUnionShape} ApiUnionShape */
/** @typedef {import('./types').ApiFileShape} ApiFileShape */
/** @typedef {import('./types').ApiDataArrangeShape} ApiDataArrangeShape */
/** @typedef {import('./types').ApiXMLSerializer} ApiXMLSerializer */
/** @typedef {import('./types').ApiDataNode} ApiDataNode */
/** @typedef {import('./types').ApiScalarNode} ApiScalarNode */
/** @typedef {import('./types').ApiObjectNode} ApiObjectNode */
/** @typedef {import('./types').ApiArrayNode} ApiArrayNode */
/** @typedef {import('./types').ApiSchemaShape} ApiSchemaShape */
/** @typedef {import('./types').ApiArrayShape} ApiArrayShape */
/** @typedef {import('./types').ApiTupleShape} ApiTupleShape */
/** @typedef {import('./types').ApiShapeUnion} ApiShapeUnion */
/** @typedef {import('./types').ApiSecuritySettings} ApiSecuritySettings */
/** @typedef {import('./types').ApiSecurityOAuth1Settings} ApiSecurityOAuth1Settings */
/** @typedef {import('./types').ApiSecurityOAuth2Settings} ApiSecurityOAuth2Settings */
/** @typedef {import('./types').ApiSecurityApiKeySettings} ApiSecurityApiKeySettings */
/** @typedef {import('./types').ApiSecurityHttpSettings} ApiSecurityHttpSettings */
/** @typedef {import('./types').ApiSecurityOpenIdConnectSettings} ApiSecurityOpenIdConnectSettings */
/** @typedef {import('./types').ApiSecurityOAuth2Flow} ApiSecurityOAuth2Flow */
/** @typedef {import('./types').ApiSecuritySettingsUnion} ApiSecuritySettingsUnion */
/** @typedef {import('./types').ApiSecurityScope} ApiSecurityScope */

export class ApiSerializer {
  /**
   * @param {WebApi} object The web API to serialize.
   * @returns {SerializedApi} Serialized web API
   */
  static api(object) {
    const { 
      id, name, description, identifier, schemes, endPoints, accepts,
      contentType, version, termsOfService, provider, license, documentations,
      servers, security,
    } = object;
    const types = object.graph().types();
    const isAsyncApi = types.includes('http://a.ml/vocabularies/apiContract#AsyncAPI');
    const isWebApi = !isAsyncApi && types.includes('http://a.ml/vocabularies/apiContract#WebAPI');
    const result = /** @type SerializedApi */ ({
      id,
      types,
      isAsyncApi,
      isWebApi,
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
    const types = object.graph().types();
    const result = /** @type ApiParametrizedSecurityScheme */ ({
      id,
      types,
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (scheme) {
      result.scheme = ApiSerializer.securityScheme(scheme);
    }
    if (settings) {
      result.settings = ApiSerializer.securitySettings(settings);
    }
    return result;
  }

  /**
   * @param {SecurityScheme} object The SecurityScheme to serialize.
   * @returns {ApiSecurityScheme} Serialized SecurityScheme
   */
  static securityScheme(object) {
    const { id, headers, queryParameters, responses, name, type, displayName, description, settings, queryString } = object;
    const types = object.graph().types();
    const result = /** @type ApiSecurityScheme */ ({
      id,
      types,
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
      result.settings = ApiSerializer.securitySettings(settings);
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
    const types = object.graph().types();
    const result = /** @type ApiSecurityRequirement */ ({
      id,
      types,
      schemes: [],
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (Array.isArray(schemes) && schemes.length) {
      result.schemes = schemes.map((p) => ApiSerializer.parametrizedSecurityScheme(p));
    }
    return result;
  }

  /**
   * @param {SecurityScheme} object The SecurityScheme to serialize as a list item.
   * @returns {ApiSecuritySchemeListItem} Serialized SecurityScheme
   */
  static securitySchemeListItem(object) {
    const { id, name, type, displayName } = object;
    const types = object.graph().types();
    const result = /** @type ApiSecuritySchemeListItem */ ({
      id,
      types,
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
   * @param {Settings} object 
   * @returns {ApiSecuritySettingsUnion}
   */
  static securitySettings(object) {
    const types = object.graph().types();
    if (types.includes(ns.aml.vocabularies.security.OAuth1Settings)) {
      return ApiSerializer.oAuth1Settings(/** @type OAuth1Settings */ (object));
    }
    if (types.includes(ns.aml.vocabularies.security.OAuth2Settings)) {
      return ApiSerializer.oAuth2Settings(/** @type OAuth2Settings */ (object));
    }
    if (types.includes(ns.aml.vocabularies.security.ApiKeySettings)) {
      return ApiSerializer.apiKeySettings(/** @type ApiKeySettings */ (object));
    }
    if (types.includes(ns.aml.vocabularies.security.HttpSettings)) {
      return ApiSerializer.httpSettings(/** @type HttpSettings */ (object));
    }
    if (types.includes(ns.aml.vocabularies.security.OpenIdConnectSettings)) {
      return ApiSerializer.openIdConnectSettings(/** @type OpenIdConnectSettings */ (object));
    }
    return ApiSerializer.settings(object);
  }

  /**
   * @param {Settings} object
   * @returns {ApiSecuritySettings}
   */
  static settings(object) {
    const { id, additionalProperties } = object;
    const types = object.graph().types();
    const result = /** @type ApiSecuritySettings */ ({
      id,
      types,
    });
    if (additionalProperties && additionalProperties.id) {
      result.additionalProperties = ApiSerializer.unknownDataNode(additionalProperties);
    }
    return result;
  }

  /**
   * @param {OAuth1Settings} object 
   * @returns {ApiSecurityOAuth1Settings}
   */
  static oAuth1Settings(object) {
    const { id, authorizationUri, requestTokenUri, tokenCredentialsUri, signatures, } = object;
    const types = object.graph().types();
    const result = /** @type ApiSecurityOAuth1Settings */ ({
      id,
      types,
      signatures: [],
    });
    if (!authorizationUri.isNullOrEmpty) {
      result.authorizationUri = authorizationUri.value();
    }
    if (!requestTokenUri.isNullOrEmpty) {
      result.requestTokenUri = requestTokenUri.value();
    }
    if (!tokenCredentialsUri.isNullOrEmpty) {
      result.tokenCredentialsUri = tokenCredentialsUri.value();
    }
    if (Array.isArray(signatures) && signatures.length) {
      result.signatures = signatures.map((p) => p.value());
    }
    return result;
  }

  /**
   * @param {OAuth2Settings} object 
   * @returns {ApiSecurityOAuth2Settings}
   */
  static oAuth2Settings(object) {
    const { id, authorizationGrants, flows, } = object;
    const types = object.graph().types();
    const result = /** @type ApiSecurityOAuth2Settings */ ({
      id,
      types,
      flows: [],
      authorizationGrants: [],
    });
    if (Array.isArray(authorizationGrants) && authorizationGrants.length) {
      result.authorizationGrants = authorizationGrants.map((p) => p.value());
    }
    if (Array.isArray(flows) && flows.length) {
      result.flows = flows.map((p) => ApiSerializer.oAuth2Flow(p));
    }
    return result;
  }

  /**
   * @param {OAuth2Flow} object 
   * @returns {ApiSecurityOAuth2Flow}
   */
  static oAuth2Flow(object) {
    const { id, authorizationUri, accessTokenUri, flow, refreshUri, scopes } = object;
    const types = object.graph().types();
    const result = /** @type ApiSecurityOAuth2Flow */ ({
      id,
      types,
      scopes: [],
    });
    if (!authorizationUri.isNullOrEmpty) {
      result.authorizationUri = authorizationUri.value();
    }
    if (!accessTokenUri.isNullOrEmpty) {
      result.accessTokenUri = accessTokenUri.value();
    }
    if (!flow.isNullOrEmpty) {
      result.flow = flow.value();
    }
    if (!refreshUri.isNullOrEmpty) {
      result.refreshUri = refreshUri.value();
    }
    if (Array.isArray(scopes) && scopes.length) {
      result.scopes = scopes.map((p) => ApiSerializer.scope(p));
    }
    return result;
  }

  /**
   * @param {Scope} object 
   * @returns {ApiSecurityScope}
   */
  static scope(object) {
    const { id, name, description } = object;
    const types = object.graph().types();
    const result = /** @type ApiSecurityScope */ ({
      id,
      types,
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (!description.isNullOrEmpty) {
      result.description = description.value();
    }
    return result;
  }

  /**
   * @param {ApiKeySettings} object 
   * @returns {ApiSecurityApiKeySettings}
   */
  static apiKeySettings(object) {
    const { id, name, in: inParam } = object;
    const types = object.graph().types();
    const result = /** @type ApiSecurityApiKeySettings */ ({
      id,
      types,
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (!inParam.isNullOrEmpty) {
      result.in = inParam.value();
    }
    return result;
  }

  /**
   * @param {HttpSettings} object 
   * @returns {ApiSecurityHttpSettings}
   */
  static httpSettings(object) {
    const { id, scheme, bearerFormat } = object;
    const types = object.graph().types();
    const result = /** @type ApiSecurityHttpSettings */ ({
      id,
      types,
    });
    if (!scheme.isNullOrEmpty) {
      result.scheme = scheme.value();
    }
    if (!bearerFormat.isNullOrEmpty) {
      result.bearerFormat = bearerFormat.value();
    }
    return result;
  }

  /**
   * @param {OpenIdConnectSettings} object 
   * @returns {ApiSecurityOpenIdConnectSettings}
   */
  static openIdConnectSettings(object) {
    const { id, url } = object;
    const types = object.graph().types();
    const result = /** @type ApiSecurityOpenIdConnectSettings */ ({
      id,
      types,
    });
    if (!url.isNullOrEmpty) {
      result.url = url.value();
    }
    return result;
  }

  /**
   * @param {Request} object The API request to serialize.
   * @returns {ApiRequest} Serialized API request
   */
  static request(object) {
    const { id, required, description, queryString, headers, queryParameters, payloads, uriParameters, cookieParameters } = object;
    const types = object.graph().types();
    const result = /** @type ApiRequest */ ({
      id,
      types,
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
    const types = object.graph().types();
    const result = /** @type ApiTemplatedLink */ ({
      id,
      types,
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
    const types = object.graph().types();
    const result = /** @type ApiResponse */ ({
      id,
      types,
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
    const types = object.graph().types();
    const result = /** @type ApiPayload */ ({
      id,
      types,
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
      result.schema = schema.id;
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
    const { id, strict, name, displayName, description, value, mediaType, structuredValue } = object;
    const types = object.graph().types();
    const result = /** @type ApiExample */ ({
      id,
      types,
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
    if (structuredValue && structuredValue.id) {
      result.structuredValue = ApiSerializer.unknownDataNode(structuredValue);
    }
    return result;
  }
  
  /**
   * @param {Parameter} object The Parameter to serialize.
   * @returns {ApiParameter} Serialized Parameter
   */
  static parameter(object) {
    const { id, name, description, required, allowEmptyValue, deprecated, explode, allowReserved, style, binding, schema, payloads, examples } = object;
    const types = object.graph().types();
    const result = /** @type ApiParameter */ ({
      id,
      types,
      payloads: [],
      examples: [],
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
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
    const types = object.graph().types();
    const { 
      id, method, deprecated, callbacks, responses, servers, security, customDomainProperties,
      name, description, summary, request, documentation, accepts, schemes, contentType,
    } = object;
    const result = /** @type ApiOperation */ ({
      id,
      types,
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
    const types = object.graph().types();
    const result = /** @type ApiEndPoint */ ({
      id,
      types,
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
    const types = object.graph().types();
    const result = /** @type ApiServer */ ({
      id,
      types,
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
    const types = object.graph().types();
    const result = /** @type ApiDocumentation */ ({
      id,
      types,
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
   * @param {NodeShape} object The NodeShape to serialize as a list item.
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

  /**
   * @param {Shape} object 
   * @returns {ApiShapeUnion}
   */
  static unknownShape(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type Shape */ (object.linkTarget);
    }
    const types = target.graph().types();
    if (types.includes(ns.aml.vocabularies.shapes.ScalarShape)) {
      return ApiSerializer.scalarShape(/** @type ScalarShape */ (target));
    }
    if (types.includes(ns.w3.shacl.NodeShape)) {
      return ApiSerializer.nodeShape(/** @type NodeShape */ (target));
    }
    if (types.includes(ns.aml.vocabularies.shapes.UnionShape)) {
      return ApiSerializer.unionShape(/** @type UnionShape */ (target));
    }
    if (types.includes(ns.aml.vocabularies.shapes.FileShape)) {
      return ApiSerializer.fileShape(/** @type FileShape */ (target));
    }
    if (types.includes(ns.aml.vocabularies.shapes.SchemaShape)) {
      return ApiSerializer.schemaShape(/** @type SchemaShape */ (target));
    }
    if (types.includes(ns.aml.vocabularies.shapes.ArrayShape) || types.includes(ns.aml.vocabularies.shapes.MatrixShape)) {
      return ApiSerializer.arrayShape(/** @type ArrayShape */ (target));
    }
    if (types.includes(ns.aml.vocabularies.shapes.TupleShape)) {
      return ApiSerializer.tupleShape(/** @type TupleShape */ (target));
    }
    return ApiSerializer.anyShape(/** @type AnyShape */ (target));
  }

  /**
   * @param {NodeShape} object The NodeShape to serialize
   * @returns {ApiNodeShape}
   */
  static nodeShape(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type NodeShape */ (object.linkTarget);
    }
    const { 
      closed, minProperties, maxProperties, customShapeProperties,
      customShapePropertyDefinitions, discriminator, discriminatorValue, properties, dependencies,
    } = target;
    
    const result = /** @type ApiNodeShape */ (ApiSerializer.anyShape(target));

    if (!discriminator.isNullOrEmpty) {
      result.discriminator = discriminator.value();
    }
    if (!discriminatorValue.isNullOrEmpty) {
      result.discriminatorValue = discriminatorValue.value();
    }
    if (!closed.isNull) {
      result.closed = closed.value();
    }
    if (!minProperties.isNull) {
      result.minProperties = minProperties.value();
    }
    if (!maxProperties.isNull) {
      result.maxProperties = maxProperties.value();
    }
    if (Array.isArray(customShapeProperties) && customShapeProperties.length) {
      result.customShapeProperties = customShapeProperties.map((item) => item.id);
    } else {
      result.customShapeProperties = [];
    }
    if (Array.isArray(customShapePropertyDefinitions) && customShapePropertyDefinitions.length) {
      result.customShapePropertyDefinitions = customShapePropertyDefinitions.map((item) => item.id);
    } else {
      result.customShapePropertyDefinitions = [];
    }
    if (Array.isArray(properties) && properties.length) {
      result.properties = properties.map((item) => ApiSerializer.propertyShape(item));
    } else {
      result.properties = [];
    }
    if (Array.isArray(dependencies) && dependencies.length) {
      result.dependencies = dependencies.map((item) => item.id);
    } else {
      result.dependencies = [];
    }
    return result;
  }

  /**
   * @param {PropertyShape} object 
   * @returns {ApiPropertyShape}
   */
  static propertyShape(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type PropertyShape */ (object.linkTarget);
    }
    const { path, range, minCount, maxCount, patternName } = target;
    const result = /** @type ApiPropertyShape */ (ApiSerializer.shape(target));
    if (!path.isNullOrEmpty) {
      result.path = path.value();
    }
    if (!patternName.isNullOrEmpty) {
      result.patternName = patternName.value();
    }
    if (!minCount.isNull) {
      result.minCount = minCount.value();
    }
    if (!maxCount.isNull) {
      result.maxCount = maxCount.value();
    }
    if (range && range.id) {
      result.range = ApiSerializer.unknownShape(range);
    }
    return result;
  }

  /**
   * @param {Shape} object 
   * @returns {ApiShape}
   */
  static shape(object) {
    const { 
      id, name, displayName, defaultValue, defaultValueStr, deprecated, description,
      values, inherits, or, and, xone, not, readOnly, writeOnly,
    } = object;
    const types = object.graph().types();
    const result = /** @type ApiShape */ ({
      id,
      types,
      values: [],
      inherits: [],
      or: [],
      and: [],
      xone: [],
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
    if (!defaultValueStr.isNullOrEmpty) {
      result.defaultValueStr = defaultValueStr.value();
    }
    if (!deprecated.isNull) {
      result.deprecated = deprecated.value();
    }
    if (!readOnly.isNull) {
      result.readOnly = readOnly.value();
    }
    if (!writeOnly.isNull) {
      result.writeOnly = writeOnly.value();
    }
    if (defaultValue && defaultValue.id) {
      result.defaultValue = defaultValue.id;
    }
    if (Array.isArray(inherits) && inherits.length) {
      result.inherits = inherits.map((item) => ApiSerializer.unknownShape(item));
    }
    if (Array.isArray(or) && or.length) {
      result.or = or.map((item) => ApiSerializer.unknownShape(item));
    }
    if (Array.isArray(and) && and.length) {
      result.and = and.map((item) => ApiSerializer.unknownShape(item));
    }
    if (Array.isArray(xone) && xone.length) {
      result.xone = xone.map((item) => ApiSerializer.unknownShape(item));
    }
    if (Array.isArray(values) && values.length) {
      result.values = values.map((item) => ApiSerializer.unknownDataNode(item));
    }
    if (not && not.id) {
      result.not = ApiSerializer.unknownShape(not);
    }
    return result;
  }

  /**
   * @param {AnyShape} object
   * @returns {ApiAnyShape}
   */
  static anyShape(object) {
    const { documentation, xmlSerialization, examples } = object;
    const result = /** @type ApiAnyShape */ (ApiSerializer.shape(object));
    if (Array.isArray(examples) && examples.length) {
      result.examples = examples.map((item) => ApiSerializer.example(item));
    } else {
      result.examples = [];
    }
    if (documentation && documentation.id) {
      result.documentation = ApiSerializer.documentation(documentation);
    }
    if (xmlSerialization && xmlSerialization.id) {
      result.xmlSerialization = ApiSerializer.xmlSerializer(xmlSerialization);
    }
    return result;
  }

  /**
   * @param {XMLSerializer} object
   * @returns {ApiXMLSerializer}
   */
  static xmlSerializer(object) {
    const { id, attribute, wrapped, name, namespace, prefix } = object;
    const types = object.graph().types();
    const result = /** @type ApiXMLSerializer */ ({
      id,
      types,
    });
    if (!attribute.isNull) {
      result.attribute = attribute.value();
    }
    if (!wrapped.isNull) {
      result.wrapped = wrapped.value();
    }
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    if (!namespace.isNullOrEmpty) {
      result.namespace = namespace.value();
    }
    if (!prefix.isNullOrEmpty) {
      result.prefix = prefix.value();
    }
    return result;
  }

  /**
   * @param {ScalarShape} object
   * @returns {ApiScalarShape}
   */
  static scalarShape(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type ScalarShape */ (object.linkTarget);
    }
    const { dataType, pattern, minLength, maxLength, minimum, maximum, exclusiveMaximum, exclusiveMinimum, format, multipleOf } = target;
    const result = /** @type ApiScalarShape */ (ApiSerializer.anyShape(target));
    if (!pattern.isNullOrEmpty) {
      result.pattern = pattern.value();
    }
    if (!dataType.isNullOrEmpty) {
      result.dataType = dataType.value();
    }
    if (!minLength.isNull) {
      result.minLength = minLength.value();
    }
    if (!maxLength.isNull) {
      result.maxLength = maxLength.value();
    }
    if (!minimum.isNull) {
      result.minimum = minimum.value();
    }
    if (!maximum.isNull) {
      result.maximum = maximum.value();
    }
    if (!exclusiveMaximum.isNull) {
      result.exclusiveMaximum = exclusiveMaximum.value();
    }
    if (!exclusiveMinimum.isNull) {
      result.exclusiveMinimum = exclusiveMinimum.value();
    }
    if (!format.isNullOrEmpty) {
      result.format = format.value();
    }
    if (!multipleOf.isNull) {
      result.multipleOf = multipleOf.value();
    }
    return result;
  }

  /**
   * @param {UnionShape} object
   * @returns {ApiUnionShape}
   */
  static unionShape(object) {
    const { anyOf } = object;
    const result = /** @type ApiUnionShape */ (ApiSerializer.anyShape(object));
    if (Array.isArray(anyOf) && anyOf.length) {
      result.anyOf = anyOf.map((shape) => ApiSerializer.unknownShape(shape));
    } else {
      result.anyOf = [];
    }
    return result;
  }

  /**
   * @param {FileShape} object
   * @returns {ApiFileShape}
   */
  static fileShape(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type FileShape */ (object.linkTarget);
    }
    const result = /** @type ApiFileShape */ (ApiSerializer.anyShape(target));
    const { fileTypes, pattern, minLength, maxLength, minimum, maximum, exclusiveMinimum, exclusiveMaximum, format, multipleOf } = target;
    if (!pattern.isNullOrEmpty) {
      result.pattern = pattern.value();
    }
    if (Array.isArray(fileTypes) && fileTypes.length) {
      result.fileTypes = fileTypes.map((item) => item.value());
    }
    if (!minLength.isNull) {
      result.minLength = minLength.value();
    }
    if (!maxLength.isNull) {
      result.maxLength = maxLength.value();
    }
    if (!minimum.isNull) {
      result.minimum = minimum.value();
    }
    if (!maximum.isNull) {
      result.maximum = maximum.value();
    }
    if (!exclusiveMaximum.isNull) {
      result.exclusiveMaximum = exclusiveMaximum.value();
    }
    if (!exclusiveMinimum.isNull) {
      result.exclusiveMinimum = exclusiveMinimum.value();
    }
    if (!format.isNullOrEmpty) {
      result.format = format.value();
    }
    if (!multipleOf.isNull) {
      result.multipleOf = multipleOf.value();
    }
    return result;
  }

  /**
   * @param {SchemaShape} object
   * @returns {ApiSchemaShape}
   */
  static schemaShape(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type SchemaShape */ (object.linkTarget);
    }
    const result = /** @type ApiSchemaShape */ (ApiSerializer.anyShape(target));
    const { mediaType, raw } = target;
    if (!mediaType.isNullOrEmpty) {
      result.mediaType = mediaType.value();
    }
    if (!raw.isNullOrEmpty) {
      result.raw = raw.value();
    }
    return result;
  }

  /**
   * @param {DataArrangeShape} object
   * @returns {ApiDataArrangeShape}
   */
  static dataArrangeShape(object) {
    const result = /** @type ApiDataArrangeShape */ (ApiSerializer.anyShape(object));
    const { minItems, maxItems, uniqueItems } = object;
    if (!minItems.isNull) {
      result.minItems = minItems.value();
    }
    if (!maxItems.isNull) {
      result.maxItems = maxItems.value();
    }
    if (!uniqueItems.isNull) {
      result.uniqueItems = uniqueItems.value();
    }
    return result;
  }

  /**
   * @param {ArrayShape} object
   * @returns {ApiArrayShape}
   */
  static arrayShape(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type ArrayShape */ (object.linkTarget);
    }
    const result = /** @type ApiArrayShape */ (ApiSerializer.dataArrangeShape(target));
    const { items } = target;
    if (items && items.id) {
      result.items = ApiSerializer.unknownShape(items);
    }
    return result;
  }

  /**
   * @param {TupleShape} object
   * @returns {ApiTupleShape}
   */
  static tupleShape(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type TupleShape */ (object.linkTarget);
    }
    const result = /** @type ApiTupleShape */ (ApiSerializer.dataArrangeShape(target));
    const { items, additionalItems } = target;
    if (!additionalItems.isNull) {
      result.additionalItems = additionalItems.value();
    }
    if (Array.isArray(items) && items.length) {
      result.items = items.map((shape) => ApiSerializer.unknownShape(shape));
    } else {
      result.items = [];
    }
    return result;
  }

  /**
   * @param {DataNode} object
   * @returns {ApiScalarNode|ApiObjectNode|ApiArrayNode|undefined}
   */
  static unknownDataNode(object) {
    const types = object.graph().types();
    if (types.includes(ns.aml.vocabularies.data.Scalar)) {
      return ApiSerializer.scalarNode(/** @type ScalarNode */(object));
    }
    if (types.includes(ns.aml.vocabularies.data.Object)) {
      return ApiSerializer.objectNode(/** @type ObjectNode */(object));
    }
    if (types.includes(ns.aml.vocabularies.data.Array)) {
      return ApiSerializer.arrayNode(/** @type ArrayNode */(object));
    }
    return undefined;
  }

  /**
   * @param {DataNode} object
   * @returns {ApiDataNode}
   */
  static dataNode(object) {
    const types = object.graph().types();
    const { id, name, } = object;
    const result = ({
      id,
      types,
    });
    if (!name.isNullOrEmpty) {
      result.name = name.value();
    }
    return result;
  }

  /**
   * @param {ScalarNode} object
   * @returns {ApiScalarNode}
   */
  static scalarNode(object) {
    const result = /** @type ApiScalarNode */ (this.dataNode(object));
    const { value, dataType } = object;
    if (!value.isNullOrEmpty) {
      result.value = value.value();
    }
    if (!dataType.isNullOrEmpty) {
      result.dataType = dataType.value();
    }
    return result;
  }

  /**
   * @param {ObjectNode} object
   * @returns {ApiObjectNode}
   */
  static objectNode(object) {
    const result = /** @type ApiObjectNode */ (this.dataNode(object));
    result.properties = {};
    const { properties } = object;
    Object.keys(properties).forEach((key) => {
      result.properties[key] = ApiSerializer.unknownDataNode(properties[key]);
    });
    return result;
  }

  /**
   * @param {ArrayNode} object
   * @returns {ApiArrayNode}
   */
  static arrayNode(object) {
    const result = /** @type ApiArrayNode */ (this.dataNode(object));
    result.members = [];
    const { members } = object;
    if (Array.isArray(members) && members.length) {
      result.members = members.map((item) => ApiSerializer.unknownDataNode(item));
    }
    return result;
  }
}
