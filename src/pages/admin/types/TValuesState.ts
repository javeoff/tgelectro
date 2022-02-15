export type TValue =
  | string
  | File
  | Record<string, unknown>
  | Array<Record<string, unknown>>
  | null;

export type TValuesState = Record<string, TValue>;
