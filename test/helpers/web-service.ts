import type { AmfWorkerStoreInit } from '../../src/types.js';
import { WebWorkerService } from '../../src/worker.index.js';
import { TestPersistance } from './TestPersistance.js';

export function getAmfWorkerLocation(): string {
  return new URL('../../build/workers/AmfWorker.js', import.meta.url).toString();
}

export default function createTestService(opts: AmfWorkerStoreInit = {}): WebWorkerService {
  const persistance = new TestPersistance('id');
  const options: AmfWorkerStoreInit = {
    ... {
      workerLocation: getAmfWorkerLocation(),
    },
    ... opts,
  };
  const result = new WebWorkerService(persistance, options);
  return result;
}
