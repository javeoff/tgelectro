import { HTMLAttributeAnchorTarget } from 'react';

export interface ILink<
  Params extends string = string,
  Query extends string = string,
> {
  params?: Record<Params, string>;
  query?: Record<Query, string>;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  additionalRoute?: string;
  shallow?: boolean;
}
