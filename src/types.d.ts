export interface WorkerMessage {
  /**
   * The type of the message. It identifies an operation performed by the worker.
   */
  type: string;
  /**
   * The id of the message to report back.
   */
  id: number;
  /**
   * The list of arguments to be passed to the operation.
   */
  arguments: any[];
}

export interface WorkerResponse {
  /**
   * The id of the request message.
   */
  id: number;
  /**
   * The computation result.
   */
  result: any;
  /**
   * Whether there was an error when computing the value
   */
  error?: boolean;
  /**
   * Error message.
   */
  message?: string;
}

export declare interface AmfWorkerStoreInit {
  /**
   * The path to the web worker location.
   */
  workerLocation?: string;
  /**
   * When set this function is used to create an instance of the web worker.
   * It has to return an instance of a WebWorker.
   */
  createWebWorker?: () => Worker;
  /**
   * The location of the `amd-bundle.js` file.
   * When not set it imports the file from the root location.
   */
  amfLocation?: string;
}

export interface WorkerQueueItem {
  resolver: Function;
  rejecter: Function;
}

interface ApiDomainProperty {
  id: string;
  types: string[];
}

export interface ApiInit {
  name?: string;
  description?: string;
  schemes?: string[];
  accepts?: string[];
  contentType?: string[];
  version?: string;
  termsOfService?: string;
}

export interface ApiServerInit {
  url: string;
  description?: string;
  /**
   * The names of variables. This can only be used to create new (empty) variables.
   */
  variables?: string[];
}

export interface EndPointInit {
  description?: string;
  name?: string;
  summary?: string;
  // relativePath?: string;
  path: string;
}

export interface OperationInit {
  method: string;
  name?: string;
  description?: string;
  summary?: string;
  deprecated?: boolean;
  schemes?: string[];
  accepts?: string[];
  contentType?: string[];
}

export interface OperationRequestInit {
  description?: string;
  required?: boolean;
  /**
   * List of header names (parameter names) to create
   */
  headers?: string[];
  /**
   * List of mediaTypes of the payloads to create.
   */
  payloads?: string[];
  /**
   * List of query parameter names to be set as query parameters.
   */
  queryParameters?: string[];
  /**
   * List of URI parameter names to be set as URI parameters.
   */
  uriParameters?: string[];
  /**
   * List of cookie names to be set as Cookie parameters.
   */
  cookieParameters?: string[];
}

export interface OperationResponseInit {
  name: string;
  description?: string;
  statusCode?: string;
  /**
   * List of header names (parameter names) to create
   */
  headers?: string[];
  /**
   * List of mediaTypes of the payloads to create.
   */
  payloads?: string[];
}

export type ScalarDataTypes = 'string' | 'base64Binary' | 'boolean' | 'date' | 'dateTime' | 'double' | 'float' | 'integer' | 'long' | 'number' | 'time';

export interface ParameterInit {
  /**
   * The parameter name
   */
  name: string;
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  binding?: string;
  /**
   * When set it adds a scalar schema definition to the parameter 
   * with the same name as the parameter.
   */
  dataType?: ScalarDataTypes;
}

export interface PayloadInit {
  /**
   * The payload media type
   */
  mediaType: string;
  /**
   * The payload name
   */
  name?: string;
}

export interface ExampleInit {
  /**
   * The name name of the example
   */
  name: string;
  displayName?: string;
  description?: string;
  value?: string;
  strict?: boolean;
  mediaType?: string;
}

export interface ApiEndPointListItem {
  /**
   * The domain id of the endpoint.
   * It may be undefined when the endpoint is created "abstract" endpoint vor the visualization.
   */
  id?: string;
  path: string;
  name?: string;
}

export interface ApiEndPointWithOperationsListItem extends ApiEndPointListItem {
  operations: ApiOperationListItem[];
}

export interface ApiEndpointsTreeItem extends ApiEndPointWithOperationsListItem {
  label: string;
  indent: number;
  hasShortPath?: boolean;
  hasChildren?: boolean;
}

export interface ApiEndPoint extends ApiDomainProperty {
  description?: string;
  name?: string;
  summary?: string;
  relativePath?: string;
  path: string;
  operations: string[];
  parameters: string[];
  payloads: string[];
  servers: string[];
  security: string[];
}

export interface ApiOperation extends ApiDomainProperty {
  method: string;
  name?: string;
  description?: string;
  summary?: string;
  deprecated: boolean;
  schemes?: string[];
  accepts?: string[];
  contentType?: string[];
  documentation?: string;
  request?: string;
  operationId?: string;
  responses: string[];
  security: string[];
  callbacks: string[];
  servers: string[];
  customDomainProperties: string[];
}

export interface ApiOperationListItem {
  id: string;
  method: string;
  name?: string;
}

export interface ApiServer extends ApiDomainProperty {
  url: string;
  variables: string[];
  description?: string;
}

export interface ApiParameter extends ApiDomainProperty {
  name: string;
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  binding?: string;
  schema?: string;
  payloads?: string[];
  examples?: string[];
}

export interface ApiExample extends ApiDomainProperty {
  name?: string;
  displayName?: string;
  description?: string;
  value?: string;
  structuredValue?: any;
  strict: boolean;
  mediaType?: string;
}

export interface ApiPayload extends ApiDomainProperty {
  name?: string;
  mediaType?: string;
  schema?: string;
  examples: string[];
  encoding: string[];
}

export interface ApiResponse extends ApiDomainProperty {
  name?: string;
  description?: string;
  statusCode?: string;
  headers: string[];
  payloads: string[];
  examples: string[];
  links: string[];
}

export interface ApiTemplatedLink extends ApiDomainProperty {
  name?: string;
  description?: string;
  template?: string;
  operationId?: string;
  mapping?: string;
  requestBody?: string;
  server?: string;
}

export interface ApiSecurityRequirement extends ApiDomainProperty {
  name?: string;
  schemes: string[];
}

export interface ApiParametrizedSecurityScheme extends ApiDomainProperty {
  name?: string;
  scheme?: string;
  settings?: string;
}

export interface ApiSecurityScheme extends ApiDomainProperty {
  name?: string;
  type?: string;
  displayName?: string;
  description?: string;
  headers: string[];
  queryParameters: string[];
  responses: string[];
  settings?: string;
  queryString?: string;
}

export interface ApiRequest extends ApiDomainProperty {
  description?: string;
  required?: boolean;
  queryParameters: string[];
  headers: string[];
  payloads: string[];
  queryString?: string;
  uriParameters: string[];
  cookieParameters: string[];
}

export interface ApiCustomDomainProperty {
  id: string;
  name?: string;
  displayName?: string;
  description?: string;
  domain: string[];
  schema?: string;
  isLink: boolean;
  linkTarget?: string;
  linkLabel?: string;
}

export interface ApiSecuritySchemeListItem {
  id: string;
  type: string;
  name?: string;
  displayName?: string;
}

export interface ApiDocumentation extends ApiDomainProperty {
  url?: string;
  description?: string;
  title?: string;
}

export interface DocumentationInit {
  title: string;
  /**
   * The documentation content. Not used with the `url`.
   */
  description?: string;
  url?: string;
}

export declare interface ApiNodeShapeListItem {
  id: string;
  name?: string;
  displayName?: string;
}

export interface SerializedApi extends ApiDomainProperty {
  isAsyncApi: boolean;
  isWebApi: boolean;
  name?: string;
  description?: string;
  identifier?: string;
  schemes: string[];
  endPoints: string[];
  accepts: string[];
  contentType: string[];
  version?: string;
  termsOfService?: string;
  provider?: string;
  license?: string;
  documentations: string[];
  servers: string[];
  security: string[];
}

export interface ShapeInit {
  /**
   * The AMF type. By default it is AnyType
   */
  type?: string;
  /**
   * The schema (type) name
   */
  name?: string;
  /**
   * The schema (type) display name
   */
  displayName?: string;
  description?: string;
  readOnly?: boolean;
  writeOnly?: boolean;
}

export type ApiShapeUnion = ApiScalarShape | ApiNodeShape | ApiUnionShape | ApiFileShape | ApiSchemaShape | ApiAnyShape | ApiArrayShape | ApiTupleShape;

export interface ApiShape extends ApiDomainProperty {
  values: (ApiScalarNode | ApiObjectNode | ApiArrayNode)[];
  inherits: ApiShapeUnion[];
  or: ApiShapeUnion[];
  and: ApiShapeUnion[];
  xone: ApiShapeUnion[];
  name?: string;
  displayName?: string;
  description?: string;
  defaultValueStr?: string;
  deprecated?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  defaultValue?: string;
  not?: ApiShapeUnion;
}

export interface ApiPropertyShape extends ApiShape {
  path?: string;
  range?: ApiShapeUnion;
  minCount?: number;
  maxCount?: number;
  patternName?: string;
}

export interface ApiAnyShape extends ApiShape {
  documentation?: ApiDocumentation;
  xmlSerialization: ApiXMLSerializer;
  examples: ApiExample[];
}

export interface ApiNodeShape extends ApiAnyShape {
  minProperties?: number;
  maxProperties?: number;
  closed?: boolean;
  customShapeProperties: string[];
  customShapePropertyDefinitions: string[];
  discriminator?: string;
  discriminatorValue?: string;
  properties: ApiPropertyShape[];
  dependencies: string[];
}

export interface ApiXMLSerializer extends ApiDomainProperty {
  attribute?: boolean;
  wrapped?: boolean;
  name?: string;
  namespace?: string;
  prefix?: string;
}

export interface ApiScalarShape extends ApiAnyShape {
  dataType?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: boolean;
  exclusiveMaximum?: boolean;
  format?: string;
  multipleOf?: number;
}

export interface ApiFileShape extends ApiAnyShape {
  fileTypes?: string[];
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: boolean;
  exclusiveMaximum?: boolean;
  format?: string;
  multipleOf?: number;
}

export interface ApiSchemaShape extends ApiAnyShape {
  mediaType?: string;
  raw?: string;
}

export interface ApiUnionShape extends ApiAnyShape {
  anyOf: ApiShapeUnion[];
}

export interface ApiDataArrangeShape extends ApiAnyShape {
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
}

export interface ApiArrayShape extends ApiDataArrangeShape {
  items?: ApiShapeUnion;
}

export interface ApiTupleShape extends ApiDataArrangeShape {
  items: ApiShapeUnion[];
  additionalItems?: boolean;
}

export interface ApiDataNode extends ApiDomainProperty {
  name?: string;
}

export interface ApiObjectNode extends ApiDataNode {
  properties: { [key: string]: ApiScalarNode | ApiObjectNode | ApiArrayNode };
}

export interface ApiScalarNode extends ApiDataNode {
  value?: string;
  dataType?: string;
}

export interface ApiArrayNode extends ApiDataNode {
  members: (ApiScalarNode | ApiObjectNode | ApiArrayNode)[];
}
