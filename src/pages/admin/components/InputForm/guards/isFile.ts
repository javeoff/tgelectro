export const isFile = (value: unknown): value is File =>
  value !== null && typeof value === 'object' && 'name' in value;
