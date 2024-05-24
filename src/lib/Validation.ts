export function ensureString(value: unknown): string {
  if (typeof value !== 'string') {
    throw new Error('Expected a string.');
  }
  return value as string;
}

export function ensureStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    throw new Error('Expected an array.');
  }
  const notString = value.some(v => typeof v !== 'string');
  if (notString) {
    throw new Error('Expected an array of strings.');
  }
  return value as string[];
}

export function ensureBoolean(value: unknown): boolean {
  if (typeof value !== 'boolean') {
    throw new Error('Expected a boolean.');
  }
  return value as boolean;
}

export function ensureNumber(value: unknown): number {
  if (typeof value !== 'number') {
    throw new Error('Expected a number.');
  }
  return value as number;
}
