import { applyDecorators, Get, UseInterceptors } from '@nestjs/common';

import { ApiInterceptor } from '@server/Common/interceptors/api.interceptor';

export const ApiGet = (route = '', hasAuthGuard = true): MethodDecorator => {
  const decorators = [Get(`/api/${route}`), UseInterceptors(ApiInterceptor)];

  if (hasAuthGuard) {
    // decorators.push(UseGuards())
  }

  return applyDecorators(...decorators);
};
