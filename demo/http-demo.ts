import { html, TemplateResult } from 'lit';
import { DemoPage } from './lib/DemoPage.js';
import { AmfStoreHttpService } from '../src/worker.index.js';
import { ApiSorting } from '../src/lib/ApiSorting.js';
import { EndpointsTree } from '../src/lib/EndpointsTree.js';
import { DemoPersistance } from './lib/DemoPersistance.js';

class ComponentPage extends DemoPage {
  loaded: boolean;
  initialized: boolean;
  latestOutput: string;
  store?: AmfStoreHttpService;

  constructor() {
    super();
    this.initObservableProperties(['loaded', 'initialized', 'latestOutput']);
    this.loaded = false;
    this.initialized = false;
    this.latestOutput = '';
    this.componentName = 'AmfStoreHttpService';
    this.actionHandler = this.actionHandler.bind(this);
  }

  async init(): Promise<void> {
    await this.store!.init();
    this.log('void');
    this.initialized = true;
  }

  async readSecurity(): Promise<void> {
    const input = document.getElementById("securityId") as HTMLInputElement;
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store!.getSecurityScheme(id);
    this.log(result);
  }

  async readSecuritySettings(): Promise<void> {
    const input = document.getElementById("securitySettingsId") as HTMLInputElement;
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store!.getParametrizedSecurityScheme(id);
    this.log(result);
  }

  async readSecurityRequirement(): Promise<void> {
    const input = document.getElementById("securityRequirementId") as HTMLInputElement;
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store!.getSecurityRequirement(id);
    this.log(result);
  }

  async actionHandler(e: Event): Promise<void> {
    const button = e.target as HTMLButtonElement;
    if (typeof this[button.id] === 'function') {
      this[button.id]();
      return;
    }
    switch (button.id) {
      case 'loadApiGraph': this.loadDemoApi(button.dataset.src!); break;
      case 'loadEmptyApi': 
        this.latestOutput = await this.store!.createWebApi();
        this.loaded = true;
        this.log('void');
        break;
      case 'addEndpoint': 
        {
          const input = document.getElementById("endpointIdPath") as HTMLInputElement;
          const path = input.value.trim();
          if (!path) {
            return;
          }
          const result = await this.store!.addEndpoint({ path }); 
          this.log(result);
        }
        break;
      case 'readEndpoint': 
        {
          const input = document.getElementById("endpointIdPath") as HTMLInputElement;
          const path = input.value.trim();
          if (!path) {
            return;
          }
          const result = await this.store!.getEndpoint(path); 
          this.log(result);
        }
        break;
      case 'deleteEndpoint':
        {
          const input = document.getElementById("endpointIdPath") as HTMLInputElement;
          const id = input.value.trim();
          if (!id) {
            return;
          }
          await this.store!.deleteEndpoint(id);
          this.log('void');
        }
        break;
      case 'deleteOperation':
        {
          const input = document.getElementById("operationId") as HTMLInputElement;
          const id = input.value.trim();
          if (!id) {
            return;
          }
          const endpoint = await this.store!.getOperationParent(id);
          const result = await this.store!.deleteOperation(id, endpoint!.id); 
          this.log(result);
        }
        break;
      case 'addOperation':
        {
          const input = document.getElementById("operationId") as HTMLInputElement;
          const eInput = document.getElementById("operationEndpointIdOrPath") as HTMLInputElement;
          const method = input.value.trim();
          const endpoint = eInput.value.trim();
          if (!method || !endpoint) {
            return;
          }
          const result = await this.store!.addOperation(endpoint, { method }); 
          this.log(result);
        }
        break;
      case 'readOperation':
        {
          const input = document.getElementById("operationId") as HTMLInputElement;
          const id = input.value.trim();
          if (!id) {
            return;
          }
          const result = await this.store!.getOperation(id); 
          this.log(result);
        }
        break;
      case 'listTypes':
        {
          const result = await this.store!.listTypes(); 
          this.log(result);
        }
        break;
      case 'listSecurity':
        {
          const result = await this.store!.listSecurity(); 
          this.log(result);
        }
        break;
      case 'listEndpoints':
        {
          const result = await this.store!.listEndpoints();
          this.log(result);
        }
        break;
      case 'listEndpointsWithOperations':
        {
          const result = await this.store!.listEndpointsWithOperations();
          const sorted = ApiSorting.sortEndpointsByPath(result);
          const items = new EndpointsTree().create(sorted); 
          this.log(items);
        }
        break;
      case 'readType':
        {
          const input = document.getElementById("typeId") as HTMLInputElement;
          const id = input.value.trim();
          if (!id) {
            return;
          }
          const result = await this.store!.getType(id); 
          this.log(result);
        }
        break;
      default: console.warn(`Unhandled action ${button.id}`);
    }
  }

  log(message: unknown): void {
    this.latestOutput = JSON.stringify(message, null, 2);
    console.log(message);
  }

  async loadDemoApi(file: string): Promise<void> {
    this.loaded = false;
    const rsp = await fetch(`./${file}`);
    const model = await rsp.text();
    await this.store!.loadGraph(model);
    this.loaded = true;
    this.log('void');
  }

  _connectHandler(e: Event): void {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const url = form.elements.namedItem('url') as HTMLInputElement;
    const baseUri = url.value;
    if (!baseUri) {
      return;
    }
    const persistance = new DemoPersistance('demo.http');
    this.store = new AmfStoreHttpService(persistance, {
      baseUri,
    });
    this.init();
  }

  contentTemplate(): TemplateResult {
    return html`
      <h2>Amf store proxy (HTTP server)</h2>
      ${this._baseUriTemplate()}
      ${this._demoTemplate()}
    `;
  }

  _baseUriTemplate(): TemplateResult {
    return html`
    <section class="documentation-section">
      <h3>API base URI</h3>
      <form @submit="${this._connectHandler}">
        <fieldset>
          <legend>Server configuration</legend>
          <input type="url" name="url"/>
          <input type="submit" value="Connect"/>
        </fieldset>
      </form>
    </section>
    `;
  }

  _demoTemplate(): TemplateResult {
    const { loaded, initialized, latestOutput } = this;
    return html`
    <section class="documentation-section">
      <h3>Store demo</h3>

      <h4>Initialization</h4>
      <div @click="${this.actionHandler}">
        <button id="loadApiGraph" data-src="demo-api.json" ?disabled="${!initialized}">Load demo API</button>
        <button id="loadApiGraph" data-src="async-api.json" ?disabled="${!initialized}">Load async API</button>
        <button id="loadApiGraph" data-src="google-drive-api.json" ?disabled="${!initialized}">Load Google Drive API</button>
        <button id="loadApiGraph" data-src="streetlights.json" ?disabled="${!initialized}">Streetlights (async) API</button>
        <button id="loadApiGraph" data-src="oas-3-api.json" ?disabled="${!initialized}">OAS 3 API</button>
        <button id="loadEmptyApi" ?disabled="${!initialized}">Load empty API</button>
      </div>

      <h4>Reading data</h4>
      <div @click="${this.actionHandler}">
        <button id="listEndpoints" ?disabled="${!loaded}">List endpoints</button>
        <button id="listEndpointsWithOperations" ?disabled="${!loaded}">List endpoints & operations</button>
        <button id="listTypes" ?disabled="${!loaded}">List types</button>
        <button id="listSecurity" ?disabled="${!loaded}">List security</button>
      </div>

      <h4>API manipulation</h4>
      <div>
        <h4>Endpoints</h4>
        <div>
          <label for="endpointIdPath">Endpoint path or id</label>
          <input type="text" id="endpointIdPath" value="/demo-endpoint"/>
          <button id="addEndpoint" ?disabled="${!loaded}" @click="${this.actionHandler}">Add endpoint</button>
          <button id="readEndpoint" ?disabled="${!loaded}" @click="${this.actionHandler}">Read endpoint</button>
          <button id="deleteEndpoint" ?disabled="${!loaded}" @click="${this.actionHandler}">Delete endpoint</button>
        </div>

        <h4>Operations</h4>
        <div>
          <label for="operationId">Operation id (or method)</label>
          <input type="text" id="operationId" value="get"/>
          <label for="operationEndpointIdOrPath">Endpoint id (or path)</label>
          <input type="text" id="operationEndpointIdOrPath" value=""/>
          <button id="addOperation" ?disabled="${!loaded}" @click="${this.actionHandler}">Add operation (needs endpoint and operation)</button>
          <button id="readOperation" ?disabled="${!loaded}" @click="${this.actionHandler}">Read operation</button>
          <button id="deleteOperation" ?disabled="${!loaded}" @click="${this.actionHandler}">Delete operation</button>
        </div>

        <h4>Types</h4>
        <div>
          <label for="typeId">Type id</label>
          <input type="text" id="typeId" value=""/>
          <button id="readType" ?disabled="${!loaded}" @click="${this.actionHandler}">Read type</button>
        </div>

        <details open>
          <summary>Security</summary>
          
          <div class="form-field">
            <label for="securityId">Security id</label>
            <input type="text" id="securityId" value="amf://id#363"/>
            <button id="readSecurity" ?disabled="${!loaded}" @click="${this.actionHandler}">Read security</button>
          </div>
          <div class="form-field">
            <label for="securitySettingsId">Security settings id</label>
            <input type="text" id="securitySettingsId" value="amf://id#205"/>
            <button id="readSecuritySettings" ?disabled="${!loaded}" @click="${this.actionHandler}">Read security settings</button>
          </div>
          <div class="form-field">
            <label for="securityRequirementId">Security requirement id</label>
            <input type="text" id="securityRequirementId" value=""/>
            <button id="readSecurityRequirement" ?disabled="${!loaded}" @click="${this.actionHandler}">Read security requirements</button>
          </div>
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
