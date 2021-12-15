import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { ApiInterceptor } from '@server/Common/interceptors/api.interceptor';
import { ErrorFilter } from '@server/Error/filters/error.filter';
import { ClientRequestRef } from '@server/Common/services/clientRequestRef.service';
import { ClientCookieSetter } from '@server/Common/services/clientCookieSetter.service';
import { CookieInterceptor } from '@server/Common/interceptors/cookie.interceptor';

@Global()
@Module({
  providers: [
    ClientRequestRef,
    ClientCookieSetter,
    ApiInterceptor,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CookieInterceptor,
    },
  ],
  exports: [ApiInterceptor],
})
export class CommonModule {}
