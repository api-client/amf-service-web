/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { esbuildPlugin } from '@web/dev-server-esbuild';

/** @typedef {import('@web/test-runner').TestRunnerConfig} TestRunnerConfig */

const filteredLogs = ["Running in dev mode", "Lit is in dev mode"];

export default /** @type TestRunnerConfig */ ({
  nodeResolve: true,
  files: [
    'test/**/*.browser.test.ts',
    // 'test/store/ApiExample.browser.test.ts',
    // 'test/tree-builder/EndpointsTree.browser.test.ts',
  ],

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (
        typeof arg === "string" &&
        filteredLogs.some((l) => arg.includes(l))
      ) {
        return false;
      }
    }
    return true;
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  /** Amount of browsers to run concurrently */
  concurrentBrowsers: 3,

  // plugins: [esbuildPlugin({ ts: true, tsconfig: "./tsconfig.json" })],
  plugins: [
    esbuildPlugin({ ts: true, js: true }),
  ],

  /** Amount of test files per browser to test concurrently */
  // concurrency: 10,

  /** Browsers to run tests on */
  // browsers: [
  //   playwrightLauncher({ product: 'chromium' }),
  //   playwrightLauncher({ product: 'firefox' }),
  //   playwrightLauncher({ product: 'webkit' }),
  // ],

  testFramework: {
    config: {
      timeout: 100000,
    },
  },
  testsFinishTimeout: 240000,
});
