import { AnyObject } from 'immer/dist/types/types-internal';

export interface IBaseFeatureState<State = AnyObject> {
  state: State;
}
