/** @typedef {import('@web/test-runner').TestRunnerConfig} TestRunnerConfig */

const filteredLogs = ["Running in dev mode", "Lit is in dev mode"];

export default /** @type TestRunnerConfig */ ({
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ["browser", "production"],
  },

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
