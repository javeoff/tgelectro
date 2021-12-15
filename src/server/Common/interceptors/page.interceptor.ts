// eslint-disable-next-line max-classes-per-file
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  mixin,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';
import { AnyObject } from 'immer/dist/types/types-internal';

import { ApiInterceptor } from './api.interceptor';

@Injectable()
abstract class PageInterceptor implements NestInterceptor {
  protected abstract readonly route: string;

  public constructor(
    private readonly formatApiResponseInterceptor: ApiInterceptor,
  ) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    const isApi = request.url.includes('/api');

    if (isApi) {
      return this.formatApiResponseInterceptor.intercept(context, next);
    }

    return next.handle().pipe(
      map(async (payload) => {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await response.render(this.route, payload as AnyObject);
        await new Promise<void>((resolve) => process.nextTick(resolve));
      }),
    );
  }
}

export const getPageInterceptor = (route: string): Type =>
  mixin(
    class extends PageInterceptor {
      protected readonly route = route;
    },
  );
