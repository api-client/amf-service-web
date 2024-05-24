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
  arguments: unknown[];
}

export interface WorkerResponse {
  /**
   * The id of the request message.
   */
  id: number;
  /**
   * The computation result.
   */
  result: unknown;
  /**
   * Whether there was an error when computing the value
   */
  error?: boolean;
  /**
   * Error message.
   */
  message?: string;
  stack?: string;
}

export interface AmfWorkerStoreInit {
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

export interface AmfHttpWorkerInit {
  /**
   * The API base URI.
   * e.g. https://api.domain.com/v1/
   */
  baseUri: string;
  /**
   * The AMF store process to use.
   * If not set the application must call `init()` to initialize new
   * session.
   */
  pid?: string;
  /**
   * The events target for the DOM events. 
   * @default Window
   */
  eventsTarget?: EventTarget;
}

export interface WorkerQueueItem {
  resolver: (value?: unknown) => void;
  rejecter: (reason?: Error) => void;
}

export interface ApiResource {
  /**
   * The API file content.
   */
  contents: string;
  /**
   * The full path of the file beginning of the API project root directory.
   */
  path: string;
}

export interface ProxyStatusResponse {
  kind: 'AMF#SessionStatus',
  status: 'closed' | 'created' | 'active';
  /**
   * The id of the created server process.
   */
  id: string;
  timeout?: number;
}

export interface ProxyRequest {
  /**
   * The id of the server process.
   */
  id: string;
  /**
   * The function to call in the proxy.
   */
  type: string;
  /**
   * The function arguments.
   */
  args?: unknown[];
}

export interface ProxyResponse {
  kind: 'AMF#ProxyResponse',
  /**
   * The id of the server process.
   */
  id: string;
  /**
   * The number of milliseconds after which the server destroys the instance of the API process.
   * All unsaved information will be lost. The application should use the `ping()` function to keep
   * the process alive.
   */
  timeout: number;
  result?: unknown;
}

export interface ProxyErrorResponse {
  error: boolean;
  message: string;
}

export type RAMLVendors = 'RAML 0.8' | 'RAML 1.0';
export type OASVendors = 'OAS 2.0' | 'OAS 3.0';
export type AmfVendors = 'AMF Graph' | 'JSON Schema';
export type AsyncVendors = 'ASYNC 2.0';
export type ParserVendors = RAMLVendors | OASVendors | AmfVendors | AsyncVendors;

export type RAMLMediaTypes = 'application/raml08+yaml' | 'application/raml10+yaml';
export type OASMediaTypes = 'application/oas20' | 'application/oas20+yaml' | 'application/oas20+json' | 'application/openapi30' | 'application/openapi30+yaml' | 'application/openapi30+json';
export type AsyncMediaTypes = 'application/asyncapi20' | 'application/asyncapi20+yaml' | 'application/asyncapi20+json';
export type AmfMediaTypes = 'application/amf-payload' | 'application/amf-payload+yaml' | 'application/amf-payload+json';
export type GraphMediaTypes = 'application/graph' | 'application/schema+json';

export type ParserMediaTypes = RAMLMediaTypes | OASMediaTypes | AsyncMediaTypes | AmfMediaTypes | GraphMediaTypes;


export interface ContentFile {
  lastModified: number;
  name: string;
  type: string;
  content: string;
  size: number;
}

export interface ImportFile {
  label: string;
  ext: string | string[];
}

export interface ApiSearchTypeResult {
  /**
   * API type
   */
  type: ParserVendors;
  /**
   * File media type
   */
  contentType: ParserMediaTypes;
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

export interface CustomDomainPropertyInit {
  /**
   * The custom property (annotation) name
   */
  name?: string;
  /**
   * The custom property (annotation) display name
   */
  displayName?: string;
  /**
   * The custom property (annotation) description
   */
  description?: string;
}

export interface ApiCustomDomainExtensionListItem {
  id: string;
  name?: string;
  displayName?: string;
}

export interface DocumentationInit {
  title: string;
  /**
   * The documentation content. Not used with the `url`.
   */
  description?: string;
  url?: string;
}

export interface ApiNodeShapeListItem {
  id: string;
  name?: string;
  displayName?: string;
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

export interface PropertyShapeInit {
  name: string;
  displayName?: string;
  description?: string;
  defaultValueStr?: string;
  patternName?: string;
  readOnly?: boolean;
  writeOnly?: boolean;
  deprecated?: boolean;
  minCount?: number;
  maxCount?: number;
  range?: ShapeInit;
}
