/* eslint-disable lit-a11y/click-events-have-key-events */
import { html } from 'lit-html';
import { DemoPage } from '@advanced-rest-client/arc-demo-helper';
import { AmfStoreService } from '../worker.index.js';
import { ApiSearch } from '../src/lib/ApiSearch.js';
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
      default: console.warn(`Unhandled action ${button.id}`);
    }
  }

  async listEndpoints() {
    const result = await this.store.listEndpoints();
    this.log(result);
  }

  async listEndpointsWithOperations() {
    const result = await this.store.listEndpointsWithOperations();
    const sorted = ApiSorting.sortEndpointsByPath(result);
    const items = new EndpointsTree().create(sorted); 
    this.log(items);
  }

  async listTypes() {
    const result = await this.store.listTypes(); 
    this.log(result);
  }

  async listSecurity() {
    const result = await this.store.listSecurity(); 
    this.log(result);
  }

  /**
   * @param {any} message 
   */
  log(message) {
    this.latestOutput = JSON.stringify(message, null, 2);
    console.log(message);
  }

  contentTemplate() {
    return html`
      <h2>Amf store proxy (web worker)</h2>
      ${this._demoTemplate()}
    `;
  }

  _demoTemplate() {
    const { initialized, latestOutput, loaded } = this;
    return html`
    <section class="documentation-section">
      <h3>API import demo</h3>
      <fieldset>
        <legend>Import API file</legend>
        <p>In the first dialog select the folder where the API project is located</p>
        <p>With the second dialog select the API main file.</p>
        <button ?disabled="${!initialized}" @click="${this.actionHandler}" id="selectApiDirectory">Select API</button>
      </fieldset>


      <h4>Reading data</h4>
      <div @click="${this.actionHandler}">
        <button id="listEndpoints" ?disabled="${!loaded}">List endpoints</button>
        <button id="listEndpointsWithOperations" ?disabled="${!loaded}">List endpoints & operations</button>
        <button id="listTypes" ?disabled="${!loaded}">List types</button>
        <button id="listSecurity" ?disabled="${!loaded}">List security</button>
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
