import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ErrorFilter } from '@server/Error/filters/error.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class ErrorModule {}
