/* eslint-disable lit-a11y/click-events-have-key-events */
import { html } from 'lit-html';
import { DemoPage } from '@advanced-rest-client/arc-demo-helper';
import { AmfStoreService } from '../worker.index.js';
import { ApiSorting } from '../src/ApiSorting.js';
import { EndpointsTree } from '../src/EndpointsTree.js';

class ComponentPage extends DemoPage {
  constructor() {
    super();
    this.initObservableProperties(['loaded', 'initialized']);
    this.loaded = false;
    this.initialized = false;
    this.store = new AmfStoreService();
    this.componentName = 'AmfStoreProxy';
    this.actionHandler = this.actionHandler.bind(this);
  }

  /**
   * @param {Event} e 
   */
  async actionHandler(e) {
    const button = /** @type HTMLButtonElement */ (e.target);
    switch (button.id) {
      case 'init': 
        await this.store.init(); 
        this.initialized = true;
        break;
      case 'loadApiGraph': this.loadDemoApi(button.dataset.src); break;
      case 'loadEmptyApi': 
        await this.store.createWebApi();
        this.loaded = true;
        break;
      case 'addEndpoint': this.store.addEndpoint({ path: '/demo-endpoint' }); break;
      case 'readOperation':
        {
          const result = await this.store.getOperation('get', '/people'); 
          console.log(result);
        }
        break;
      case 'listTypes':
        {
          const result = await this.store.listTypes(); 
          console.log(result);
        }
        break;
      case 'listSecurity':
        {
          const result = await this.store.listSecurity(); 
          console.log(result);
        }
        break;
      case 'listEndpointsWithOperations':
        {
          const result = await this.store.listEndpointsWithOperations();
          const sorted = ApiSorting.sortEndpointsByPath(result);
          const items = new EndpointsTree().create(sorted); 
          console.log(items);
        }
        break;
      default: console.warn(`Unhandled action ${button.id}`);
    }
  }

  async loadDemoApi(file) {
    this.loaded = false;
    const rsp = await fetch(`./${file}`);
    const model = await rsp.text();
    await this.store.loadGraph(model);
    this.loaded = true;
  }

  contentTemplate() {
    return html`
      <h2>Amf store proxy (web worker)</h2>
      ${this._demoTemplate()}
    `;
  }

  _demoTemplate() {
    const { loaded, initialized } = this;
    return html`
    <section class="documentation-section">
      <h3>Store demo</h3>
      <div id="actions" @click="${this.actionHandler}">
        <div>
          <button id="init">Init</button>
          <button id="loadApiGraph" data-src="demo-api-compact.json" ?disabled="${!initialized}">Load demo API</button>
          <button id="loadApiGraph" data-src="async-api-compact.json" ?disabled="${!initialized}">Load async API</button>
          <button id="loadApiGraph" data-src="google-drive-api.json" ?disabled="${!initialized}">Load Google Drive API</button>
          <button id="loadApiGraph" data-src="streetlights-compact.json" ?disabled="${!initialized}">Streetlights (async) API</button>
          <button id="loadEmptyApi" ?disabled="${!initialized}">Load empty API</button>
        </div>

        <button id="addEndpoint" ?disabled="${!loaded}">Add API endpoint</button>
        <button id="readOperation" ?disabled="${!loaded}">Read operation</button>
        <button id="listTypes" ?disabled="${!loaded}">List types</button>
        <button id="listSecurity" ?disabled="${!loaded}">List security</button>
        <button id="listEndpointsWithOperations" ?disabled="${!loaded}">List endpoints & operations</button>
      </div>
    </section>
    `;
  }
}
const instance = new ComponentPage();
instance.render();
