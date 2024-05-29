import type { WorkerMessage } from "../../src/types.js";

self.addEventListener('message', (e: MessageEvent) => {
  const message = e.data as WorkerMessage;
  const { id } = message;
  self.postMessage({
    id,
    result: message,
  });
});
