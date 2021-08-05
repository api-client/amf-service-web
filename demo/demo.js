/* eslint-disable lit-a11y/click-events-have-key-events */
import { html } from 'lit-html';
import { DemoPage } from '@advanced-rest-client/arc-demo-helper';
import { AmfStoreService } from '../worker.index.js';
import { ApiSorting } from '../src/ApiSorting.js';
import { EndpointsTree } from '../src/EndpointsTree.js';
import { ApiSearch } from '../src/lib/ApiSearch.js';

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

  async readCustomDomainProperty() {
    const input = /** @type HTMLInputElement */ (document.getElementById('cdpId'));
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store.getCustomDomainProperty(id);
    this.log(result);
  }

  async readDomainExtension() {
    const input = /** @type HTMLInputElement */ (document.getElementById('extId'));
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store.getDomainExtension(id);
    this.log(result);
  }

  async listCustomDomainProperties() {
    const input = /** @type HTMLInputElement */ (document.getElementById('extId'));
    const id = input.value.trim();
    if (!id) {
      return;
    }
    const result = await this.store.listCustomDomainProperties();
    this.log(result);
  }

  async generateRaml() {
    const result = await this.store.generateRaml();
    this.log(result);
  }

  async generateGraph() {
    const result = await this.store.generateGraph();
    this.log(result);
  }

  async getApi() {
    const result = await this.store.getApi();
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
      case 'loadApiGraph': this.loadDemoApi(button.dataset.src, button.dataset.type); break;
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
    if (typeof message === 'object') {
      this.latestOutput = JSON.stringify(message, null, 2);
    } else {
      this.latestOutput = message;
    }
    console.log(message);
  }

  async loadDemoApi(file, type) {
    this.loaded = false;
    const rsp = await fetch(`./${file}`);
    const model = await rsp.text();
    await this.store.loadGraph(model, type);
    this.loaded = true;
    this.log('void');
  }

  async selectApiDirectory() {
    // @ts-ignore
    const dirHandle = await window.showDirectoryPicker();
    if (!dirHandle) {
      return;
    }
    const files = [];
    await this.listDirectory(dirHandle, files, '');
    // @ts-ignore
    const [mainHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'API files',
          accept: {
            'application/json': ['.json'],
            'application/ld+json': ['.jsonld'],
            'application/yaml': ['.raml', '.yaml'],
            'application/raml': ['.raml'],
          }
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
      type: '',
    });
    await this.store.loadApi(files, result.type, result.contentType, mainHandle.name);
    this.loaded = true;
  }

  async listDirectory(handle, result, parent) {
    for await (const entry of handle.values()) {
      await this.listContent(entry, result, parent);
    }
  }

  async listContent(handle, result, parent='/') {
    if (handle.kind === 'file') {
      const file = await handle.getFile();
      const contents = await file.text();
      const fPath = `${parent}${handle.name}`;
      result.push({
        contents,
        path: fPath,
        parent,
        name: handle.name,
      });
    } else {
      await this.listDirectory(handle, result, `${parent}${handle.name}/`);
    }
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
        <button id="loadApiGraph" data-type="RAML 1.0" data-src="demo-api.json" ?disabled="${!initialized}">Load demo API</button>
        <button id="loadApiGraph" data-type="ASYNC 2.0" data-src="async-api.json" ?disabled="${!initialized}">Load async API</button>
        <button id="loadApiGraph" data-type="RAML 1.0"  data-src="google-drive-api.json" ?disabled="${!initialized}">Load Google Drive API</button>
        <button id="loadApiGraph" data-type="ASYNC 2.0" data-src="streetlights.json" ?disabled="${!initialized}">Streetlights (async) API</button>
        <button id="loadApiGraph" data-type="OAS 3.0" data-src="oas-3-api.json" ?disabled="${!initialized}">OAS 3 API</button>
        <button id="loadEmptyApi" ?disabled="${!initialized}">Load empty API</button>
        <button ?disabled="${!initialized}" id="selectApiDirectory">Select API</button>
      </div>

      <h4>Reading data</h4>
      <div @click="${this.actionHandler}">
        <button id="getApi" ?disabled="${!loaded}">Read API</button>
        <button id="listEndpoints" ?disabled="${!loaded}">List endpoints</button>
        <button id="listEndpointsWithOperations" ?disabled="${!loaded}">List endpoints & operations</button>
        <button id="listTypes" ?disabled="${!loaded}">List types</button>
        <button id="listSecurity" ?disabled="${!loaded}">List security</button>
        <button id="listCustomDomainProperties" ?disabled="${!loaded}">List annotations/extensions</button>
      </div>

      <h4>API manipulation</h4>
      <div>
        <h4>Endpoints</h4>
        <div>
          <label for="endpointIdPath">Endpoint path or id</label>
          <input type="text" id="endpointIdPath" value="/annotable"/>
          <button id="addEndpoint" ?disabled="${!loaded}" @click="${this.actionHandler}">Add endpoint</button>
          <button id="readEndpoint" ?disabled="${!loaded}" @click="${this.actionHandler}">Read endpoint</button>
          <button id="deleteEndpoint" ?disabled="${!loaded}" @click="${this.actionHandler}">Delete endpoint</button>
        </div>

        <h4>Operations</h4>
        <div>
          <label for="operationId">Operation id (or method)</label>
          <input type="text" id="operationId" value="get"/>
          <label for="operationEndpointIdOrPath">Endpoint id (or path)</label>
          <input type="text" id="operationEndpointIdOrPath" value="/annotable"/>
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

        <details>
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

        <details open>
          <summary>Custom domain properties</summary>
          
          <div class="form-field">
            <label for="cdpId">Property id</label>
            <input type="text" id="cdpId" value="amf://id#397 "/>
            <button id="readCustomDomainProperty" ?disabled="${!loaded}" @click="${this.actionHandler}">Read property</button>
          </div>

          <div class="form-field">
            <label for="extId">Extension id</label>
            <input type="text" id="extId" value="amf://id#397 "/>
            <button id="readDomainExtension" ?disabled="${!loaded}" @click="${this.actionHandler}">Read extension</button>
          </div>
        </details>

        <details open>
          <summary>Data generation</summary>
          <button id="generateRaml" ?disabled="${!loaded}" @click="${this.actionHandler}">Generate RAML</button>
          <button id="generateGraph" ?disabled="${!loaded}" @click="${this.actionHandler}">Generate Graph</button>
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
