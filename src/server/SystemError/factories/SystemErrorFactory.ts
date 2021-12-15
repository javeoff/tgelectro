import { Injectable } from '@nestjs/common';
import { AnyObject } from 'immer/dist/types/types-internal';

import { ErrorCode } from '@server/SystemError/enums/ErrorCode';
import { SystemError } from '@server/SystemError/dto/SystemError';

@Injectable()
export class SystemErrorFactory {
  public create(
    errorCode: ErrorCode,
    message = '',
    data: AnyObject = {},
  ): SystemError {
    const systemError = new SystemError(message);

    systemError.systemCode = errorCode;
    systemError.systemAdditionalData = data;

    return systemError;
  }
}
