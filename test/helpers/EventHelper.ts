// The event names should be unique across all events in all modules.
const names: string[] = [];

export function ensureUnique(namespace: string, src: Record<string, unknown>) {
  for (const [key, value] of Object.entries(src)) {
    if (typeof value !== 'string') {
      continue;
    }
    if (names.includes(value)) {
      throw new Error(`${namespace}.${key} has duplicated event name ${value}`);
    }
    names.push(value);
  }
}
