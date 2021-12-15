import { Injectable } from '@nestjs/common/decorators';
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Scope,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';

import { ClientCookieSetter } from '@server/Common/services/clientCookieSetter.service';

@Injectable({ scope: Scope.REQUEST })
export class CookieInterceptor implements NestInterceptor {
  public constructor(private readonly clientCookieSetter: ClientCookieSetter) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((payload: unknown) => {
        this.clientCookieSetter.set(response);

        return payload;
      }),
    );
  }
}
