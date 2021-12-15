import {
  applyDecorators,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import flatten from 'lodash/flatten';

import { getPageInterceptor } from '@server/Common/interceptors/page.interceptor';
import { JwtAuthGuard } from '@server/Auth/guards/jwtAuth.guard';

export type TPage = (
  route?: string,
  hasAuthGuard?: boolean,
  labels?: string[],
) => MethodDecorator;

const getPageDecorators = (
  route = '',
  hasAuthGuard = false,
  labels: string[] | undefined,
): Parameters<typeof applyDecorators> => {
  const routePath = route.replace('index', '/');
  const labelsPath = labels
    ? labels.map((label) => [label, `/api/page/${label}`])
    : [];

  const decorators = [
    Get([routePath, `/api/page/${routePath}`, ...flatten(labelsPath)]),
  ];

  if (hasAuthGuard) {
    decorators.push(UseGuards(JwtAuthGuard));
  }

  return [...decorators, UseInterceptors(getPageInterceptor(route))];
};

export const Page: TPage = (...props) =>
  applyDecorators(...getPageDecorators(...props));
