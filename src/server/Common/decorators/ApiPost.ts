import { applyDecorators, Post, UseInterceptors } from '@nestjs/common';

import { ApiInterceptor } from '@server/Common/interceptors/api.interceptor';

export const ApiPost = (route = '', hasAuthGuard = true): MethodDecorator => {
  const decorators = [Post(`/api/${route}`), UseInterceptors(ApiInterceptor)];

  if (hasAuthGuard) {
    // decorators.push(UseGuards())
  }

  return applyDecorators(...decorators);
};
