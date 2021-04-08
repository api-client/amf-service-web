/** @typedef {import('../worker.index').WorkerMessage} WorkerMessage */

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', (e) => {
  const message = /** @type WorkerMessage */ (e.data);
  const { id } = message;
  // eslint-disable-next-line no-restricted-globals
  self.postMessage({
    id,
    result: message,
  });
});
