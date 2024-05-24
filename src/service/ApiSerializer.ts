import { ApiDefinitions, AmfShapes, AmfNamespace as ns, AmfBase } from "@api-client/core/build/esm/browser.js";
import type * as AMF from 'amf-client-js';
import type { ApiCustomDomainExtensionListItem, ApiNodeShapeListItem } from "../types.js";

/**
 * This is not the same as the `AmfSerializer` from the core package.
 * It uses the `AMF` instance directly instead of working on the AMF json+ld model.
 */
export class ApiSerializer {
  static apiSummary(object: AMF.WebApi): ApiDefinitions.IApiSummary {
    const { 
      id, name, description, schemes, accepts, tags, documentations,
      contentType, version, termsOfService, provider, license, 
    } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiSummary = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      schemes: [],
      accepts: [],
      contentType: [],
      documentations: [],
      tags: [],
    };
    if (name && name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (description && description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (version && version.isNullOrEmpty === false) {
      result.version = version.value();
    }
    if (termsOfService && termsOfService.isNullOrEmpty === false) {
      result.termsOfService = termsOfService.value();
    }
    if (Array.isArray(accepts) && accepts.length) {
      result.accepts = accepts.map((i) => i.value());
    }
    if (Array.isArray(contentType) && contentType.length) {
      result.contentType = contentType.map((i) => i.value());
    }
    if (Array.isArray(schemes) && schemes.length) {
      result.schemes = schemes.map((i) => i.value());
    }
    if (provider) {
      result.provider = ApiSerializer.provider(provider);
    }
    if (license) {
      result.license = ApiSerializer.license(license);
    }
    if (Array.isArray(tags) && tags.length) {
      result.tags = tags.map((i) => ApiSerializer.tag(i));
    }
    if (Array.isArray(tags) && tags.length) {
      result.tags = tags.map((i) => ApiSerializer.tag(i));
    }
    if (Array.isArray(documentations) && documentations.length) {
      result.documentations = documentations.map((i) => ApiSerializer.documentation(i));
    }
    return result;
  }

  static api(object: AMF.WebApi): ApiDefinitions.IApiBase {
    const { 
      endPoints, servers, security,
    } = object;
    // const types = object.graph().types();
    // const isAsyncApi = types.includes('http://a.ml/vocabularies/apiContract#AsyncAPI');
    // const isWebApi = !isAsyncApi && types.includes('http://a.ml/vocabularies/apiContract#WebAPI');
    const result = this.apiSummary(object) as ApiDefinitions.IApiBase;
    result.endPoints = [];
    result.servers = [];
    result.security = [];
    
    if (Array.isArray(endPoints) && endPoints.length) {
      result.endPoints = endPoints.map((i) => ApiSerializer.endPoint(i));
    }
    
    if (Array.isArray(servers) && servers.length) {
      result.servers = servers.map((i) => ApiSerializer.server(i));
    }
    if (Array.isArray(security) && security.length) {
      result.security = security.map((i) => ApiSerializer.securityRequirement(i));
    }
    return result;
  }

  static webApi(object: AMF.WebApi): ApiDefinitions.IApiWeb {
    return this.api(object);
  }
  
  static asyncApi(object: AMF.AsyncApi): ApiDefinitions.IApiAsync {
    return this.api(object);
  }

  static provider(object: AMF.Organization): ApiDefinitions.IApiOrganization {
    const { id, name, url, email } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiOrganization = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    };
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (url.isNullOrEmpty === false) {
      result.url = url.value();
    }
    if (email.isNullOrEmpty === false) {
      result.email = email.value();
    }
    return result;
  }

  static license(object: AMF.License): ApiDefinitions.IApiLicense {
    const { id, name, url } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiLicense = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    };
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (url.isNullOrEmpty === false) {
      result.url = url.value();
    }
    return result;
  }

  /**
   * @param object The ParametrizedSecurityScheme to serialize.
   * @returns Serialized ParametrizedSecurityScheme
   */
  static parametrizedSecurityScheme(object: AMF.ParametrizedSecurityScheme): ApiDefinitions.IApiParametrizedSecurityScheme {
    const { id, name, settings, scheme } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiParametrizedSecurityScheme = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    };
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
   * @param object The SecurityScheme to serialize.
   * @returns Serialized SecurityScheme
   */
  static securityScheme(object: AMF.SecurityScheme): ApiDefinitions.IApiSecurityScheme {
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.SecurityScheme;
    }
    const { id, headers, queryParameters, responses, name, type, displayName, description, settings, queryString } = target;
    const types = target.graph().types();
    const result: ApiDefinitions.IApiSecurityScheme = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      headers: [],
      queryParameters: [],
      responses: [],
    };
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
      result.queryString = ApiSerializer.unknownShape(queryString);
    }
    if (Array.isArray(headers) && headers.length) {
      result.headers = headers.map(p => ApiSerializer.parameter(p));
    }
    if (Array.isArray(queryParameters) && queryParameters.length) {
      result.queryParameters = queryParameters.map((p) => ApiSerializer.parameter(p));
    }
    if (Array.isArray(responses) && responses.length) {
      result.responses = responses.map((p) => ApiSerializer.response(p));
    }
    return result;
  }

  static securityRequirement(object: AMF.SecurityRequirement): ApiDefinitions.IApiSecurityRequirement {
    const { id, name, schemes } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiSecurityRequirement = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      schemes: [],
    };
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (Array.isArray(schemes) && schemes.length) {
      result.schemes = schemes.map(p => ApiSerializer.parametrizedSecurityScheme(p));
    }
    return result;
  }

  static securitySchemeListItem(object: AMF.SecurityScheme): ApiDefinitions.IApiSecuritySchemeListItem {
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.SecurityScheme;
    }
    const { name, type, displayName } = target;
    const types = target.graph().types();
    const result: ApiDefinitions.IApiSecuritySchemeListItem = {
      id: object.id,
      types,
      type: type.value(),
    };
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

  static securitySettings(object: AMF.Settings): ApiDefinitions.IApiSecuritySettingsUnion {
    const types = object.graph().types();
    if (types.includes(ns.aml.vocabularies.security.OAuth1Settings)) {
      return ApiSerializer.oAuth1Settings(object as AMF.OAuth1Settings);
    }
    if (types.includes(ns.aml.vocabularies.security.OAuth2Settings)) {
      return ApiSerializer.oAuth2Settings(object as AMF.OAuth2Settings);
    }
    if (types.includes(ns.aml.vocabularies.security.ApiKeySettings)) {
      return ApiSerializer.apiKeySettings(object as AMF.ApiKeySettings);
    }
    if (types.includes(ns.aml.vocabularies.security.HttpSettings)) {
      return ApiSerializer.httpSettings(object as AMF.HttpSettings);
    }
    if (types.includes(ns.aml.vocabularies.security.OpenIdConnectSettings)) {
      return ApiSerializer.openIdConnectSettings(object as AMF.OpenIdConnectSettings);
    }
    return ApiSerializer.settings(object);
  }

  static settings(object: AMF.Settings): ApiDefinitions.IApiSecuritySettings {
    const { id, additionalProperties } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiSecuritySettings = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    };
    if (additionalProperties && additionalProperties.id) {
      result.additionalProperties = ApiSerializer.unknownDataNode(additionalProperties);
    }
    return result;
  }

  static oAuth1Settings(object: AMF.OAuth1Settings): ApiDefinitions.IApiSecurityOAuth1Settings {
    const { authorizationUri, requestTokenUri, tokenCredentialsUri, signatures, } = object;
    const result = ApiSerializer.settings(object) as ApiDefinitions.IApiSecurityOAuth1Settings;
    
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

  static oAuth2Settings(object: AMF.OAuth2Settings): ApiDefinitions.IApiSecurityOAuth2Settings {
    const { authorizationGrants, flows, } = object;
    const result = ApiSerializer.settings(object) as ApiDefinitions.IApiSecurityOAuth2Settings;
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

  static oAuth2Flow(object: AMF.OAuth2Flow): ApiDefinitions.IApiSecurityOAuth2Flow {
    const { id, authorizationUri, accessTokenUri, flow, refreshUri, scopes } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiSecurityOAuth2Flow = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      scopes: [],
    };
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

  static scope(object: AMF.Scope): ApiDefinitions.IApiSecurityScope {
    const { id, name, description } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiSecurityScope = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    };
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    return result;
  }

  static apiKeySettings(object: AMF.ApiKeySettings): ApiDefinitions.IApiSecurityApiKeySettings {
    const { name, in: inParam } = object;
    const result = ApiSerializer.settings(object) as ApiDefinitions.IApiSecurityApiKeySettings;
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (inParam.isNullOrEmpty === false) {
      result.in = inParam.value();
    }
    return result;
  }

  static httpSettings(object: AMF.HttpSettings): ApiDefinitions.IApiSecurityHttpSettings {
    const { scheme, bearerFormat } = object;
    const result = ApiSerializer.settings(object) as ApiDefinitions.IApiSecurityHttpSettings;
    if (scheme.isNullOrEmpty === false) {
      result.scheme = scheme.value();
    }
    if (bearerFormat.isNullOrEmpty === false) {
      result.bearerFormat = bearerFormat.value();
    }
    return result;
  }

  static openIdConnectSettings(object: AMF.OpenIdConnectSettings): ApiDefinitions.IApiSecurityOpenIdConnectSettings {
    const { url } = object;
    const result = ApiSerializer.settings(object) as ApiDefinitions.IApiSecurityOpenIdConnectSettings;
    if (url.isNullOrEmpty === false) {
      result.url = url.value();
    }
    return result;
  }

  static request(object: AMF.Request): ApiDefinitions.IApiRequest {
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.Request;
    }
    const { id, required, description, queryString, headers, queryParameters, payloads, uriParameters, cookieParameters } = target;
    const types = target.graph().types();
    const result: ApiDefinitions.IApiRequest = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      required: required.value(),
      headers: [],
      queryParameters: [],
      payloads: [],
      uriParameters: [],
      cookieParameters: [],
    };
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (queryString) {
      result.queryString = ApiSerializer.unknownShape(queryString);
    }
    if (Array.isArray(headers) && headers.length) {
      result.headers = headers.map(p => ApiSerializer.parameter(p));
    }
    if (Array.isArray(queryParameters) && queryParameters.length) {
      result.queryParameters = queryParameters.map(p => ApiSerializer.parameter(p));
    }
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map(p => ApiSerializer.payload(p));
    }
    if (Array.isArray(uriParameters) && uriParameters.length) {
      result.uriParameters = uriParameters.map(p => ApiSerializer.parameter(p));
    }
    if (Array.isArray(cookieParameters) && cookieParameters.length) {
      result.cookieParameters = cookieParameters.map(p => ApiSerializer.parameter(p));
    }
    return result;
  }

  static templatedLink(object: AMF.TemplatedLink): ApiDefinitions.IApiTemplatedLink {
    const { id, name, description, template, operationId, requestBody, server, mapping } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiTemplatedLink = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      mapping: [],
    };
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (operationId.isNullOrEmpty === false) {
      result.operationId = operationId.value();
    }
    if (template.isNullOrEmpty === false) {
      result.template = template.value();
    }
    if (requestBody.isNullOrEmpty === false) {
      result.requestBody = requestBody.value();
    }
    if (server) {
      result.server = ApiSerializer.server(server);
    }
    if (Array.isArray(mapping) && mapping.length) {
      result.mapping = mapping.map(i => ApiSerializer.iriTemplateMapping(i));
    }
    return result;
  }

  static iriTemplateMapping(object: AMF.IriTemplateMapping): ApiDefinitions.IApiIriTemplateMapping {
    const { id, templateVariable, linkExpression } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiIriTemplateMapping = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    };
    if (templateVariable.isNullOrEmpty === false) {
      result.templateVariable = templateVariable.value();
    }
    if (linkExpression.isNullOrEmpty === false) {
      result.linkExpression = linkExpression.value();
    }
    return result;
  }

  static response(object: AMF.Response): ApiDefinitions.IApiResponse {
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.Response;
    }
    const { id, headers, payloads, examples, links, name, description, statusCode } = target;
    const types = target.graph().types();
    const result: ApiDefinitions.IApiResponse = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      headers: [],
      payloads: [],
      examples: [],
      links: [],
    };
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
      result.headers = headers.map(p => ApiSerializer.parameter(p));
    }
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map(p => ApiSerializer.payload(p));
    }
    if (Array.isArray(examples) && examples.length) {
      result.examples = examples.map(p => ApiSerializer.example(p));
    }
    if (Array.isArray(links) && links.length) {
      result.links = links.map(p => ApiSerializer.templatedLink(p));
    }
    return result;
  }

  static payload(object: AMF.Payload): ApiDefinitions.IApiPayload {
    const { id, name, examples, mediaType, schema } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiPayload = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      examples: [],
      // encoding: [],
    };
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (mediaType.isNullOrEmpty === false) {
      result.mediaType = mediaType.value();
    }
    if (schema) {
      result.schema = ApiSerializer.unknownShape(schema);
    }
    if (Array.isArray(examples) && examples.length) {
      result.examples = examples.map(p => ApiSerializer.example(p));
    }
    // if (Array.isArray(encoding) && encoding.length) {
    //   result.encoding = encoding.map(p => ApiSerializer.encoding(p));
    // }
    return result;
  }

  static encoding(object: AMF.Encoding): ApiDefinitions.IApiEncoding {
    const { propertyName, contentType, style, explode, allowReserved, headers } = object;
    const result: ApiDefinitions.IApiEncoding = {
      headers: [],
    };
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
      result.headers = headers.map(i => ApiSerializer.parameter(i));
    }
    return result;
  }

  static example(object: AMF.Example): AmfShapes.IApiDataExample {
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.Example;
    }
    const { id, strict, name, displayName, description, value, mediaType, structuredValue, location } = target;
    const types = target.graph().types();
    const result: AmfShapes.IApiDataExample = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      strict: strict.value(),
    };
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
    if (location) {
      result.location = location;
    }
    if (mediaType.isNullOrEmpty === false) {
      result.mediaType = mediaType.value();
    }
    if (structuredValue && structuredValue.id) {
      result.structuredValue = ApiSerializer.unknownDataNode(structuredValue);
    }
    return result;
  }
  
  static parameter(object: AMF.Parameter): ApiDefinitions.IApiParameter {
    const { 
      id, name, description, required, allowEmptyValue, deprecated, explode, 
      allowReserved, style, binding, schema, payloads, examples, parameterName
    } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiParameter = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      payloads: [],
      examples: [],
    };
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (parameterName.isNullOrEmpty === false) {
      result.paramName = parameterName.value();
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
      result.schema = ApiSerializer.unknownShape(schema);
    }
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map(p => ApiSerializer.payload(p));
    }
    if (Array.isArray(examples) && examples.length) {
      result.examples = examples.map(e => ApiSerializer.example(e));
    }
    return result;
  }
  
  static operation(object: AMF.Operation): ApiDefinitions.IApiOperation {
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.Operation;
    }
    const types = target.graph().types();
    const { 
      id, method, deprecated, callbacks, responses, servers, security,
      name, description, summary, request, documentation, accepts, schemes, contentType,
      operationId, tags, extendsNode
    } = target;
    const result: ApiDefinitions.IApiOperation = {
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
      tags: [],
      extends: [],
    };
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (summary.isNullOrEmpty === false) {
      result.summary = summary.value();
    }
    if (operationId.isNullOrEmpty === false) {
      result.operationId = operationId.value();
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
    if (request) {
      result.request = ApiSerializer.request(request);
    }
    if (documentation) {
      result.documentation = ApiSerializer.documentation(documentation);
    }
    if (Array.isArray(responses)) {
      result.responses = responses.map(r => ApiSerializer.response(r));
    }
    if (Array.isArray(callbacks)) {
      result.callbacks = callbacks.map(c => ApiSerializer.callback(c));
    }
    if (Array.isArray(servers)) {
      result.servers = servers.map(s => ApiSerializer.server(s));
    }
    if (Array.isArray(security)) {
      result.security = security.map(s => ApiSerializer.securityRequirement(s));
    }
    if (Array.isArray(tags)) {
      result.tags = tags.map(t => ApiSerializer.tag(t));
    }
    if (Array.isArray(extendsNode)) {
      result.extends = extendsNode.map(t => ApiSerializer.parametrizedTrait(t as AMF.ParametrizedTrait));
    }
    return result;
  }

  static tag(object: AMF.Tag): ApiDefinitions.IApiTag {
    const types = object.graph().types();
    const { id, name, } = object;
    const result: ApiDefinitions.IApiTag = ({
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      name: '',
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    return result;
  }

  static parametrizedDeclaration(object: AMF.ParametrizedDeclaration): ApiDefinitions.IApiParametrizedDeclaration {
    const types = object.graph().types();
    const { id, name, variables, target } = object;
    const result: ApiDefinitions.IApiParametrizedDeclaration = {
      id,
      types,
      variables: [],
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    };
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (Array.isArray(variables)) {
      result.variables = variables.map(t => ApiSerializer.variableValue(t));
    }
    if (target) {
      result.target = ApiSerializer.abstractDeclaration(target);
    }
    return result;
  }

  static parametrizedTrait(object: AMF.ParametrizedTrait): ApiDefinitions.IApiParametrizedTrait {
    const result = ApiSerializer.parametrizedDeclaration(object) as ApiDefinitions.IApiParametrizedTrait;
    return result;
  }

  static parametrizedResourceType(object: AMF.ParametrizedResourceType): ApiDefinitions.IApiParametrizedResourceType {
    const result = ApiSerializer.parametrizedDeclaration(object) as ApiDefinitions.IApiParametrizedResourceType;
    return result;
  }

  static variableValue(object: AMF.VariableValue): ApiDefinitions.IApiVariableValue {
    const types = object.graph().types();
    const { id, name, value } = object;
    const result: ApiDefinitions.IApiVariableValue = ({
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      name: '',
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (value) {
      result.value = ApiSerializer.unknownDataNode(value);
    }
    return result;
  }

  static abstractDeclaration(object: AMF.AbstractDeclaration): ApiDefinitions.IApiAbstractDeclaration {
    const types = object.graph().types();
    const { id, name, variables, description, dataNode } = object;
    const result: ApiDefinitions.IApiAbstractDeclaration = ({
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      name: '',
      variables: [],
    });
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (Array.isArray(variables)) {
      result.variables = variables.map(t => t.value());
    }
    if (dataNode) {
      result.dataNode = ApiSerializer.unknownDataNode(dataNode);
    }
    return result;
  }

  static callback(object: AMF.Callback): ApiDefinitions.IApiCallback {
    const types = object.graph().types();
    const { id, name, expression, endpoint, } = object;
    const result: ApiDefinitions.IApiCallback = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    };
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
  
  static endPoint(object: AMF.EndPoint): ApiDefinitions.IApiEndPoint {
    const { 
      id, path, description, name, summary, operations, parameters,
      payloads, servers, security,
    } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiEndPoint = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      path: path.value(),
      operations: [],
      parameters: [],
      payloads: [],
      servers: [],
      security: [],
      extends: [],
      // relativePath,
    };
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
      result.operations = operations.map((i) => ApiSerializer.operation(i));
    }
    if (Array.isArray(parameters) && parameters.length) {
      result.parameters = parameters.map((i) => ApiSerializer.parameter(i));
    }
    if (Array.isArray(payloads) && payloads.length) {
      result.payloads = payloads.map((i) => ApiSerializer.payload(i));
    }
    if (Array.isArray(servers) && servers.length) {
      result.servers = servers.map((i) => ApiSerializer.server(i));
    }
    if (Array.isArray(security) && security.length) {
      result.security = security.map((i) => ApiSerializer.securityRequirement(i));
    }
    return result;
  }

  static endPointListItem(object: AMF.EndPoint): ApiDefinitions.IApiEndPointListItem {
    const { id, path, name } = object;
    const item: ApiDefinitions.IApiEndPointListItem = {
      id,
      path: path.value(),
    };
    if (name.isNullOrEmpty === false) {
      item.name = name.value();
    }
    return item;
  }

  static endPointWithOperationsListItem(object: AMF.EndPoint): ApiDefinitions.IApiEndPointWithOperationsListItem {
    const { id, path, name, operations } = object;
    const item: ApiDefinitions.IApiEndPointWithOperationsListItem = {
      id,
      path: path.value(),
      operations: [],
    };
    if (name.isNullOrEmpty === false) {
      item.name = name.value();
    }
    if (Array.isArray(operations) && operations.length) {
      item.operations = operations.map((op) => ApiSerializer.operationListItem(op));
    }
    return item;
  }

  static operationListItem(object: AMF.Operation): ApiDefinitions.IApiOperationListItem {
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.Operation;
    }
    const { method, name } = target;
    const item: ApiDefinitions.IApiOperationListItem = {
      id: object.id,
      method: method.value(),
    };
    if (name.isNullOrEmpty === false) {
      item.name = name.value();
    }
    return item;
  }
  
  static server(object: AMF.Server): ApiDefinitions.IApiServer {
    const { id, url, description, variables } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiServer = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      url: url.value(),
      variables: [],
    };
    if (description.isNullOrEmpty === false) {
      result.description = description.value();
    }
    if (Array.isArray(variables) && variables.length) {
      result.variables = variables.map(i => ApiSerializer.parameter(i));
    }
    return result;
  }
  
  /**
   * @param object The CreativeWork to serialize.
   * @returns Serialized CreativeWork
   */
  static documentation(object: AMF.CreativeWork): ApiDefinitions.IApiDocumentation {
    const { id, url, description, title } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiDocumentation = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    };
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
   * @param object The NodeShape to serialize as a list item.
   * @returns Serialized NodeShape
   */
  static nodeShapeListItem(object: AMF.NodeShape): ApiNodeShapeListItem {
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.NodeShape;
    }
    const { displayName } = target;
    const name = object.name || target.name;
    const result: ApiNodeShapeListItem = {
      id: object.id,
    };
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (displayName.isNullOrEmpty === false) {
      result.displayName = displayName.value();
    }
    return result;
  }

  static unknownShape(object: AMF.Shape): AmfShapes.IShapeUnion {
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.Shape;
    }
    const types = target.graph().types();
    if (types.includes(ns.aml.vocabularies.shapes.ScalarShape)) {
      return ApiSerializer.scalarShape(object as AMF.ScalarShape);
    }
    if (types.includes(ns.w3.shacl.NodeShape)) {
      return ApiSerializer.nodeShape(object  as AMF.NodeShape);
    }
    if (types.includes(ns.aml.vocabularies.shapes.UnionShape)) {
      return ApiSerializer.unionShape(object as AMF.UnionShape);
    }
    if (types.includes(ns.aml.vocabularies.shapes.FileShape)) {
      return ApiSerializer.fileShape(object as AMF.FileShape);
    }
    if (types.includes(ns.aml.vocabularies.shapes.SchemaShape)) {
      return ApiSerializer.schemaShape(object as AMF.SchemaShape);
    }
    // this must be before the ArrayShape
    if (types.includes(ns.aml.vocabularies.shapes.TupleShape)) {
      return ApiSerializer.tupleShape(object as AMF.TupleShape);
    }
    if (types.includes(ns.aml.vocabularies.shapes.ArrayShape) || types.includes(ns.aml.vocabularies.shapes.MatrixShape)) {
      return ApiSerializer.arrayShape(object as AMF.ArrayShape);
    }
    if (types.includes(ns.aml.vocabularies.shapes.RecursiveShape)) {
      return ApiSerializer.recursiveShape(object as AMF.RecursiveShape);
    }
    return ApiSerializer.anyShape(object as AMF.AnyShape);
  }

  /**
   * @param object The NodeShape to serialize
   */
  static nodeShape(object: AMF.NodeShape): AmfShapes.IApiNodeShape {
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.NodeShape;
    }
    const { 
      closed, minProperties, maxProperties, customShapeProperties,
      customShapePropertyDefinitions, discriminator, discriminatorValue, properties, dependencies,
    } = target;
    
    const result = ApiSerializer.anyShape(object) as AmfShapes.IApiNodeShape;

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


  static propertyShape(object: AMF.PropertyShape): AmfShapes.IApiPropertyShape {
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.PropertyShape;
    }
    const { path, range, minCount, maxCount } = target;
    const result = ApiSerializer.shape(object) as AmfShapes.IApiPropertyShape;
    if (path.isNullOrEmpty === false) {
      result.path = path.value();
    }
    // if (patternName.isNullOrEmpty === false) {
    //   result.patternName = patternName.value();
    // }
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

  static shape(object: AMF.Shape): AmfShapes.IApiShape {
    let linkLabel: string | undefined;
    let target = object;
    if (target.isLink) {
      linkLabel = target.linkLabel.value();
      target = object.linkTarget as AMF.Shape;
    }
    const { 
      id, displayName, defaultValue, defaultValueStr, deprecated, description,
      values, inherits, or, and, xone, not, readOnly, writeOnly,
    } = target;
    const name = object.name || target.name;
    const types = target.graph().types();
    const result: AmfShapes.IApiShape = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
      values: [],
      inherits: [],
      or: [],
      and: [],
      xone: [],
    };
    if (linkLabel) {
      result.linkLabel = linkLabel;
    }
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
      values.forEach((item) => {
        const value = ApiSerializer.unknownDataNode(item);
        if (value) {
          result.values.push(value);
        }
      });
    }
    if (not && not.id) {
      result.not = ApiSerializer.unknownShape(not);
    }
    return result;
  }

  static anyShape(object: AMF.AnyShape): AmfShapes.IApiAnyShape {
    let target = object;
    const result = ApiSerializer.shape(target) as AmfShapes.IApiAnyShape;
    if (target.isLink) {
      target = object.linkTarget as AMF.AnyShape;
    }
    const { documentation, xmlSerialization, examples } = target;
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

  static xmlSerializer(object: AMF.XMLSerializer): AmfShapes.IApiXmlSerializer {
    const { id, attribute, wrapped, name, namespace, prefix } = object;
    const types = object.graph().types();
    const result: AmfShapes.IApiXmlSerializer = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    };
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

  static scalarShape(object: AMF.ScalarShape): AmfShapes.IApiScalarShape {
    let target = object;
    const result = ApiSerializer.anyShape(target) as AmfShapes.IApiScalarShape;
    if (target.isLink) {
      target = object.linkTarget as AMF.ScalarShape;
    }
    const { dataType, pattern, minLength, maxLength, minimum, maximum, exclusiveMaximum, exclusiveMinimum, format, multipleOf } = target;
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

  static unionShape(object: AMF.UnionShape): AmfShapes.IApiUnionShape {
    const result = ApiSerializer.anyShape(object) as AmfShapes.IApiUnionShape;
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.UnionShape;
    }
    const { anyOf } = target;
    if (Array.isArray(anyOf) && anyOf.length) {
      result.anyOf = anyOf.map((shape) => ApiSerializer.unknownShape(shape));
    } else {
      result.anyOf = [];
    }
    return result;
  }

  static fileShape(object: AMF.FileShape): AmfShapes.IApiFileShape {
    const result = ApiSerializer.anyShape(object) as AmfShapes.IApiFileShape;
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.FileShape;
    }
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

  static schemaShape(object: AMF.SchemaShape): AmfShapes.IApiSchemaShape {
    const result = ApiSerializer.anyShape(object) as AmfShapes.IApiSchemaShape;
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.SchemaShape;
    }
    const { mediaType, raw } = target;
    if (mediaType.isNullOrEmpty === false) {
      result.mediaType = mediaType.value();
    }
    if (raw.isNullOrEmpty === false) {
      result.raw = raw.value();
    }
    return result;
  }

  static dataArrangeShape(object: AMF.DataArrangeShape): AmfShapes.IApiDataArrangeShape {
    const result = ApiSerializer.anyShape(object) as AmfShapes.IApiDataArrangeShape;
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.DataArrangeShape;
    }
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

  static arrayShape(object: AMF.ArrayShape): AmfShapes.IApiArrayShape {
    const result = ApiSerializer.dataArrangeShape(object) as AmfShapes.IApiArrayShape;
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.ArrayShape;
    }
    const { items } = target;
    if (items && items.id) {
      result.items = ApiSerializer.unknownShape(items);
    }
    return result;
  }

  static tupleShape(object: AMF.TupleShape): AmfShapes.IApiTupleShape {
    const result = ApiSerializer.dataArrangeShape(object) as AmfShapes.IApiTupleShape;
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.TupleShape;
    }
    const { items, additionalItemsSchema } = target;
    result.additionalItems = !!additionalItemsSchema;
    if (Array.isArray(items) && items.length) {
      result.items = items.map((shape) => ApiSerializer.unknownShape(shape));
    } else {
      result.items = [];
    }
    return result;
  }

  static recursiveShape(object: AMF.RecursiveShape): AmfShapes.IApiRecursiveShape {
    const result = ApiSerializer.shape(object) as AmfShapes.IApiRecursiveShape;
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.RecursiveShape;
    }
    const { fixpoint } = object;
    if (fixpoint && fixpoint.isNullOrEmpty === false) {
      result.fixPoint = fixpoint.value();
    }
    return result;
  }

  static unknownDataNode(object: AMF.DataNode): AmfShapes.IApiDataNodeUnion | undefined {
    const types = object.graph().types();
    if (types.includes(ns.aml.vocabularies.data.Scalar)) {
      return ApiSerializer.scalarNode(object as AMF.ScalarNode);
    }
    if (types.includes(ns.aml.vocabularies.data.Object)) {
      return ApiSerializer.objectNode(object as AMF.ObjectNode);
    }
    if (types.includes(ns.aml.vocabularies.data.Array)) {
      return ApiSerializer.arrayNode(object as AMF.ArrayNode);
    }
    return undefined;
  }

  /**
   * @param {DataNode} object
   * @returns {ApiDataNode}
   */
  static dataNode(object: AMF.DataNode): AmfShapes.IApiDataNode {
    const types = object.graph().types();
    const { id, name, } = object;
    const result: AmfShapes.IApiDataNode = {
      id,
      types,
      customDomainProperties: ApiSerializer.customDomainProperties(object),
    };
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    return result;
  }

  static scalarNode(object: AMF.ScalarNode): AmfShapes.IApiScalarNode {
    const result = this.dataNode(object) as AmfShapes.IApiScalarNode;
    const { value, dataType } = object;
    if (value.isNullOrEmpty === false) {
      result.value = value.value();
    }
    if (dataType.isNullOrEmpty === false) {
      result.dataType = dataType.value();
    }
    return result;
  }

  static objectNode(object: AMF.ObjectNode): AmfShapes.IApiObjectNode {
    const result = this.dataNode(object) as AmfShapes.IApiObjectNode;
    result.properties = {};
    const { properties } = object;
    Object.keys(properties).forEach((key) => {
      const node = properties.get(key);
      if (!node) {
        return;
      }
      const value = ApiSerializer.unknownDataNode(node);
      if (!value) {
        return;
      }
      result.properties[key] = value;
    });
    return result;
  }

  static arrayNode(object: AMF.ArrayNode): AmfShapes.IApiArrayNode {
    const result = this.dataNode(object) as AmfShapes.IApiArrayNode;
    result.members = [];
    const { members } = object;
    if (Array.isArray(members) && members.length) {
      members.forEach((item) => {
        const value = ApiSerializer.unknownDataNode(item);
        if (value) {
          result.members.push(value);
        }
      });
    }
    return result;
  }

  
  static domainPropertyListItem(object: AMF.CustomDomainProperty): ApiCustomDomainExtensionListItem {
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.CustomDomainProperty;
    }
    const { name, displayName } = target;
    const result: ApiCustomDomainExtensionListItem = {
      id: object.id,
    };
    if (name.isNullOrEmpty === false) {
      result.name = name.value();
    }
    if (displayName.isNullOrEmpty === false) {
      result.displayName = displayName.value();
    }
    return result;
  }

  static customDomainProperty(object: AMF.CustomDomainProperty): ApiDefinitions.IApiCustomDomainExtension {
    let target = object;
    if (target.isLink) {
      target = object.linkTarget as AMF.CustomDomainProperty;
    }
    const { id, name, displayName, description, domain, schema } = target;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiCustomDomainExtension = {
      id,
      types,
      domain: [],
      customDomainProperties: [],
    };
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

  static domainExtension(object: AMF.DomainExtension): ApiDefinitions.IApiDomainExtension {
    const { id, name, definedBy, extension } = object;
    const types = object.graph().types();
    const result: ApiDefinitions.IApiDomainExtension = {
      id,
      types,
      customDomainProperties: [],
    };
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
   * @param object The object to compute the custom domain properties from.
   * @returns The list of custom domain properties.
   */
  static customDomainProperties(object: AMF.DomainElement): AmfBase.IApiCustomDomainProperty[] {
    const { customDomainProperties } = object;
    if (!Array.isArray(customDomainProperties) || !customDomainProperties.length) {
      return [];
    }
    return customDomainProperties.map(p => ApiSerializer.domainExtension(p) as AmfBase.IApiCustomDomainProperty);
  }
}
