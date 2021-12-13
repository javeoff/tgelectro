import { AnyObject } from 'immer/dist/types/types-internal';

import { isApiResponseType } from '@common/api/utils/isApiResponseType';
import { ApiResponse } from '@common/api/ApiResponse';
import { IResponse } from '@common/api/types/IResponse';

export const transformResponse = <Response extends AnyObject>(
  data: unknown,
): IResponse<Response> => {
  if (!data || typeof data !== 'string') {
    throw new TypeError(
      `Сервер вернул невалидные данные ${JSON.stringify(data)}`,
    );
  }

  const parsedData = JSON.parse(data);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!isApiResponseType<Response>(parsedData)) {
    throw new TypeError(
      `Сервер вернул невалидные данные ${JSON.stringify(data)}`,
    );
  }

  return new ApiResponse(parsedData);
};
