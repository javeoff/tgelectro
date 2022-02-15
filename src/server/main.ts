import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { AppModule } from '@server/app.module';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters();
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));

  await app.listen(3_000);
};

void bootstrap();
