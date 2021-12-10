import { AnyObject } from 'immer/dist/types/types-internal';

export interface IResponse<T extends AnyObject = AnyObject> {
  code: number;
  payload: T;
  message: string;
  error?: Record<string, unknown>;
}
