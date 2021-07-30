/* eslint-disable class-methods-use-this */
import { ns } from './Namespace.js';

/** @typedef {import('amf-client-js').ParametrizedSecurityScheme} ParametrizedSecurityScheme */
/** @typedef {import('amf-client-js').Request} Request */
/** @typedef {import('amf-client-js').Response} Response */
/** @typedef {import('amf-client-js').Payload} Payload */
/** @typedef {import('amf-client-js').SecurityScheme} SecurityScheme */
/** @typedef {import('amf-client-js').SecurityRequirement} SecurityRequirement */
/** @typedef {import('amf-client-js').Settings} Settings */
/** @typedef {import('amf-client-js').OAuth1Settings} OAuth1Settings */
/** @typedef {import('amf-client-js').OAuth2Settings} OAuth2Settings */
/** @typedef {import('amf-client-js').OAuth2Flow} OAuth2Flow */
/** @typedef {import('amf-client-js').HttpSettings} HttpSettings */
/** @typedef {import('amf-client-js').ApiKeySettings} ApiKeySettings */
/** @typedef {import('amf-client-js').OpenIdConnectSettings} OpenIdConnectSettings */
/** @typedef {import('amf-client-js').TemplatedLink} TemplatedLink */
/** @typedef {import('amf-client-js').Example} Example */
/** @typedef {import('amf-client-js').Parameter} Parameter */
/** @typedef {import('amf-client-js').Operation} Operation */
/** @typedef {import('amf-client-js').EndPoint} EndPoint */
/** @typedef {import('amf-client-js').Server} Server */
/** @typedef {import('amf-client-js').CreativeWork} CreativeWork */
/** @typedef {import('amf-client-js').NodeShape} NodeShape */
/** @typedef {import('amf-client-js').WebApi} WebApi */
/** @typedef {import('amf-client-js').PropertyShape} PropertyShape */
/** @typedef {import('amf-client-js').Shape} Shape */
/** @typedef {import('amf-client-js').AnyShape} AnyShape */
/** @typedef {import('amf-client-js').ScalarShape} ScalarShape */
/** @typedef {import('amf-client-js').UnionShape} UnionShape */
/** @typedef {import('amf-client-js').FileShape} FileShape */
/** @typedef {import('amf-client-js').SchemaShape} SchemaShape */
/** @typedef {import('amf-client-js').DataArrangeShape} DataArrangeShape */
/** @typedef {import('amf-client-js').ArrayShape} ArrayShape */
/** @typedef {import('amf-client-js').TupleShape} TupleShape */
/** @typedef {import('amf-client-js').DataNode} DataNode */
/** @typedef {import('amf-client-js').ScalarNode} ScalarNode */
/** @typedef {import('amf-client-js').ObjectNode} ObjectNode */
/** @typedef {import('amf-client-js').ArrayNode} ArrayNode */
/** @typedef {import('amf-client-js').XMLSerializer} XMLSerializer */
/** @typedef {import('amf-client-js').Scope} Scope */
/** @typedef {import('amf-client-js').CustomDomainProperty} CustomDomainProperty */
/** @typedef {import('amf-client-js').DomainExtension} DomainExtension */
/** @typedef {import('amf-client-js').Encoding} Encoding */
/** @typedef {import('amf-client-js').IriTemplateMapping} IriTemplateMapping */
/** @typedef {import('amf-client-js').Callback} Callback */
/** @typedef {import('amf-client-js').DomainElement} DomainElement */
/** @typedef {import('./types').ApiParametrizedSecurityScheme} ApiParametrizedSecurityScheme */
/** @typedef {import('./types').ApiParametrizedSecuritySchemeBase} ApiParametrizedSecuritySchemeBase */
/** @typedef {import('./types').ApiParametrizedSecuritySchemeRecursive} ApiParametrizedSecuritySchemeRecursive */
/** @typedef {import('./types').ApiRequest} ApiRequest */
/** @typedef {import('./types').ApiRequestBase} ApiRequestBase */
/** @typedef {import('./types').ApiRequestRecursive} ApiRequestRecursive */
/** @typedef {import('./types').ApiSecurityScheme} ApiSecurityScheme */
/** @typedef {import('./types').ApiSecuritySchemeBase} ApiSecuritySchemeBase */
/** @typedef {import('./types').ApiSecuritySchemeRecursive} ApiSecuritySchemeRecursive */
/** @typedef {import('./types').ApiSecurityRequirement} ApiSecurityRequirement */
/** @typedef {import('./types').ApiSecurityRequirementBase} ApiSecurityRequirementBase */
/** @typedef {import('./types').ApiSecurityRequirementRecursive} ApiSecurityRequirementRecursive */
/** @typedef {import('./types').ApiTemplatedLink} ApiTemplatedLink */
/** @typedef {import('./types').ApiTemplatedLinkBase} ApiTemplatedLinkBase */
/** @typedef {import('./types').ApiTemplatedLinkRecursive} ApiTemplatedLinkRecursive */
/** @typedef {import('./types').ApiResponse} ApiResponse */
/** @typedef {import('./types').ApiResponseBase} ApiResponseBase */
/** @typedef {import('./types').ApiResponseRecursive} ApiResponseRecursive */
/** @typedef {import('./types').ApiPayload} ApiPayload */
/** @typedef {import('./types').ApiPayloadRecursive} ApiPayloadRecursive */
/** @typedef {import('./types').ApiPayloadBase} ApiPayloadBase */
/** @typedef {import('./types').ApiExample} ApiExample */
/** @typedef {import('./types').ApiParameterBase} ApiParameterBase */
/** @typedef {import('./types').ApiParameter} ApiParameter */
/** @typedef {import('./types').ApiParameterRecursive} ApiParameterRecursive */
/** @typedef {import('./types').ApiOperation} ApiOperation */
/** @typedef {import('./types').ApiOperationBase} ApiOperationBase */
/** @typedef {import('./types').ApiOperationRecursive} ApiOperationRecursive */
/** @typedef {import('./types').ApiEndPoint} ApiEndPoint */
/** @typedef {import('./types').ApiEndPointListItem} ApiEndPointListItem */
/** @typedef {import('./types').ApiServer} ApiServer */
/** @typedef {import('./types').ApiServerBase} ApiServerBase */
/** @typedef {import('./types').ApiServerRecursive} ApiServerRecursive */
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
/** @typedef {import('./types').ApiCustomDomainProperty} ApiCustomDomainProperty */
/** @typedef {import('./types').ApiDomainExtension} ApiDomainExtension */
/** @typedef {import('./types').ApiCustomDomainPropertyListItem} ApiCustomDomainPropertyListItem */
/** @typedef {import('./types').ApiEncodingBase} ApiEncodingBase */
/** @typedef {import('./types').ApiEncoding} ApiEncoding */
/** @typedef {import('./types').ApiEncodingRecursive} ApiEncodingRecursive */
/** @typedef {import('./types').ApiIriTemplateMapping} ApiIriTemplateMapping */
/** @typedef {import('./types').ApiCallback} ApiCallback */


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
      customDomainProperties: ApiSerializer.customDomainProperties(object),
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
    if (name && name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (description && description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (identifier && identifier.isNullOrEmpty === false) {
      result.identifier = identifier.value();
    }
    if (version && version.isNullOrEmpty === false) {
      result.version = version.value();
    }
    if (termsOfService && termsOfService.isNullOrEmpty === false) {
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
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    });
    if (name.isNullOrEmpty === false) {
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
   * @param {ParametrizedSecurityScheme} object The ParametrizedSecurityScheme to serialize.
   * @returns {ApiParametrizedSecuritySchemeRecursive} Serialized ParametrizedSecurityScheme
   */
  static parametrizedSecuritySchemeRecursive(object) {
    const { scheme } = object;
    const result = /** @type ApiParametrizedSecuritySchemeRecursive */ (/** @type ApiParametrizedSecuritySchemeBase */ (ApiSerializer.parametrizedSecurityScheme(object)));
    if (scheme) {
      result.scheme = ApiSerializer.securitySchemeRecursive(scheme);
    }
    return result;
  }

  /**
   * @param {SecurityScheme} object The SecurityScheme to serialize.
   * @returns {ApiSecurityScheme} Serialized SecurityScheme
   */
  static securityScheme(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type SecurityScheme */ (object.linkTarget);
    }
    const { id, headers, queryParameters, responses, name, type, displayName, description, settings, queryString } = target;
    const types = target.graph().types();
    const result = /** @type ApiSecurityScheme */ ({
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      headers: [],
      queryParameters: [],
      responses: [],
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    } else if (object.name.isNullOrEmpty === false) {
      result.name = object.name.value();
    }
    if (displayName.isNullOrEmpty === false) {
      result.displayName = displayName.value();
    } else if (object.displayName.isNullOrEmpty === false) {
      result.displayName = object.displayName.value();
    }
    if (type.isNullOrEmpty === false) {
      result.type = type.value();
    }
    if (description.isNullOrEmpty === false) {
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
   * @param {SecurityScheme} object The SecurityScheme to serialize.
   * @returns {ApiSecuritySchemeRecursive} Serialized SecurityScheme
   */
  static securitySchemeRecursive(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type SecurityScheme */ (object.linkTarget);
    }
    const { headers, queryParameters, responses, queryString } = target;
    const result = /** @type ApiSecuritySchemeRecursive */ (/** @type ApiSecuritySchemeBase */ (ApiSerializer.securityScheme(target)));
    if (queryString) {
      result.queryString = ApiSerializer.unknownShape(queryString);
    }
    if (Array.isArray(headers) && headers.length) {
      result.headers = headers.map(p => ApiSerializer.parameterRecursive(p));
    }
    if (Array.isArray(queryParameters) && queryParameters.length) {
      result.queryParameters = queryParameters.map(p => ApiSerializer.parameterRecursive(p));
    }
    if (Array.isArray(responses) && responses.length) {
      result.responses = responses.map(p => ApiSerializer.responseRecursive(p));
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
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      schemes: [],
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (Array.isArray(schemes) && schemes.length) {
      result.schemes = schemes.map(p => ApiSerializer.parametrizedSecurityScheme(p));
    }
    return result;
  }

  /**
   * @param {SecurityRequirement} object The SecurityRequirement to serialize.
   * @returns {ApiSecurityRequirementRecursive} Serialized SecurityRequirement
   */
  static securityRequirementRecursive(object) {
    const { schemes } = object;
    const result = /** @type ApiSecurityRequirementRecursive */ (/** @type ApiSecurityRequirementBase */ (ApiSerializer.securityRequirement(object)));
    if (Array.isArray(schemes) && schemes.length) {
      result.schemes = schemes.map(p => ApiSerializer.parametrizedSecuritySchemeRecursive(p));
    }
    return result;
  }

  /**
   * @param {SecurityScheme} object The SecurityScheme to serialize as a list item.
   * @returns {ApiSecuritySchemeListItem} Serialized SecurityScheme
   */
  static securitySchemeListItem(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type SecurityScheme */ (object.linkTarget);
    }
    const { name, type, displayName } = target;
    const types = target.graph().types();
    const result = /** @type ApiSecuritySchemeListItem */ ({
      id: object.id,
      types,
      type: type.value(),
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    } else if (object.name.isNullOrEmpty === false) {
      result.name = object.name.value();
    }
    if (displayName.isNullOrEmpty === false) {
      result.displayName = displayName.value();
    } else if (object.displayName.isNullOrEmpty === false) {
      result.displayName = object.displayName.value();
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
      customDomainProperties: ApiSerializer.customDomainProperties(object),
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
    const { authorizationUri, requestTokenUri, tokenCredentialsUri, signatures, } = object;
    const result = /** @type ApiSecurityOAuth1Settings */ (ApiSerializer.settings(object));
    
    if (authorizationUri.isNullOrEmpty === false) {
      result.authorizationUri = authorizationUri.value();
    }
    if (requestTokenUri.isNullOrEmpty === false) {
      result.requestTokenUri = requestTokenUri.value();
    }
    if (tokenCredentialsUri.isNullOrEmpty === false) {
      result.tokenCredentialsUri = tokenCredentialsUri.value();
    }
    if (Array.isArray(signatures) && signatures.length) {
      result.signatures = signatures.map((p) => p.value());
    } else {
      result.signatures = [];
    }
    return result;
  }

  /**
   * @param {OAuth2Settings} object 
   * @returns {ApiSecurityOAuth2Settings}
   */
  static oAuth2Settings(object) {
    const { authorizationGrants, flows, } = object;
    const result = /** @type ApiSecurityOAuth2Settings */ (ApiSerializer.settings(object));
    if (Array.isArray(authorizationGrants) && authorizationGrants.length) {
      result.authorizationGrants = authorizationGrants.map((p) => p.value());
    } else {
      result.authorizationGrants = [];
    }
    if (Array.isArray(flows) && flows.length) {
      result.flows = flows.map((p) => ApiSerializer.oAuth2Flow(p));
    } else {
      result.flows = [];
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
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      scopes: [],
    });
    if (authorizationUri.isNullOrEmpty === false) {
      result.authorizationUri = authorizationUri.value();
    }
    if (accessTokenUri.isNullOrEmpty === false) {
      result.accessTokenUri = accessTokenUri.value();
    }
    if (flow.isNullOrEmpty === false) {
      result.flow = flow.value();
    }
    if (refreshUri.isNullOrEmpty === false) {
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
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    return result;
  }

  /**
   * @param {ApiKeySettings} object 
   * @returns {ApiSecurityApiKeySettings}
   */
  static apiKeySettings(object) {
    const { name, in: inParam } = object;
    const result = /** @type ApiSecurityApiKeySettings */ (ApiSerializer.settings(object));
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (inParam.isNullOrEmpty === false) {
      result.in = inParam.value();
    }
    return result;
  }

  /**
   * @param {HttpSettings} object 
   * @returns {ApiSecurityHttpSettings}
   */
  static httpSettings(object) {
    const { scheme, bearerFormat } = object;
    const result = /** @type ApiSecurityHttpSettings */ (ApiSerializer.settings(object));
    if (scheme.isNullOrEmpty === false) {
      result.scheme = scheme.value();
    }
    if (bearerFormat.isNullOrEmpty === false) {
      result.bearerFormat = bearerFormat.value();
    }
    return result;
  }

  /**
   * @param {OpenIdConnectSettings} object 
   * @returns {ApiSecurityOpenIdConnectSettings}
   */
  static openIdConnectSettings(object) {
    const { url } = object;
    const result = /** @type ApiSecurityOpenIdConnectSettings */ (ApiSerializer.settings(object));
    if (url.isNullOrEmpty === false) {
      result.url = url.value();
    }
    return result;
  }

  /**
   * @param {Request} object The API request to serialize.
   * @returns {ApiRequest} Serialized API request
   */
  static request(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type Request */ (object.linkTarget);
    }
    const { id, required, description, queryString, headers, queryParameters, payloads, uriParameters, cookieParameters } = target;
    const types = target.graph().types();
    const result = /** @type ApiRequest */ ({
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      required: required.value(),
      headers: [],
      queryParameters: [],
      payloads: [],
      uriParameters: [],
      cookieParameters: [],
    });
    if (description.isNullOrEmpty === false) {
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
   * @param {Request} object The API request to serialize.
   * @returns {ApiRequestRecursive} Serialized API request
   */
  static requestRecursive(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type Request */ (object.linkTarget);
    }
    const { queryString, headers, queryParameters, payloads, uriParameters, cookieParameters } = target;
    const result = /** @type ApiRequestRecursive */ (/** @type ApiRequestBase */ (ApiSerializer.request(target)));
    if (queryString) {
      result.queryString = ApiSerializer.unknownShape(queryString);
    }
    if (Array.isArray(headers) && headers.length) {
      result.headers = headers.map(p => ApiSerializer.parameterRecursive(p));
    }
    if (Array.isArray(queryParameters) && queryParameters.length) {
      result.queryParameters = queryParameters.map(p => ApiSerializer.parameterRecursive(p));
    }
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map(p => ApiSerializer.payloadRecursive(p));
    }
    if (Array.isArray(uriParameters) && uriParameters.length) {
      result.uriParameters = uriParameters.map(p => ApiSerializer.parameterRecursive(p));
    }
    if (Array.isArray(cookieParameters) && cookieParameters.length) {
      result.cookieParameters = cookieParameters.map(p => ApiSerializer.parameterRecursive(p));
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
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (template.isNullOrEmpty === false) {
      result.template = template.value();
    }
    if (operationId.isNullOrEmpty === false) {
      result.operationId = operationId.value();
    }
    if (requestBody.isNullOrEmpty === false) {
      result.requestBody = requestBody.value();
    }
    if (server) {
      result.server = server.id;
    }
    if (Array.isArray(mapping) && mapping.length) {
      result.mapping = mapping.map(i => i.id);
    }
    return result;
  }

  /**
   * @param {TemplatedLink} object The TemplatedLink to serialize.
   * @returns {ApiTemplatedLinkRecursive} Serialized TemplatedLink
   */
  static templatedLinkRecursive(object) {
    const { server, mapping } = object;
    const result = /** @type ApiTemplatedLinkRecursive */ (/** @type ApiTemplatedLinkBase */(ApiSerializer.templatedLink(object)));
    if (server) {
      result.server = ApiSerializer.serverRecursive(server);
    }
    if (Array.isArray(mapping) && mapping.length) {
      result.mapping = mapping.map(i => ApiSerializer.iriTemplateMapping(i));
    }
    return result;
  }

  /**
   * @param {IriTemplateMapping} object 
   * @returns {ApiIriTemplateMapping}
   */
  static iriTemplateMapping(object) {
    const { id, templateVariable, linkExpression } = object;
    const types = object.graph().types();
    const result = /** @type ApiIriTemplateMapping */ ({
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    });
    if (templateVariable.isNullOrEmpty === false) {
      result.templateVariable = templateVariable.value();
    }
    if (linkExpression.isNullOrEmpty === false) {
      result.linkExpression = linkExpression.value();
    }
    return result;
  }

  /**
   * @param {Response} object The Response to serialize.
   * @returns {ApiResponse} Serialized Response
   */
  static response(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type Response */ (object.linkTarget);
    }
    const { id, headers, payloads, examples, links, name, description, statusCode } = target;
    const types = target.graph().types();
    const result = /** @type ApiResponse */ ({
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      headers: [],
      payloads: [],
      examples: [],
      links: [],
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (statusCode.isNullOrEmpty === false) {
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
   * @param {Response} object The Response to serialize.
   * @returns {ApiResponseRecursive} Serialized Response
   */
  static responseRecursive(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type Response */ (object.linkTarget);
    }
    const { headers, payloads, examples, links, } = target;
    const result = /** @type ApiResponseRecursive */ (/** @type ApiResponseBase */ (ApiSerializer.response(target)));
    if (Array.isArray(headers) && headers.length) {
      result.headers = headers.map(p => ApiSerializer.parameterRecursive(p));
    }
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map(p => ApiSerializer.payloadRecursive(p));
    }
    if (Array.isArray(examples) && examples.length) {
      result.examples = examples.map(p => ApiSerializer.example(p));
    }
    if (Array.isArray(links) && links.length) {
      result.links = links.map(p => ApiSerializer.templatedLinkRecursive(p));
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
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      examples: [],
      encoding: [],
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (mediaType.isNullOrEmpty === false) {
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
   * @param {Payload} object The Payload to serialize.
   * @returns {ApiPayloadRecursive} Serialized Payload
   */
  static payloadRecursive(object) {
    const { examples, encoding, schema } = object;
    const result = /** @type ApiPayloadRecursive */ (/** @type ApiPayloadBase */ (ApiSerializer.payload(object)));
    if (schema) {
      result.schema = ApiSerializer.unknownShape(schema);
    }
    if (Array.isArray(examples) && examples.length) {
      result.examples = examples.map(p => ApiSerializer.example(p));
    }
    if (Array.isArray(encoding) && encoding.length) {
      result.encoding = encoding.map(p => ApiSerializer.encodingRecursive(p));
    }
    return result;
  }

  /**
   * @param {Encoding} object 
   * @returns {ApiEncoding}
   */
  static encoding(object) {
    const { id, propertyName, contentType, style, explode, allowReserved, headers } = object;
    const types = object.graph().types();
    const result = /** @type ApiEncoding */ ({
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      headers: [],
    });
    if (propertyName.isNullOrEmpty === false) {
      result.propertyName = propertyName.value();
    }
    if (contentType.isNullOrEmpty === false) {
      result.contentType = contentType.value();
    }
    if (style.isNullOrEmpty === false) {
      result.contentType = style.value();
    }
    result.explode = explode.value();
    result.allowReserved = allowReserved.value();
    if (Array.isArray(headers) && headers.length) {
      result.headers = headers.map(h => h.id);
    }
    return result;
  }

  /**
   * @param {Encoding} object 
   * @returns {ApiEncodingRecursive}
   */
  static encodingRecursive(object) {
    const result = /** @type ApiEncodingRecursive */ (/** @type ApiEncodingBase */ (ApiSerializer.encoding(object)));
    if (Array.isArray(object.headers) && object.headers.length) {
      result.headers = object.headers.map(i => ApiSerializer.parameterRecursive(i));
    } else {
      result.headers = [];
    }
    return result;
  }

  /**
   * @param {Example} object The Example to serialize.
   * @returns {ApiExample} Serialized Example
   */
  static example(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type Example */ (object.linkTarget);
    }
    const { id, strict, name, displayName, description, value, mediaType, structuredValue } = target;
    const types = target.graph().types();
    const result = /** @type ApiExample */ ({
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      strict: strict.value(),
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (displayName.isNullOrEmpty === false) {
      result.displayName = displayName.value();
    }
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (value.isNullOrEmpty === false) {
      result.value = value.value();
    }
    if (mediaType.isNullOrEmpty === false) {
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
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      payloads: [],
      examples: [],
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    result.required = required.value();
    result.allowEmptyValue = allowEmptyValue.value();
    result.deprecated = deprecated.value();
    result.explode = explode.value();
    result.allowReserved = allowReserved.value();
    if (style.isNullOrEmpty === false) {
      result.style = style.value();
    }
    if (binding.isNullOrEmpty === false) {
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
   * @param {Parameter} object The Parameter to serialize.
   * @returns {ApiParameterRecursive} Serialized Parameter
   */
  static parameterRecursive(object) {
    const { schema, payloads, examples } = object;
    const result = /** @type ApiParameterRecursive */ (/** @type ApiParameterBase */ (ApiSerializer.parameter(object)));
    if (schema) {
      result.schema = ApiSerializer.unknownShape(schema);
    }
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map(p => ApiSerializer.payloadRecursive(p));
    } else {
      result.payloads = [];
    }
    if (Array.isArray(examples) && examples.length) {
      result.examples = examples.map(e => ApiSerializer.example(e));
    } else {
      result.examples = [];
    }
    return result;
  }
  
  /**
   * @param {Operation} object The Operation to serialize.
   * @returns {ApiOperation} Serialized Operation
   */
  static operation(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type Operation */ (object.linkTarget);
    }
    const types = target.graph().types();
    const { 
      id, method, deprecated, callbacks, responses, servers, security,
      name, description, summary, request, documentation, accepts, schemes, contentType,
    } = target;
    const result = /** @type ApiOperation */ ({
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      method: method.value(),
      deprecated: deprecated.value(),
      callbacks: [],
      responses: [],
      servers: [],
      security: [],
      accepts: [],
      schemes: [],
      contentType: [],
    });
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (summary.isNullOrEmpty === false) {
      result.summary = summary.value();
    }
    // @ts-ignore
    if (target.operationId.isNullOrEmpty === false) {
      // @ts-ignore
      result.operationId = target.operationId.value();
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
    return result;
  }

  /**
   * @param {Operation} object The Operation to serialize.
   * @returns {ApiOperationRecursive} Serialized Operation
   */
  static operationRecursive(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type Operation */ (object.linkTarget);
    }
    const { callbacks, responses, servers, security, request, documentation, } = target;
    const result = /** @type ApiOperationRecursive */ (/** @type ApiOperationBase */ (ApiSerializer.operation(target)));
    if (request) {
      result.request = ApiSerializer.requestRecursive(request);
    }
    if (documentation) {
      result.documentation = ApiSerializer.documentation(documentation);
    }
    if (Array.isArray(responses)) {
      result.responses = responses.map(r => ApiSerializer.responseRecursive(r));
    } else {
      result.responses = [];
    }
    if (Array.isArray(callbacks)) {
      result.callbacks = callbacks.map(c => ApiSerializer.callback(c));
    } else {
      result.callbacks = [];
    }
    if (Array.isArray(servers)) {
      result.servers = servers.map(s => ApiSerializer.serverRecursive(s));
    } else {
      result.servers = [];
    }
    if (Array.isArray(security)) {
      result.security = security.map(s => ApiSerializer.securityRequirementRecursive(s));
    } else {
      result.security = [];
    }
    return result;
  }

  /**
   * @param {Callback} object
   * @returns {ApiCallback}
   */
  static callback(object) {
    const types = object.graph().types();
    const { id, name, expression, endpoint, } = object;
    const result = /** @type ApiCallback */ ({
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (expression.isNullOrEmpty === false) {
      result.expression = expression.value();
    }
    if (endpoint) {
      result.endpoint = this.endPoint(endpoint);
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
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      path: path.value(),
      relativePath,
      operations: [],
      parameters: [],
      payloads: [],
      servers: [],
      security: [],
    });
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (summary.isNullOrEmpty === false) {
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
    if (name.isNullOrEmpty === false) {
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
    if (name.isNullOrEmpty === false) {
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
    let target = object;
    if (target.isLink) {
      target = /** @type Operation */ (object.linkTarget);
    }
    const { method, name } = target;
    const item = /** @type ApiOperationListItem */ ({
      id: object.id,
      method: method.value(),
    });
    if (name.isNullOrEmpty === false) {
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
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      url: url.value(),
      variables: [],
    });
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (Array.isArray(variables) && variables.length) {
      result.variables = variables.map((i) => i.id);
    }
    return result;
  }
  
  /**
   * @param {Server} object The Server to serialize.
   * @returns {ApiServerRecursive} Serialized Server
   */
  static serverRecursive(object) {
    const { variables } = object;
    const result = /** @type ApiServerRecursive */ (/** @type ApiServerBase */ (ApiSerializer.server(object)));
    if (Array.isArray(variables) && variables.length) {
      result.variables = variables.map(i => ApiSerializer.parameterRecursive(i));
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
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    });
    if (url.isNullOrEmpty === false) {
      result.url = url.value();
    }
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (title.isNullOrEmpty === false) {
      result.title = title.value();
    }
    return result;
  }

  /**
   * @param {NodeShape} object The NodeShape to serialize as a list item.
   * @returns {ApiNodeShapeListItem} Serialized NodeShape
   */
  static nodeShapeListItem(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type NodeShape */ (object.linkTarget);
    }
    const { displayName } = target;
    const name = object.name || target.name;
    const result = /** @type ApiNodeShapeListItem */ ({
      id: object.id,
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (displayName.isNullOrEmpty === false) {
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
      return ApiSerializer.scalarShape(/** @type ScalarShape */ (object));
    }
    if (types.includes(ns.w3.shacl.NodeShape)) {
      return ApiSerializer.nodeShape(/** @type NodeShape */ (object));
    }
    if (types.includes(ns.aml.vocabularies.shapes.UnionShape)) {
      return ApiSerializer.unionShape(/** @type UnionShape */ (object));
    }
    if (types.includes(ns.aml.vocabularies.shapes.FileShape)) {
      return ApiSerializer.fileShape(/** @type FileShape */ (object));
    }
    if (types.includes(ns.aml.vocabularies.shapes.SchemaShape)) {
      return ApiSerializer.schemaShape(/** @type SchemaShape */ (object));
    }
    if (types.includes(ns.aml.vocabularies.shapes.ArrayShape) || types.includes(ns.aml.vocabularies.shapes.MatrixShape)) {
      return ApiSerializer.arrayShape(/** @type ArrayShape */ (object));
    }
    if (types.includes(ns.aml.vocabularies.shapes.TupleShape)) {
      return ApiSerializer.tupleShape(/** @type TupleShape */ (object));
    }
    return ApiSerializer.anyShape(/** @type AnyShape */ (object));
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
    
    const result = /** @type ApiNodeShape */ (ApiSerializer.anyShape(object));

    if (discriminator.isNullOrEmpty === false) {
      result.discriminator = discriminator.value();
    }
    if (discriminatorValue.isNullOrEmpty === false) {
      result.discriminatorValue = discriminatorValue.value();
    }
    if (closed.value) {
      result.closed = closed.value();
    }
    if (minProperties.value) {
      result.minProperties = minProperties.value();
    }
    if (maxProperties.value) {
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
    const result = /** @type ApiPropertyShape */ (ApiSerializer.shape(object));
    if (path.isNullOrEmpty === false) {
      result.path = path.value();
    }
    if (patternName.isNullOrEmpty === false) {
      result.patternName = patternName.value();
    }
    if (minCount.nonNull === true && minCount.value) {
      result.minCount = minCount.value();
    }
    if (maxCount.nonNull === true && maxCount.value) {
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
    let target = object;
    if (target.isLink) {
      target = /** @type Shape */ (object.linkTarget);
    }
    const { 
      id, displayName, defaultValue, defaultValueStr, deprecated, description,
      values, inherits, or, and, xone, not, readOnly, writeOnly,
    } = target;
    const name = object.name || target.name;
    const types = target.graph().types();
    const result = /** @type ApiShape */ ({
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      values: [],
      inherits: [],
      or: [],
      and: [],
      xone: [],
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (displayName.isNullOrEmpty === false) {
      result.displayName = displayName.value();
    }
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (defaultValueStr.isNullOrEmpty === false) {
      result.defaultValueStr = defaultValueStr.value();
    }
    if (deprecated.nonNull === true && deprecated.value) {
      result.deprecated = deprecated.value();
    }
    if (readOnly.nonNull === true && readOnly.value) {
      result.readOnly = readOnly.value();
    }
    if (writeOnly.nonNull === true && writeOnly.value) {
      result.writeOnly = writeOnly.value();
    }
    if (defaultValue && defaultValue.id) {
      result.defaultValue = this.unknownDataNode(defaultValue);
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
    let target = object;
    if (target.isLink) {
      target = /** @type AnyShape */ (object.linkTarget);
    }
    const { documentation, xmlSerialization, examples } = target;
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
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    });
    result.attribute = attribute.value();
    result.wrapped = wrapped.value();
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (namespace.isNullOrEmpty === false) {
      result.namespace = namespace.value();
    }
    if (prefix.isNullOrEmpty === false) {
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
    const result = /** @type ApiScalarShape */ (ApiSerializer.anyShape(object));
    if (pattern.isNullOrEmpty === false) {
      result.pattern = pattern.value();
    }
    if (dataType.isNullOrEmpty === false) {
      result.dataType = dataType.value();
    }
    if (minLength.nonNull === true && minLength.value) {
      result.minLength = minLength.value();
    }
    if (maxLength.nonNull === true && maxLength.value) {
      result.maxLength = maxLength.value();
    }
    if (minimum.nonNull === true && minimum.value) {
      result.minimum = minimum.value();
    }
    if (maximum.nonNull === true && maximum.value) {
      result.maximum = maximum.value();
    }
    if (exclusiveMaximum.isNull === false && exclusiveMaximum.value) {
      result.exclusiveMaximum = exclusiveMaximum.value();
    }
    if (exclusiveMinimum.isNull === false && exclusiveMinimum.value) {
      result.exclusiveMinimum = exclusiveMinimum.value();
    }
    if (multipleOf.isNull === false && multipleOf.value) {
      result.multipleOf = multipleOf.value();
    }
    if (format.isNullOrEmpty === false) {
      result.format = format.value();
    }
    return result;
  }

  /**
   * @param {UnionShape} object
   * @returns {ApiUnionShape}
   */
  static unionShape(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type UnionShape */ (object.linkTarget);
    }
    const { anyOf } = target;
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
    const result = /** @type ApiFileShape */ (ApiSerializer.anyShape(object));
    const { fileTypes, pattern, minLength, maxLength, minimum, maximum, exclusiveMinimum, exclusiveMaximum, format, multipleOf } = target;
    if (pattern.isNullOrEmpty === false) {
      result.pattern = pattern.value();
    }
    if (Array.isArray(fileTypes) && fileTypes.length) {
      result.fileTypes = fileTypes.map((item) => item.value());
    }
    if (minLength.nonNull === true && minLength.value) {
      result.minLength = minLength.value();
    }
    if (maxLength.nonNull === true && maxLength.value) {
      result.maxLength = maxLength.value();
    }
    if (minimum.nonNull === true && minimum.value) {
      result.minimum = minimum.value();
    }
    if (maximum.nonNull === true && maximum.value) {
      result.maximum = maximum.value();
    }
    if (exclusiveMaximum.nonNull === true && exclusiveMaximum.value) {
      result.exclusiveMaximum = exclusiveMaximum.value();
    }
    if (exclusiveMinimum.nonNull === true && exclusiveMinimum.value) {
      result.exclusiveMinimum = exclusiveMinimum.value();
    }
    if (multipleOf.nonNull === true && multipleOf.value) {
      result.multipleOf = multipleOf.value();
    }
    if (format.isNullOrEmpty === false) {
      result.format = format.value();
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
    const result = /** @type ApiSchemaShape */ (ApiSerializer.anyShape(object));
    const { mediaType, raw } = target;
    if (mediaType.isNullOrEmpty === false) {
      result.mediaType = mediaType.value();
    }
    if (raw.isNullOrEmpty === false) {
      result.raw = raw.value();
    }
    return result;
  }

  /**
   * @param {DataArrangeShape} object
   * @returns {ApiDataArrangeShape}
   */
  static dataArrangeShape(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type DataArrangeShape */ (object.linkTarget);
    }
    const result = /** @type ApiDataArrangeShape */ (ApiSerializer.anyShape(object));
    const { minItems, maxItems, uniqueItems } = target;
    if (minItems.nonNull === true && minItems.value) {
      result.minItems = minItems.value();
    }
    if (maxItems.nonNull === true && maxItems.value) {
      result.maxItems = maxItems.value();
    }
    if (uniqueItems.nonNull === true && uniqueItems.value) {
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
    const result = /** @type ApiArrayShape */ (ApiSerializer.dataArrangeShape(object));
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
    const result = /** @type ApiTupleShape */ (ApiSerializer.dataArrangeShape(object));
    const { items, additionalItemsSchema } = target;
    if (!additionalItemsSchema) {
      result.additionalItems = additionalItemsSchema.id;
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
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    });
    if (name.isNullOrEmpty === false) {
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
    if (value.isNullOrEmpty === false) {
      result.value = value.value();
    }
    if (dataType.isNullOrEmpty === false) {
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

  /**
   * @param {CustomDomainProperty} object
   * @returns {ApiCustomDomainPropertyListItem}
   */
  static domainPropertyListItem(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type CustomDomainProperty */ (object.linkTarget);
    }
    const { name, displayName } = target;
    const result = /** @type ApiSecuritySchemeListItem */ ({
      id: object.id,
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (displayName.isNullOrEmpty === false) {
      result.displayName = displayName.value();
    }
    return result;
  }

  /**
   * @param {CustomDomainProperty} object
   * @returns {ApiCustomDomainProperty}
   */
  static customDomainProperty(object) {
    let target = object;
    if (target.isLink) {
      target = /** @type CustomDomainProperty */ (object.linkTarget);
    }
    const { id, name, displayName, description, domain, schema } = target;
    const types = object.graph().types();
    const result = /** @type ApiCustomDomainProperty */ ({
      id,
      types,
      domain: [],
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (displayName.isNullOrEmpty === false) {
      result.displayName = displayName.value();
    }
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (schema && schema.id) {
      result.schema = ApiSerializer.unknownShape(schema);
    }
    if (Array.isArray(domain) && domain.length) {
      result.domain = domain.map((p) => p.value());
    }
    return result;
  }

  /**
   * @param {DomainExtension} object
   * @returns {ApiDomainExtension}
   */
  static domainExtension(object) {
    const { id, name, definedBy, extension } = object;
    const types = object.graph().types();
    const result = /** @type ApiDomainExtension */ ({
      id,
      types,
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (definedBy && definedBy.id) {
      result.definedBy = ApiSerializer.customDomainProperty(definedBy);
    }
    if (extension && extension.id) {
      result.extension = ApiSerializer.unknownDataNode(extension);
    }
    return result;
  }

  /**
   * @param {DomainElement} object The object to compute the custom domain properties from.
   * @returns {ApiDomainExtension[]|undefined} The list of custom domain properties.
   */
  static customDomainProperties(object) {
    const { customDomainProperties } = object;
    if (!Array.isArray(customDomainProperties) || !customDomainProperties.length) {
      return [];
    }
    return customDomainProperties.map(p => ApiSerializer.domainExtension(p));
  }
}
