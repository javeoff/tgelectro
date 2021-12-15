import { AnyObject } from 'immer/dist/types/types-internal';

import { ErrorCode } from '@server/SystemError/enums/ErrorCode';

export class SystemError<Data extends AnyObject = AnyObject> extends Error {
  public systemCode!: ErrorCode;

  public systemAdditionalData!: Data;

  public constructor(public readonly message: string = '') {
    super(message);

    this.name = 'SystemError';
  }
}
