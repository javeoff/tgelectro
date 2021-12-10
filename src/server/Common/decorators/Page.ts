import { applyDecorators, Get, UseInterceptors } from '@nestjs/common';

import { getPageInterceptor } from '@server/Common/interceptors/page.interceptor';

export type TPage = (route?: string, hasAuthGuard?: boolean) => MethodDecorator;

const getPageDecorators = (
  route = '',
  hasAuthGuard = true,
): Parameters<typeof applyDecorators> => {
  const decorators = [Get(route)];

  if (hasAuthGuard) {
    // decorators.push(UseGuards())
  }

  return [...decorators, UseInterceptors(getPageInterceptor(route))];
};

export const Page: TPage = (...props) =>
  applyDecorators(...getPageDecorators(...props));
