import { html, render, TemplateResult } from "lit";
import "./SharedStyles.js";

/**
 * Base class for ARC components demo page.
 *
 * ## Usage
 *
 * ```javascript
 * import { html, render } from 'lit-html';
 * import { DemoPage } from '@advanced-rest-client/arc-demo-helper';
 *
 * class ComponentDemo extends DemoPage {
 *  contentTemplate() {
 *    return html`
 *      return html`<my-component></my-component>`;
 *    `;
 *  }
 * }
 * const instance = new ComponentDemo();
 * instance.render();
 * ```
 *
 * ## Working with styles.
 *
 * Styles are set on `.styled` element. Add any component related styles to this
 * selected as the user can choose to disable any styling from the header options.
 * In this case the class `styled` is removed from the body and the user should see
 * completely un-styled component.
 *
 * Dark theme should be supported in the demo page. Put styles related to dark theme
 * under `.styled.dark` selector. When the user chooses this option it renders content
 * in dark theme.
 */
export class DemoPage extends EventTarget {
  componentName: string;
  firstRendered: boolean;

  _darkThemeActive = false;
  _rendering = false;

  constructor() {
    super();
    // this._darkThemeHandler = this._darkThemeHandler.bind(this);
    // this._stylesHandler = this._stylesHandler.bind(this);
    // this._toggleMainOption = this._toggleMainOption.bind(this);
    // this._demoStateHandler = this._demoStateHandler.bind(this);
    this._mediaQueryHandler = this._mediaQueryHandler.bind(this);

    this.initObservableProperties([
      "componentName",
    ]);

    /**
     * Component name rendered in the header section.
     * @type {string}
     */
    this.componentName = "";

    /**
     * Determines whether the initial render had run and the `firstRender()`
     * function was called.
     *
     * @type {boolean}
     * @default false
     */
    this.firstRendered = false;

    /**
     * Whether or not the dark theme is active
     * @default false
     */
    this.darkThemeActive = false;

    document.body.classList.add("styled");

    this.initMediaQueries();
  }

  

  get darkThemeActive(): boolean {
    return this._darkThemeActive;
  }

  set darkThemeActive(value: boolean) {
    if (this._darkThemeActive === value || !document.body) {
      return;
    }
    this._darkThemeActive = value;
    if (value) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    this.render();
  }

  /**
   * Helper function to be overridden by child classes. It is called when the view
   * is rendered for the first time.
   */
  firstRender(): void {}

  /**
   * Creates setters and getters to properties defined in the passed list of properties.
   * Property setter will trigger render function.
   *
   * @param props List of properties to initialize.
   */
  initObservableProperties(props: string[]): void {
    props.forEach((item) => {
      Object.defineProperty(this, item, {
        get() {
          return this[`_${item}`];
        },
        set(newValue) {
          this._setObservableProperty(item, newValue);
        },
        enumerable: true,
        configurable: true,
      });
    });
  }

  /**
   * Initializes media queries for dark system theme.
   */
  initMediaQueries(): void {
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    if (matcher.matches) {
      this.darkThemeActive = true;
    }
    matcher.addEventListener("change", this._mediaQueryHandler);
  }

  _setObservableProperty(prop: string, value: unknown): void {
    const key = `_${prop}`;
    if (this[key] === value) {
      return;
    }
    this[key] = value;
    this.render();
  }

  _mediaQueryHandler(e: MediaQueryListEvent): void {
    this.darkThemeActive = e.matches;
  }

  /**
   * Call this on the top of the `render()` method to render demo navigation
   * @return HTML template for demo header
   */
  headerTemplate(): TemplateResult {
    const { componentName } = this;
    return html` <header>
      ${componentName ? html`<h1 class="api-title">${componentName}</h1>` : ""}
    </header>`;
  }

  /**
   * Abstract method. When not overriding `render()` method you can use
   * this function to render content inside the standard API components layout.
   *
   * ```
   * contentTemplate() {
   *  return html`<p>Demo content</p>`;
   * }
   * ```
   */
  contentTemplate(): TemplateResult {
    return html``;
  }

  /**
   * The page render function. Usually you don't need to use it.
   * It renders the header template, main section, and the content.
   *
   * @return {TemplateResult}
   */
  pageTemplate(): TemplateResult {
    return html` ${this.headerTemplate()}
      <section role="main" class="vertical-section-container centered main">
        ${this.contentTemplate()}
      </section>`;
  }

  /**
   * The main render function. Sub classes should not override this method.
   * Override `_render()` instead.
   *
   * The function calls `_render()` in a timeout so it is safe to call this
   * multiple time in the same event loop.
   */
  render(): void {
    if (this._rendering) {
      return;
    }
    this._rendering = true;
    setTimeout(() => {
      this._rendering = false;
      this._render();
    });
  }

  _render(): void {
    if (!this.firstRendered) {
      this.firstRendered = true;
      setTimeout(() => this.firstRender());
    }
    render(
      this.pageTemplate(),
      document.querySelector("#demo") as HTMLElement,
      {
        // eventContext: this,
        host: this,
      }
    );
  }
}
