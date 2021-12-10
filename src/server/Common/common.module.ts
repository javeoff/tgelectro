import { Global, Module } from '@nestjs/common';

import { ApiInterceptor } from '@server/Common/interceptors/api.interceptor';

@Global()
@Module({
  providers: [ApiInterceptor],
  exports: [ApiInterceptor],
})
export class CommonModule {}
