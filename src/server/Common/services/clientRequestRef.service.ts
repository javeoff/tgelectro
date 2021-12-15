import { Scope } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { CookieOptions } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ClientRequestRef {
  public readonly responseCookie: Record<
    string,
    { value: string; options?: CookieOptions }
  > = {};

  public setCookie(name: string, value: string, options?: CookieOptions): void {
    this.responseCookie[name] = { value, options };
  }
}
