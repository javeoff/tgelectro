import { AnyObject } from 'immer/dist/types/types-internal';
import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

import { getApiRoute } from '@common/api/utils/getApiRoute';
import { ILink } from '@common/api/types/ILink';
import { ApiResponse } from '@common/api/ApiResponse';
import { transformResponse } from '@common/api/utils/transformResponse';

export interface IAxiosRequestConfig
  extends Omit<AxiosRequestConfig, 'params'>,
    Omit<ILink, 'page' | 'href'> {}

export const apiAxiosInstance = Axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  transformResponse,
});

export abstract class ApiServiceBase {
  private readonly axios: AxiosInstance = apiAxiosInstance;

  private static async response<Response extends AnyObject>(
    promise: AxiosPromise<ApiResponse<Response>>,
  ): Promise<Response> {
    const response = await promise;

    return response.data.payload;
  }

  protected get<Response extends AnyObject>(
    url: string,
    { params, query, ...config }: IAxiosRequestConfig = {},
  ): Promise<Response> {
    return ApiServiceBase.response<Response>(
      this.axios.get(getApiRoute(url, { params, query }), config),
    );
  }

  protected post<
    Request extends AnyObject,
    Response extends AnyObject = AnyObject,
  >(
    url: string,
    data?: Request,
    { params, query, ...config }: IAxiosRequestConfig = {},
  ): Promise<Response> {
    return ApiServiceBase.response<Response>(
      this.axios.post(getApiRoute(url, { params, query }), data, config),
    );
  }

  protected put<
    Request extends AnyObject,
    Response extends AnyObject = AnyObject,
  >(
    url: string,
    data?: Request,
    { params, query, ...config }: IAxiosRequestConfig = {},
  ): Promise<Response> {
    return ApiServiceBase.response<Response>(
      this.axios.put(getApiRoute(url, { params, query }), data, config),
    );
  }

  protected patch<
    Request extends AnyObject,
    Response extends AnyObject = AnyObject,
  >(
    url: string,
    data?: Request,
    { params, query, ...config }: IAxiosRequestConfig = {},
  ): Promise<Response> {
    return ApiServiceBase.response<Response>(
      this.axios.patch(getApiRoute(url, { params, query }), data, config),
    );
  }

  protected delete<Response extends AnyObject = AnyObject>(
    url: string,
    { params, query, ...config }: IAxiosRequestConfig = {},
  ): Promise<Response> {
    return ApiServiceBase.response<Response>(
      this.axios.delete(getApiRoute(url, { params, query }), config),
    );
  }
}
