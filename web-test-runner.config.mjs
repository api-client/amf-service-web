/** @typedef {import('@web/test-runner').TestRunnerConfig} TestRunnerConfig */

export default /** @type TestRunnerConfig */ ({
  // concurrency: 1,
  testFramework: {
    config: {
      timeout: 10000,
    },
  },
  testsFinishTimeout: 180000,
})
