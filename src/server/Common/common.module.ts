import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ApiInterceptor } from '@server/Common/interceptors/api.interceptor';
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
      provide: APP_INTERCEPTOR,
      useClass: CookieInterceptor,
    },
  ],
  exports: [ApiInterceptor, ClientRequestRef],
})
export class CommonModule {}
