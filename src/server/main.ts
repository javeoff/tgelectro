import { NestFactory } from '@nestjs/core';

import { AppModule } from '@server/app.module';
import { ErrorFilter } from '@server/Error/filters/error.filter';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ErrorFilter());

  await app.listen(3_000);
};

void bootstrap();
