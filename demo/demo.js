/* eslint-disable lit-a11y/click-events-have-key-events */
import { html } from 'lit-html';
import { DemoPage } from '@advanced-rest-client/arc-demo-helper';
import { AmfStoreService } from '../worker.index.js';
import { ApiSorting } from '../src/ApiSorting.js';
import { EndpointsTree } from '../src/EndpointsTree.js';

class ComponentPage extends DemoPage {
  constructor() {
    super();
    this.initObservableProperties(['loaded', 'initialized', 'latestOutput']);
    this.loaded = false;
    this.initialized = false;
    this.latestOutput = '';
    this.store = new AmfStoreService();
    this.componentName = 'AmfStoreProxy';
    this.actionHandler = this.actionHandler.bind(this);

    this.init();
  }

  async init() {
    await this.store.init();
    this.log('void');
    this.initialized = true;
  }

  async readSecurity() {
    const input = /** @type HTMLInputElement */ (document.getElementById('securityId'));
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store.getSecurityScheme(id);
    this.log(result);
  }

  async readSecuritySettings() {
    const input = /** @type HTMLInputElement */ (document.getElementById('securitySettingsId'));
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store.getParametrizedSecurityScheme(id);
    this.log(result);
  }

  async readSecurityRequirement() {
    const input = /** @type HTMLInputElement */ (document.getElementById('securityRequirementId'));
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store.getSecurityRequirement(id);
    this.log(result);
  }

  /**
   * @param {Event} e 
   */
  async actionHandler(e) {
    const button = /** @type HTMLButtonElement */ (e.target);
    if (typeof this[button.id] === 'function') {
      this[button.id]();
      return;
    }
    switch (button.id) {
      case 'loadApiGraph': this.loadDemoApi(button.dataset.src); break;
      case 'loadEmptyApi': 
        this.latestOutput = await this.store.createWebApi();
        this.loaded = true;
        this.log('void');
        break;
      case 'addEndpoint': 
        {
          const input = /** @type HTMLInputElement */ (document.getElementById('endpointIdPath'));
          const path = input.value.trim();
          if (!path) {
            return;
          }
          const result = await this.store.addEndpoint({ path }); 
          this.log(result);
        }
        break;
      case 'readEndpoint': 
        {
          const input = /** @type HTMLInputElement */ (document.getElementById('endpointIdPath'));
          const path = input.value.trim();
          if (!path) {
            return;
          }
          const result = await this.store.getEndpoint(path); 
          this.log(result);
        }
        break;
      case 'deleteEndpoint':
        {
          const input = /** @type HTMLInputElement */ (document.getElementById('endpointIdPath'));
          const id = input.value.trim();
          if (!id) {
            return;
          }
          await this.store.deleteEndpoint(id);
          this.log('void');
        }
        break;
      case 'deleteOperation':
        {
          const input = /** @type HTMLInputElement */ (document.getElementById('operationId'));
          const id = input.value.trim();
          if (!id) {
            return;
          }
          const endpoint = await this.store.getOperationParent(id);
          const result = await this.store.deleteOperation(id, endpoint.id); 
          this.log(result);
        }
        break;
      case 'addOperation':
        {
          const input = /** @type HTMLInputElement */ (document.getElementById('operationId'));
          const eInput = /** @type HTMLInputElement */ (document.getElementById('operationEndpointIdOrPath'));
          const method = input.value.trim();
          const endpoint = eInput.value.trim();
          if (!method || !endpoint) {
            return;
          }
          const result = await this.store.addOperation(endpoint, { method }); 
          this.log(result);
        }
        break;
      case 'readOperation':
        {
          const input = /** @type HTMLInputElement */ (document.getElementById('operationId'));
          const id = input.value.trim();
          if (!id) {
            return;
          }
          const result = await this.store.getOperation(id); 
          this.log(result);
        }
        break;
      case 'listTypes':
        {
          const result = await this.store.listTypes(); 
          this.log(result);
        }
        break;
      case 'listSecurity':
        {
          const result = await this.store.listSecurity(); 
          this.log(result);
        }
        break;
      case 'listEndpoints':
        {
          const result = await this.store.listEndpoints();
          this.log(result);
        }
        break;
      case 'listEndpointsWithOperations':
        {
          const result = await this.store.listEndpointsWithOperations();
          const sorted = ApiSorting.sortEndpointsByPath(result);
          const items = new EndpointsTree().create(sorted); 
          this.log(items);
        }
        break;
      case 'readType':
        {
          const input = /** @type HTMLInputElement */ (document.getElementById('typeId'));
          const id = input.value.trim();
          if (!id) {
            return;
          }
          const result = await this.store.getType(id); 
          this.log(result);
        }
        break;
      default: console.warn(`Unhandled action ${button.id}`);
    }
  }

  /**
   * @param {any} message 
   */
  log(message) {
    this.latestOutput = JSON.stringify(message, null, 2);
    console.log(message);
  }

  async loadDemoApi(file) {
    this.loaded = false;
    const rsp = await fetch(`./${file}`);
    const model = await rsp.text();
    await this.store.loadGraph(model);
    this.loaded = true;
    this.log('void');
  }

  contentTemplate() {
    return html`
      <h2>Amf store proxy (web worker)</h2>
      ${this._demoTemplate()}
    `;
  }

  _demoTemplate() {
    const { loaded, initialized, latestOutput } = this;
    return html`
    <section class="documentation-section">
      <h3>Store demo</h3>

      <h4>Initialization</h4>
      <div @click="${this.actionHandler}">
        <button id="init">Init</button>
        <button id="loadApiGraph" data-src="demo-api-compact.json" ?disabled="${!initialized}">Load demo API</button>
        <button id="loadApiGraph" data-src="async-api-compact.json" ?disabled="${!initialized}">Load async API</button>
        <button id="loadApiGraph" data-src="google-drive-api.json" ?disabled="${!initialized}">Load Google Drive API</button>
        <button id="loadApiGraph" data-src="streetlights-compact.json" ?disabled="${!initialized}">Streetlights (async) API</button>
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
