import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from '@server/app.module';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters();
  app.use(cookieParser());

  await app.listen(3_000);
};

void bootstrap();
