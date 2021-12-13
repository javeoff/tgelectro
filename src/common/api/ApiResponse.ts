import { AnyObject } from 'immer/dist/types/types-internal';
import { EmptyObject } from 'redux';

import { IResponse } from '@common/api/types/IResponse';

export class ApiResponse<T extends AnyObject = EmptyObject>
  implements IResponse
{
  /**
   * Код ответа или ошибки.
   */
  public code: number;

  /**
   * Данные для отрисовки страниц и фич.
   */
  public payload: T;

  public message: string;

  /**
   * Объект с ошибкой.
   */
  public error?: Record<string, unknown>;

  public constructor(data: IResponse<T>) {
    this.code = data.code;
    this.payload = data.payload;
    this.error = data.error;
    this.message = data.message;
  }
}
