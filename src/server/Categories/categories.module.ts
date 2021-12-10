import { Module } from '@nestjs/common';

import { CategoriesController } from '@server/Categories/controllers/categories.controller';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesFetcher],
})
export class CategoriesModule {}
