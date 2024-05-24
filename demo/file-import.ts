import { html, TemplateResult } from 'lit';
import { DemoPage } from './lib/DemoPage.js';
import { AmfStoreService } from '../src/worker.index.js';
import { ApiSearch } from '../src/lib/ApiSearch.js';
import { ApiSorting } from '../src/lib/ApiSorting.js';
import { EndpointsTree } from '../src/lib/EndpointsTree.js';
import { ApiResource } from '../src/types.js';
import { DemoPersistance } from './lib/DemoPersistance.js';

class ComponentPage extends DemoPage {
  loaded: boolean;
  initialized: boolean;
  latestOutput: string;
  store: AmfStoreService;

  constructor() {
    super();
    this.initObservableProperties(['loaded', 'initialized', 'latestOutput']);
    this.loaded = false;
    this.initialized = false;
    this.latestOutput = '';
    const persistance = new DemoPersistance('demo.file');
    this.store = new AmfStoreService(persistance);
    this.componentName = 'AmfStoreProxy';
    this.actionHandler = this.actionHandler.bind(this);

    this.init();
  }

  async init(): Promise<void> {
    await this.store.init();
    this.log('void');
    this.initialized = true;
  }

  async selectApiDirectory(): Promise<void> {
    const dirHandle = await window.showDirectoryPicker();
    if (!dirHandle) {
      return;
    }
    const files: ApiResource[] = [];
    await this.listDirectory(dirHandle, files, '');
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

  async listDirectory(handle: FileSystemDirectoryHandle, result: ApiResource[], parent?: string): Promise<void> {
    for await (const entry of handle.values()) {
      await this.listContent(entry, result, parent);
    }
  }

  async listContent(handle: FileSystemDirectoryHandle | FileSystemFileHandle, result: ApiResource[], parent='/'): Promise<void> {
    if (handle.kind === 'file') {
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

  async actionHandler(e: Event): Promise<void> {
    const button = e.target as HTMLButtonElement;
    if (typeof this[button.id] === 'function') {
      this[button.id]();
      return;
    }
    switch (button.id) {
      default: console.warn(`Unhandled action ${button.id}`);
    }
  }

  async listEndpoints(): Promise<void> {
    const result = await this.store.listEndpoints();
    this.log(result);
  }

  async listEndpointsWithOperations(): Promise<void> {
    const result = await this.store.listEndpointsWithOperations();
    const sorted = ApiSorting.sortEndpointsByPath(result);
    const items = new EndpointsTree().create(sorted); 
    this.log(items);
  }

  async listTypes(): Promise<void> {
    const result = await this.store.listTypes(); 
    this.log(result);
  }

  async listSecurity(): Promise<void> {
    const result = await this.store.listSecurity(); 
    this.log(result);
  }

  log(message: unknown): void {
    this.latestOutput = JSON.stringify(message, null, 2);
    console.log(message);
  }

  contentTemplate(): TemplateResult {
    return html`
      <h2>Amf store proxy (web worker)</h2>
      ${this._demoTemplate()}
    `;
  }

  _demoTemplate(): TemplateResult {
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
