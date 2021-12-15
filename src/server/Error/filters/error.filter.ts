import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (request.url.includes('?api=true')) {
      response.json({});

      return;
    }

    if (error instanceof NotFoundException) {
      const nextPath = request.url.slice(1);

      if (nextPath.includes('index')) {
        response.render('404');

        return;
      }

      response.render(nextPath);

      return;
    }

    response.json({
      message: error.message,
    });
  }
}
