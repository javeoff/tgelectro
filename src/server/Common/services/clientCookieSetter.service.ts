import { Injectable } from '@nestjs/common/decorators';
import { Response } from 'express';
import { Scope } from '@nestjs/common';

import { ClientRequestRef } from '@server/Common/services/clientRequestRef.service';

@Injectable({ scope: Scope.REQUEST })
export class ClientCookieSetter {
  public constructor(private readonly clientRequestRef: ClientRequestRef) {}

  public set(response: Response): void {
    // eslint-disable-next-line no-console
    console.log(this.clientRequestRef.responseCookie);

    Object.entries(this.clientRequestRef.responseCookie).forEach(
      ([name, { value, options = {} }]) => {
        response.cookie(name, value, options);
      },
    );
  }
}
