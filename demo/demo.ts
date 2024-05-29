import { html, TemplateResult } from 'lit';
import { DemoPage } from './lib/DemoPage.js';
import { WebWorkerService } from '../src/worker.index.js';
import { ApiSorting } from '../src/lib/ApiSorting.js';
import { EndpointsTree } from '../src/lib/EndpointsTree.js';
import { ApiSearch } from '../src/lib/ApiSearch.js';
import { ApiResource, ParserVendors } from '../src/types.js';
import { DemoPersistance } from './lib/DemoPersistance.js';

class ComponentPage extends DemoPage {
  loaded: boolean;
  initialized: boolean;
  latestOutput: string;
  store: WebWorkerService;

  constructor() {
    super();
    this.initObservableProperties(['loaded', 'initialized', 'latestOutput']);
    this.loaded = false;
    this.initialized = false;
    this.latestOutput = "";
    const persistance = new DemoPersistance('demo.page');
    this.store = new WebWorkerService(persistance, undefined, {
      workerLocation: new URL('../build/workers/AmfWorker.js', import.meta.url).toString()
    });
    this.componentName = "AmfStoreProxy";
    this.actionHandler = this.actionHandler.bind(this);

    this.init();
  }

  async init(): Promise<void> {
    await this.store.init();
    this.log("void");
    this.initialized = true;
    this.render();
  }

  async readSecurity(): Promise<void> {
    const input = document.getElementById("securityId") as HTMLInputElement;
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store.getSecurityScheme(id);
    this.log(result);
  }

  async readSecuritySettings(): Promise<void> {
    const input = document.getElementById("securitySettingsId") as HTMLInputElement;
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store.getParametrizedSecurityScheme(id);
    this.log(result);
  }

  async readSecurityRequirement(): Promise<void> {
    const input = document.getElementById("securityRequirementId") as HTMLInputElement;
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store.getSecurityRequirement(id);
    this.log(result);
  }

  async readCustomDomainProperty(): Promise<void> {
    const input = document.getElementById("cdpId") as HTMLInputElement;
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store.getCustomDomainProperty(id);
    this.log(result);
  }

  async readDomainExtension(): Promise<void> {
    const input = document.getElementById("extId") as HTMLInputElement;
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store.getDomainExtension(id);
    this.log(result);
  }

  async listCustomDomainProperties(): Promise<void> {
    const input = document.getElementById("extId") as HTMLInputElement;
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store.listCustomDomainProperties();
    this.log(result);
  }

  async generateRaml(): Promise<void> {
    const result = await this.store.generateRaml();
    this.log(result);
  }

  async generateGraph(): Promise<void> {
    const result = await this.store.generateGraph();
    this.log(result);
  }

  async getApi(): Promise<void> {
    const result = await this.store.getApi();
    this.log(result);
  }

  async readOperation(): Promise<void> {
    const input = document.getElementById("operationId") as HTMLInputElement;
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const pathInput = document.getElementById("operationEndpointIdOrPath") as HTMLInputElement;
    const path = pathInput.value.trim();
    const result = await this.store.getOperation(id, path);
    this.log(result);
  }

  async getOperationRecursive(): Promise<void> {
    const input = document.getElementById("operationId") as HTMLInputElement;
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const pathInput = document.getElementById("operationEndpointIdOrPath") as HTMLInputElement;
    const path = pathInput.value.trim();
    const result = await this.store.getOperation(id, path);
    this.log(result);
  }

  async actionHandler(e: Event): Promise<void> {
    const button = e.target as HTMLButtonElement;
    if (typeof this[button.id] === "function") {
      this[button.id](button);
      return;
    }
    switch (button.id) {
      // case "loadApiGraph":
      //   this.loadDemoApi(button.dataset.src!, button.dataset.type as ParserVendors);
      //   break;
      case "loadEmptyApi":
        this.latestOutput = await this.store.createWebApi();
        this.loaded = true;
        this.log("void");
        this.render();
        break;
      case "addEndpoint":
        {
          const input = document.getElementById("endpointIdPath") as HTMLInputElement;
          const path = input.value.trim();
          if (!path) {
            return;
          }
          const result = await this.store.addEndpoint({ path });
          this.log(result);
          this.render();
        }
        break;
      case "readEndpoint":
        {
          const input = document.getElementById("endpointIdPath") as HTMLInputElement;
          const path = input.value.trim();
          if (!path) {
            return;
          }
          const result = await this.store.getEndpoint(path);
          this.log(result);
          this.render();
        }
        break;
      case "deleteEndpoint":
        {
          const input = document.getElementById("endpointIdPath") as HTMLInputElement;
          const id = input.value.trim();
          if (!id) {
            return;
          }
          await this.store.deleteEndpoint(id);
          this.log("void");
          this.render();
        }
        break;
      case "deleteOperation":
        {
          const input = document.getElementById("operationId") as HTMLInputElement;
          const id = input.value.trim();
          if (!id) {
            return;
          }
          const endpoint = await this.store.getOperationParent(id);
          if (!endpoint) {
            this.log(`The endpoint was not found: ${id}`);
            return;
          }
          const result = await this.store.deleteOperation(id, endpoint.id);
          this.log(result);
          this.render();
        }
        break;
      case "addOperation":
        {
          const input = document.getElementById("operationId") as HTMLInputElement;
          const eInput = document.getElementById("operationEndpointIdOrPath") as HTMLInputElement;
          const method = input.value.trim();
          const endpoint = eInput.value.trim();
          if (!method || !endpoint) {
            return;
          }
          const result = await this.store.addOperation(endpoint, { method });
          this.log(result);
          this.render();
        }
        break;
      case "listTypes":
        {
          const result = await this.store.listTypes();
          this.log(result);
          this.render();
        }
        break;
      case "listSecurity":
        {
          const result = await this.store.listSecurity();
          this.log(result);
          this.render();
        }
        break;
      case "listEndpoints":
        {
          const result = await this.store.listEndpoints();
          this.log(result);
          this.render();
        }
        break;
      case "listEndpointsWithOperations":
        {
          const result = await this.store.listEndpointsWithOperations();
          const sorted = ApiSorting.sortEndpointsByPath(result);
          const items = new EndpointsTree().create(sorted);
          this.log(items);
          this.render();
        }
        break;
      case "readType":
        {
          const input = document.getElementById("typeId") as HTMLInputElement;
          const id = input.value.trim();
          if (!id) {
            return;
          }
          const result = await this.store.getType(id);
          this.log(result);
        }
        break;
      default:
        console.warn(`Unhandled action ${button.id}`);
    }
  }

  async loadApiGraph(button: HTMLButtonElement): Promise<void> {
    this.loadDemoApi(button.dataset.src!, button.dataset.type as ParserVendors);
  }

  log(message: unknown): void {
    if (typeof message === "object") {
      this.latestOutput = JSON.stringify(message, null, 2);
    } else {
      this.latestOutput = message as string;
    }
    console.log(message);
  }

  async loadDemoApi(file: string, type: ParserVendors): Promise<void> {
    this.loaded = false;
    const rsp = await fetch(`./${file}`);
    const model = await rsp.text();
    await this.store.loadGraph(model, type);
    this.loaded = true;
    this.log("void");
  }

  async selectApiDirectory(): Promise<void> {
    const dirHandle = await window.showDirectoryPicker();
    if (!dirHandle) {
      return;
    }
    const files: ApiResource[] = [];
    await this.listDirectory(dirHandle, files, "");
    const [mainHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: "API files",
          accept: {
            "application/json": [".json"],
            "application/ld+json": [".jsonld"],
            "application/yaml": [".raml", ".yaml"],
            "application/raml": [".raml"],
          },
        },
      ],
      excludeAcceptAllOption: true,
    });
    const file = await mainHandle.getFile();
    const content = await file.text();
    const helper = new ApiSearch();
    const result = helper.readApiType({
      content,
      name: mainHandle.name,
      lastModified: Date.now(),
      size: 0,
      type: "",
    });
    await this.store.loadApi(
      files,
      result.type,
      result.contentType,
      mainHandle.name
    );
    this.loaded = true;
  }

  async listDirectory(handle: FileSystemDirectoryHandle, result: ApiResource[], parent?: string): Promise<void> {
    for await (const entry of handle.values()) {
      await this.listContent(entry, result, parent);
    }
  }

  async listContent(handle: FileSystemDirectoryHandle | FileSystemFileHandle, result: ApiResource[], parent = "/"): Promise<void> {
    if (handle.kind === "file") {
      const file = await handle.getFile();
      const contents = await file.text();
      const fPath = `${parent}${handle.name}`;
      result.push({
        contents,
        path: fPath,
        // parent,
        // name: handle.name,
      });
    } else {
      await this.listDirectory(handle, result, `${parent}${handle.name}/`);
    }
  }

  contentTemplate(): TemplateResult {
    return html`
      <h2>Amf store proxy (web worker)</h2>
      ${this._demoTemplate()}
    `;
  }

  _demoTemplate(): TemplateResult {
    const { loaded, initialized, latestOutput } = this;
    return html`
      <section class="documentation-section">
        <h3>Store demo</h3>

        <h4>Initialization</h4>
        <div @click="${this.actionHandler}">
          <button id="init">Init</button>
          <button
            id="loadApiGraph"
            data-type="RAML 1.0"
            data-src="demo-api.json"
            ?disabled="${!initialized}"
          >
            Load demo API
          </button>
          <button
            id="loadApiGraph"
            data-type="ASYNC 2.0"
            data-src="async-api.json"
            ?disabled="${!initialized}"
          >
            Load async API
          </button>
          <button
            id="loadApiGraph"
            data-type="RAML 1.0"
            data-src="google-drive-api.json"
            ?disabled="${!initialized}"
          >
            Load Google Drive API
          </button>
          <button
            id="loadApiGraph"
            data-type="ASYNC 2.0"
            data-src="streetlights.json"
            ?disabled="${!initialized}"
          >
            Streetlights (async) API
          </button>
          <button
            id="loadApiGraph"
            data-type="OAS 3.0"
            data-src="oas-3-api.json"
            ?disabled="${!initialized}"
          >
            OAS 3 API
          </button>
          <button id="loadEmptyApi" ?disabled="${!initialized}">
            Load empty API
          </button>
          <button ?disabled="${!initialized}" id="selectApiDirectory">
            Select API
          </button>
        </div>

        <h4>Reading data</h4>
        <div @click="${this.actionHandler}">
          <button id="getApi" ?disabled="${!loaded}">Read API</button>
          <button id="listEndpoints" ?disabled="${!loaded}">
            List endpoints
          </button>
          <button id="listEndpointsWithOperations" ?disabled="${!loaded}">
            List endpoints & operations
          </button>
          <button id="listTypes" ?disabled="${!loaded}">List types</button>
          <button id="listSecurity" ?disabled="${!loaded}">
            List security
          </button>
          <button id="listCustomDomainProperties" ?disabled="${!loaded}">
            List annotations/extensions
          </button>
        </div>

        <h4>API manipulation</h4>
        <div>
          <h4>Endpoints</h4>
          <div>
            <label for="endpointIdPath">Endpoint path or id</label>
            <input type="text" id="endpointIdPath" value="/one" />
            <button
              id="addEndpoint"
              ?disabled="${!loaded}"
              @click="${this.actionHandler}"
            >
              Add endpoint
            </button>
            <button
              id="readEndpoint"
              ?disabled="${!loaded}"
              @click="${this.actionHandler}"
            >
              Read endpoint
            </button>
            <button
              id="deleteEndpoint"
              ?disabled="${!loaded}"
              @click="${this.actionHandler}"
            >
              Delete endpoint
            </button>
          </div>

          <details>
            <summary>Operations</summary>

            <div class="form-field">
              <label for="operationId">Operation id (or method)</label>
              <input type="text" id="operationId" value="get" />
            </div>
            <div class="form-field">
              <label for="operationEndpointIdOrPath"
                >Endpoint id (or path)</label
              >
              <input
                type="text"
                id="operationEndpointIdOrPath"
                value="/one"
              />
            </div>
            <div class="form-field">
              <button
                id="addOperation"
                ?disabled="${!loaded}"
                @click="${this.actionHandler}"
              >
                Add
              </button>
              <button
                id="readOperation"
                ?disabled="${!loaded}"
                @click="${this.actionHandler}"
              >
                Read
              </button>
              <button
                id="deleteOperation"
                ?disabled="${!loaded}"
                @click="${this.actionHandler}"
              >
                Delete
              </button>
              <button
                id="getOperationRecursive"
                ?disabled="${!loaded}"
                @click="${this.actionHandler}"
              >
                Read recursive
              </button>
            </div>
          </details>

          <h4>Types</h4>
          <div>
            <label for="typeId">Type id</label>
            <input type="text" id="typeId" value="" />
            <button
              id="readType"
              ?disabled="${!loaded}"
              @click="${this.actionHandler}"
            >
              Read type
            </button>
          </div>

          <details>
            <summary>Security</summary>

            <div class="form-field">
              <label for="securityId">Security id</label>
              <input type="text" id="securityId" value="amf://id#363" />
              <button
                id="readSecurity"
                ?disabled="${!loaded}"
                @click="${this.actionHandler}"
              >
                Read security
              </button>
            </div>
            <div class="form-field">
              <label for="securitySettingsId">Security settings id</label>
              <input type="text" id="securitySettingsId" value="amf://id#205" />
              <button
                id="readSecuritySettings"
                ?disabled="${!loaded}"
                @click="${this.actionHandler}"
              >
                Read security settings
              </button>
            </div>
            <div class="form-field">
              <label for="securityRequirementId">Security requirement id</label>
              <input type="text" id="securityRequirementId" value="" />
              <button
                id="readSecurityRequirement"
                ?disabled="${!loaded}"
                @click="${this.actionHandler}"
              >
                Read security requirements
              </button>
            </div>
          </details>

          <details open>
            <summary>Custom domain properties</summary>

            <div class="form-field">
              <label for="cdpId">Property id</label>
              <input type="text" id="cdpId" value="amf://id#397 " />
              <button
                id="readCustomDomainProperty"
                ?disabled="${!loaded}"
                @click="${this.actionHandler}"
              >
                Read property
              </button>
            </div>

            <div class="form-field">
              <label for="extId">Extension id</label>
              <input type="text" id="extId" value="amf://id#397 " />
              <button
                id="readDomainExtension"
                ?disabled="${!loaded}"
                @click="${this.actionHandler}"
              >
                Read extension
              </button>
            </div>
          </details>

          <details open>
            <summary>Data generation</summary>
            <button
              id="generateRaml"
              ?disabled="${!loaded}"
              @click="${this.actionHandler}"
            >
              Generate RAML
            </button>
            <button
              id="generateGraph"
              ?disabled="${!loaded}"
              @click="${this.actionHandler}"
            >
              Generate Graph
            </button>
          </details>
        </div>

        <div>
          <h4>Latest result</h4>
          <output>${latestOutput}</output>
        </div>
      </section>
    `;
  }
}
const instance = new ComponentPage();
instance.render();
