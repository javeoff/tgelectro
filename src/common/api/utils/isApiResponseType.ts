import { AnyObject } from 'immer/dist/types/types-internal';

import { IResponse } from '@common/api/types/IResponse';

export const isApiResponseType = <Response extends AnyObject>(
  response: AnyObject,
): response is IResponse<Response> =>
  response &&
  Number.isInteger(response.code) &&
  typeof response.payload === 'object' &&
  (response.location === undefined || typeof response.location === 'string');
