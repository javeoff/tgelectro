export const isEntity = (value: unknown): value is Record<string, unknown> =>
  (value !== null && typeof value === 'object' && 'id' in value) ||
  value === null;
