import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (request.url.includes('?api=true')) {
      response.json({});

      return;
    }

    const nextPath = request.url.slice(1);

    if (nextPath.includes('index')) {
      // eslint-disable-next-line no-console
      console.log(nextPath);
      response.render('404');

      return;
    }

    response.render(nextPath);
  }
}
