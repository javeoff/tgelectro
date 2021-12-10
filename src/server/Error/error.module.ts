import { Module } from '@nestjs/common';

import { ErrorFilter } from '@server/Error/filters/error.filter';

@Module({
  providers: [ErrorFilter],
})
export class ErrorModule {}
