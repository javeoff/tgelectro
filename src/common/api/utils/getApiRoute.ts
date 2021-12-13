import qs from 'qs';

import { API_PREFIX } from '@common/utils/constants';

export interface IApiRouteParams<
  Params extends string = string,
  Query extends string = string,
> {
  params?: Record<Params, string>;
  query?: Record<Query, string>;
}

export const getApiRoute = (
  route: string,
  { query, params = {} }: IApiRouteParams = {},
): string => {
  let formattedRoute = `${API_PREFIX}/${route}`;

  // eslint-disable-next-line no-restricted-syntax
  for (const paramKey of Object.keys(params)) {
    formattedRoute = formattedRoute.replace(`:${paramKey}`, params[paramKey]);
  }

  if (query) {
    formattedRoute = `${formattedRoute}?${qs.stringify(query)}`;
  }

  return formattedRoute;
};
