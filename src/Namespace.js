
/**
 * A namespace for AMF properties.
 * @deprecated Use `@api-client/core` instead.
 */
export const ns = {};

/**
 * @deprecated Use `@api-client/core` instead.
 */
ns.aml = {};
/**
 * @deprecated Use `@api-client/core` instead.
 */
ns.raml = ns.aml;
ns.aml.key = 'http://a.ml/';
/**
 * @deprecated Use `@api-client/core` instead.
 */
ns.aml.vocabularies = {};
ns.aml.vocabularies.key = `${ns.aml.key}vocabularies/`;
/**
 * @deprecated Use `@api-client/core` instead.
 */
ns.aml.vocabularies.document = {};
ns.aml.vocabularies.document.key = `${ns.aml.vocabularies.key}document#`;
const docKey = ns.aml.vocabularies.document.key;
ns.aml.vocabularies.document.toString = () => docKey;
ns.aml.vocabularies.document.Module = `${docKey}Module`;
ns.aml.vocabularies.document.Document = `${docKey}Document`;
ns.aml.vocabularies.document.SecuritySchemeFragment = `${docKey}SecuritySchemeFragment`;
ns.aml.vocabularies.document.UserDocumentation = `${docKey}UserDocumentation`;
ns.aml.vocabularies.document.DataType = `${docKey}DataType`;
ns.aml.vocabularies.document.NamedExamples = `${docKey}NamedExamples`;
ns.aml.vocabularies.document.DomainElement = `${docKey}DomainElement`;
ns.aml.vocabularies.document.DomainProperty = `${docKey}DomainProperty`;
ns.aml.vocabularies.document.ParametrizedDeclaration = `${docKey}ParametrizedDeclaration`;
ns.aml.vocabularies.document.ExternalDomainElement = `${docKey}ExternalDomainElement`;
ns.aml.vocabularies.document.customDomainProperties = `${docKey}customDomainProperties`;
ns.aml.vocabularies.document.encodes = `${docKey}encodes`;
ns.aml.vocabularies.document.declares = `${docKey}declares`;
ns.aml.vocabularies.document.references = `${docKey}references`;
ns.aml.vocabularies.document.examples = `${docKey}examples`;
ns.aml.vocabularies.document.linkTarget = `${docKey}link-target`;
ns.aml.vocabularies.document.referenceId = `${docKey}reference-id`;
ns.aml.vocabularies.document.structuredValue = `${docKey}structuredValue`;
ns.aml.vocabularies.document.raw = `${docKey}raw`;
ns.aml.vocabularies.document.extends = `${docKey}extends`;
ns.aml.vocabularies.document.value = `${docKey}value`;
ns.aml.vocabularies.document.name = `${docKey}name`;
/**
 * @deprecated Use `@api-client/core` instead.
 */
ns.aml.vocabularies.core = {};
ns.aml.vocabularies.core.key = `${ns.aml.vocabularies.key}core#`;
const coreKey = ns.aml.vocabularies.core.key;
ns.aml.vocabularies.core.toString = () => coreKey;
ns.aml.vocabularies.core.CreativeWork = `${coreKey}CreativeWork`;
ns.aml.vocabularies.core.version = `${coreKey}version`;
ns.aml.vocabularies.core.urlTemplate = `${coreKey}urlTemplate`;
ns.aml.vocabularies.core.displayName = `${coreKey}displayName`;
ns.aml.vocabularies.core.title = `${coreKey}title`;
ns.aml.vocabularies.core.name = `${coreKey}name`;
ns.aml.vocabularies.core.description = `${coreKey}description`;
ns.aml.vocabularies.core.documentation = `${coreKey}documentation`;
ns.aml.vocabularies.core.provider = `${coreKey}provider`;
ns.aml.vocabularies.core.email = `${coreKey}email`;
ns.aml.vocabularies.core.url = `${coreKey}url`;
ns.aml.vocabularies.core.termsOfService = `${coreKey}termsOfService`;
ns.aml.vocabularies.core.license = `${coreKey}license`;
ns.aml.vocabularies.core.mediaType = `${coreKey}mediaType`;
ns.aml.vocabularies.core.extensionName = `${coreKey}extensionName`;
/**
 * @deprecated Use `@api-client/core` instead.
 */
ns.aml.vocabularies.security = {};
ns.aml.vocabularies.security.key = `${ns.aml.vocabularies.key}security#`;
const secKey = ns.aml.vocabularies.security.key;
ns.aml.vocabularies.security.toString = () => secKey;
ns.aml.vocabularies.security.ParametrizedSecurityScheme = `${secKey}ParametrizedSecurityScheme`;
ns.aml.vocabularies.security.SecuritySchemeFragment = `${secKey}SecuritySchemeFragment`;
ns.aml.vocabularies.security.SecurityScheme = `${secKey}SecurityScheme`;
ns.aml.vocabularies.security.OAuth1Settings = `${secKey}OAuth1Settings`;
ns.aml.vocabularies.security.OAuth2Settings = `${secKey}OAuth2Settings`;
ns.aml.vocabularies.security.OAuth2Flow = `${secKey}OAuth2Flow`;
ns.aml.vocabularies.security.Scope = `${secKey}Scope`;
ns.aml.vocabularies.security.Settings = `${secKey}Settings`;
ns.aml.vocabularies.security.HttpSettings = `${secKey}HttpSettings`;
ns.aml.vocabularies.security.ApiKeySettings = `${secKey}ApiKeySettings`;
ns.aml.vocabularies.security.OpenIdConnectSettings = `${secKey}OpenIdConnectSettings`;
ns.aml.vocabularies.security.SecurityRequirement = `${secKey}SecurityRequirement`;
ns.aml.vocabularies.security.security = `${secKey}security`;
ns.aml.vocabularies.security.scheme = `${secKey}scheme`;
ns.aml.vocabularies.security.schemes = `${secKey}schemes`;
ns.aml.vocabularies.security.settings = `${secKey}settings`;
ns.aml.vocabularies.security.name = `${secKey}name`;
ns.aml.vocabularies.security.type = `${secKey}type`;
ns.aml.vocabularies.security.scope = `${secKey}scope`;
ns.aml.vocabularies.security.accessTokenUri = `${secKey}accessTokenUri`;
ns.aml.vocabularies.security.authorizationUri = `${secKey}authorizationUri`;
ns.aml.vocabularies.security.authorizationGrant = `${secKey}authorizationGrant`;
ns.aml.vocabularies.security.flows = `${secKey}flows`;
ns.aml.vocabularies.security.flow = `${secKey}flow`;
ns.aml.vocabularies.security.signature = `${secKey}signature`;
ns.aml.vocabularies.security.tokenCredentialsUri = `${secKey}tokenCredentialsUri`;
ns.aml.vocabularies.security.requestTokenUri = `${secKey}requestTokenUri`;
ns.aml.vocabularies.security.openIdConnectUrl = `${secKey}openIdConnectUrl`;
ns.aml.vocabularies.security.bearerFormat = `${secKey}bearerFormat`;
ns.aml.vocabularies.security.in = `${secKey}in`;
/**
 * @deprecated Use `@api-client/core` instead.
 */
ns.aml.vocabularies.apiContract = {};
ns.aml.vocabularies.http = ns.aml.vocabularies.apiContract;
ns.aml.vocabularies.apiContract.key = `${ns.aml.vocabularies.key}apiContract#`;
const contractKey = ns.aml.vocabularies.apiContract.key;
ns.aml.vocabularies.apiContract.toString = () => contractKey;
ns.aml.vocabularies.apiContract.Payload = `${contractKey}Payload`;
ns.aml.vocabularies.apiContract.Request = `${contractKey}Request`;
ns.aml.vocabularies.apiContract.Response = `${contractKey}Response`;
ns.aml.vocabularies.apiContract.EndPoint = `${contractKey}EndPoint`;
ns.aml.vocabularies.apiContract.Parameter = `${contractKey}Parameter`;
ns.aml.vocabularies.apiContract.Operation = `${contractKey}Operation`;
ns.aml.vocabularies.apiContract.WebAPI = `${contractKey}WebAPI`;
ns.aml.vocabularies.apiContract.API = `${contractKey}API`;
ns.aml.vocabularies.apiContract.AsyncAPI = `${contractKey}AsyncAPI`;
ns.aml.vocabularies.apiContract.UserDocumentationFragment = `${contractKey}UserDocumentationFragment`;
ns.aml.vocabularies.apiContract.Example = `${contractKey}Example`;
ns.aml.vocabularies.apiContract.Server = `${contractKey}Server`;
ns.aml.vocabularies.apiContract.ParametrizedResourceType = `${contractKey}ParametrizedResourceType`;
ns.aml.vocabularies.apiContract.ParametrizedTrait = `${contractKey}ParametrizedTrait`;
ns.aml.vocabularies.apiContract.Callback = `${contractKey}Callback`;
ns.aml.vocabularies.apiContract.TemplatedLink = `${contractKey}TemplatedLink`;
ns.aml.vocabularies.apiContract.IriTemplateMapping = `${contractKey}IriTemplateMapping`;
ns.aml.vocabularies.apiContract.Message = `${contractKey}Message`;
ns.aml.vocabularies.apiContract.DomainExtension = `${contractKey}DomainExtension`;
ns.aml.vocabularies.apiContract.header = `${contractKey}header`;
ns.aml.vocabularies.apiContract.parameter = `${contractKey}parameter`;
ns.aml.vocabularies.apiContract.paramName = `${contractKey}paramName`;
ns.aml.vocabularies.apiContract.uriParameter = `${contractKey}uriParameter`;
ns.aml.vocabularies.apiContract.variable = `${contractKey}variable`;
ns.aml.vocabularies.apiContract.payload = `${contractKey}payload`;
ns.aml.vocabularies.apiContract.server = `${contractKey}server`;
ns.aml.vocabularies.apiContract.path = `${contractKey}path`;
ns.aml.vocabularies.apiContract.url = `${contractKey}url`;
ns.aml.vocabularies.apiContract.scheme = `${contractKey}scheme`;
ns.aml.vocabularies.apiContract.endpoint = `${contractKey}endpoint`;
ns.aml.vocabularies.apiContract.queryString = `${contractKey}queryString`;
ns.aml.vocabularies.apiContract.accepts = `${contractKey}accepts`;
ns.aml.vocabularies.apiContract.guiSummary = `${contractKey}guiSummary`;
ns.aml.vocabularies.apiContract.binding = `${contractKey}binding`;
ns.aml.vocabularies.apiContract.response = `${contractKey}response`;
ns.aml.vocabularies.apiContract.returns = `${contractKey}returns`;
ns.aml.vocabularies.apiContract.expects = `${contractKey}expects`;
ns.aml.vocabularies.apiContract.examples = `${contractKey}examples`;
ns.aml.vocabularies.apiContract.supportedOperation = `${contractKey}supportedOperation`;
ns.aml.vocabularies.apiContract.statusCode = `${contractKey}statusCode`;
ns.aml.vocabularies.apiContract.method = `${contractKey}method`;
ns.aml.vocabularies.apiContract.required = `${contractKey}required`;
ns.aml.vocabularies.apiContract.callback = `${contractKey}callback`;
ns.aml.vocabularies.apiContract.expression = `${contractKey}expression`;
ns.aml.vocabularies.apiContract.link = `${contractKey}link`;
ns.aml.vocabularies.apiContract.linkExpression = `${contractKey}linkExpression`;
ns.aml.vocabularies.apiContract.templateVariable = `${contractKey}templateVariable`;
ns.aml.vocabularies.apiContract.mapping = `${contractKey}mapping`;
ns.aml.vocabularies.apiContract.operationId = `${contractKey}operationId`;
ns.aml.vocabularies.apiContract.protocol = `${contractKey}protocol`;
ns.aml.vocabularies.apiContract.protocolVersion = `${contractKey}protocolVersion`;
ns.aml.vocabularies.apiContract.headerSchema = `${contractKey}headerSchema`;
ns.aml.vocabularies.apiContract.contentType = `${contractKey}contentType`;
/**
 * @deprecated Use `@api-client/core` instead.
 */
ns.aml.vocabularies.shapes = {};
ns.aml.vocabularies.shapes.key = `${ns.aml.vocabularies.key}shapes#`;
const shapesKey = ns.aml.vocabularies.shapes.key;
ns.aml.vocabularies.shapes.toString = () => shapesKey;
ns.aml.vocabularies.shapes.ScalarShape = `${shapesKey}ScalarShape`;
ns.aml.vocabularies.shapes.ArrayShape = `${shapesKey}ArrayShape`;
ns.aml.vocabularies.shapes.UnionShape = `${shapesKey}UnionShape`;
ns.aml.vocabularies.shapes.NilShape = `${shapesKey}NilShape`;
ns.aml.vocabularies.shapes.FileShape = `${shapesKey}FileShape`;
ns.aml.vocabularies.shapes.AnyShape = `${shapesKey}AnyShape`;
ns.aml.vocabularies.shapes.SchemaShape = `${shapesKey}SchemaShape`;
ns.aml.vocabularies.shapes.MatrixShape = `${shapesKey}MatrixShape`;
ns.aml.vocabularies.shapes.TupleShape = `${shapesKey}TupleShape`;
ns.aml.vocabularies.shapes.DataTypeFragment = `${shapesKey}DataTypeFragment`;
ns.aml.vocabularies.shapes.RecursiveShape = `${shapesKey}RecursiveShape`;
ns.aml.vocabularies.shapes.range = `${shapesKey}range`;
ns.aml.vocabularies.shapes.items = `${shapesKey}items`;
ns.aml.vocabularies.shapes.anyOf = `${shapesKey}anyOf`;
ns.aml.vocabularies.shapes.fileType = `${shapesKey}fileType`;
ns.aml.vocabularies.shapes.number = `${shapesKey}number`;
ns.aml.vocabularies.shapes.integer = `${shapesKey}integer`;
ns.aml.vocabularies.shapes.long = `${shapesKey}long`;
ns.aml.vocabularies.shapes.double = `${shapesKey}double`;
ns.aml.vocabularies.shapes.boolean = `${shapesKey}boolean`;
ns.aml.vocabularies.shapes.float = `${shapesKey}float`;
ns.aml.vocabularies.shapes.nil = `${shapesKey}nil`;
ns.aml.vocabularies.shapes.dateTimeOnly = `${shapesKey}dateTimeOnly`;
ns.aml.vocabularies.shapes.password = `${shapesKey}password`;
ns.aml.vocabularies.shapes.schema = `${shapesKey}schema`;
ns.aml.vocabularies.shapes.xmlSerialization = `${shapesKey}xmlSerialization`;
ns.aml.vocabularies.shapes.xmlName = `${shapesKey}xmlName`;
ns.aml.vocabularies.shapes.xmlAttribute = `${shapesKey}xmlAttribute`;
ns.aml.vocabularies.shapes.xmlWrapped = `${shapesKey}xmlWrapped`;
ns.aml.vocabularies.shapes.readOnly = `${shapesKey}readOnly`;
/**
 * @deprecated Use `@api-client/core` instead.
 */
ns.aml.vocabularies.data = {};
ns.aml.vocabularies.data.key = `${ns.aml.vocabularies.key}data#`;
const dataKey = ns.aml.vocabularies.data.key;
ns.aml.vocabularies.data.toString = () => dataKey;
ns.aml.vocabularies.data.Scalar = `${dataKey}Scalar`;
ns.aml.vocabularies.data.Object = `${dataKey}Object`;
ns.aml.vocabularies.data.Array = `${dataKey}Array`;
ns.aml.vocabularies.data.value = `${dataKey}value`;
ns.aml.vocabularies.data.type = `${dataKey}type`;
ns.aml.vocabularies.data.description = `${dataKey}description`;
ns.aml.vocabularies.data.required = `${dataKey}required`;
ns.aml.vocabularies.data.displayName = `${dataKey}displayName`;
ns.aml.vocabularies.data.minLength = `${dataKey}minLength`;
ns.aml.vocabularies.data.maxLength = `${dataKey}maxLength`;
ns.aml.vocabularies.data.default = `${dataKey}default`;
ns.aml.vocabularies.data.multipleOf = `${dataKey}multipleOf`;
ns.aml.vocabularies.data.minimum = `${dataKey}minimum`;
ns.aml.vocabularies.data.maximum = `${dataKey}maximum`;
ns.aml.vocabularies.data.enum = `${dataKey}enum`;
ns.aml.vocabularies.data.pattern = `${dataKey}pattern`;
ns.aml.vocabularies.data.items = `${dataKey}items`;
ns.aml.vocabularies.data.format = `${dataKey}format`;
ns.aml.vocabularies.data.example = `${dataKey}example`;
ns.aml.vocabularies.data.examples = `${dataKey}examples`;
/**
 * @deprecated Use `@api-client/core` instead.
 */
ns.aml.vocabularies.docSourceMaps = {};
ns.aml.vocabularies.docSourceMaps.key = `${ns.aml.vocabularies.key}document-source-maps#`;
const dsmKey = ns.aml.vocabularies.docSourceMaps.key;
ns.aml.vocabularies.docSourceMaps.toString = () => dsmKey;
ns.aml.vocabularies.docSourceMaps.sources = `${dsmKey}sources`;
ns.aml.vocabularies.docSourceMaps.element = `${dsmKey}element`;
ns.aml.vocabularies.docSourceMaps.value = `${dsmKey}value`;
ns.aml.vocabularies.docSourceMaps.declaredElement = `${dsmKey}declared-element`;
ns.aml.vocabularies.docSourceMaps.trackedElement = `${dsmKey}tracked-element`;
ns.aml.vocabularies.docSourceMaps.parsedJsonSchema = `${dsmKey}parsed-json-schema`;
ns.aml.vocabularies.docSourceMaps.lexical = `${dsmKey}lexical`;

// W3 namespace
/**
 * @deprecated Use `@api-client/core` instead.
 */
ns.w3 = {};
ns.w3.key = 'http://www.w3.org/';
ns.w3.rdfSyntax = {};
ns.w3.rdfSyntax.key = `${ns.w3.key}1999/02/22-rdf-syntax-ns#`;
ns.w3.rdfSyntax.toString = () => ns.w3.rdfSyntax.key;
// TODO: is this unnecessary?
ns.w3.rdfSyntax.member = `${ns.w3.rdfSyntax.key}member`;
ns.w3.rdfSyntax.Seq = `${ns.w3.rdfSyntax.key}Seq`;
/**
 * @deprecated Use `@api-client/core` instead.
 */
ns.w3.rdfSchema = {};
ns.w3.rdfSchema.key = `${ns.w3.key}2000/01/rdf-schema#`;
ns.w3.rdfSchema.toString = () => ns.w3.rdfSchema.key;
ns.w3.rdfSchema.member = `${ns.w3.rdfSchema.key}member`;
ns.w3.rdfSchema.Seq = `${ns.w3.rdfSchema.key}Seq`;
/**
 * @deprecated Use `@api-client/core` instead.
 */
ns.w3.xmlSchema = {};
ns.w3.xmlSchema.key = `${ns.w3.key}2001/XMLSchema#`;
ns.w3.xmlSchema.toString = () => ns.w3.xmlSchema.key;
ns.w3.xmlSchema.boolean = `${ns.w3.xmlSchema.key}boolean`;
ns.w3.xmlSchema.string = `${ns.w3.xmlSchema.key}string`;
ns.w3.xmlSchema.number = `${ns.w3.xmlSchema.key}number`;
ns.w3.xmlSchema.integer = `${ns.w3.xmlSchema.key}integer`;
ns.w3.xmlSchema.long = `${ns.w3.xmlSchema.key}long`;
ns.w3.xmlSchema.double = `${ns.w3.xmlSchema.key}double`;
ns.w3.xmlSchema.float = `${ns.w3.xmlSchema.key}float`;
ns.w3.xmlSchema.nil = `${ns.w3.xmlSchema.key}nil`;
ns.w3.xmlSchema.dateTime = `${ns.w3.xmlSchema.key}dateTime`;
ns.w3.xmlSchema.time = `${ns.w3.xmlSchema.key}time`;
ns.w3.xmlSchema.date = `${ns.w3.xmlSchema.key}date`;
ns.w3.xmlSchema.base64Binary = `${ns.w3.xmlSchema.key}base64Binary`;
/**
 * @deprecated Use `@api-client/core` instead.
 */
ns.w3.shacl = {};
ns.w3.shacl.key = `${ns.w3.key}ns/shacl#`;
const n2shaclName = ns.w3.shacl.key;
ns.w3.shacl.toString = () => n2shaclName;
ns.w3.shacl.Shape = `${n2shaclName}Shape`;
ns.w3.shacl.NodeShape = `${n2shaclName}NodeShape`;
ns.w3.shacl.SchemaShape = `${n2shaclName}SchemaShape`;
ns.w3.shacl.PropertyShape = `${n2shaclName}PropertyShape`;
ns.w3.shacl.in = `${n2shaclName}in`;
ns.w3.shacl.defaultValue = `${n2shaclName}defaultValue`;
ns.w3.shacl.defaultValueStr = `${n2shaclName}defaultValueStr`;
ns.w3.shacl.pattern = `${n2shaclName}pattern`;
ns.w3.shacl.minInclusive = `${n2shaclName}minInclusive`;
ns.w3.shacl.maxInclusive = `${n2shaclName}maxInclusive`;
ns.w3.shacl.multipleOf = `${n2shaclName}multipleOf`;
ns.w3.shacl.minLength = `${n2shaclName}minLength`;
ns.w3.shacl.maxLength = `${n2shaclName}maxLength`;
ns.w3.shacl.fileType = `${n2shaclName}fileType`;
ns.w3.shacl.and = `${n2shaclName}and`;
ns.w3.shacl.property = `${n2shaclName}property`;
ns.w3.shacl.name = `${n2shaclName}name`;
ns.w3.shacl.raw = `${n2shaclName}raw`;
ns.w3.shacl.datatype = `${n2shaclName}datatype`;
ns.w3.shacl.minCount = `${n2shaclName}minCount`;
ns.w3.shacl.xone = `${n2shaclName}xone`;
ns.w3.shacl.not = `${n2shaclName}not`;
ns.w3.shacl.or = `${n2shaclName}or`;

Object.freeze(ns.raml);
Object.freeze(ns.aml);
Object.freeze(ns.aml.vocabularies);
Object.freeze(ns.aml.vocabularies.shapes);
Object.freeze(ns.aml.vocabularies.data);
Object.freeze(ns.aml.vocabularies.apiContract);
Object.freeze(ns.aml.vocabularies.security);
Object.freeze(ns.aml.vocabularies.core);
Object.freeze(ns.aml.vocabularies.document);
Object.freeze(ns.w3);
Object.freeze(ns.w3.rdfSyntax);
Object.freeze(ns.w3.rdfSchema);
Object.freeze(ns.w3.shacl);
Object.freeze(ns);
