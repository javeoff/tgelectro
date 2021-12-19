import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from '@server/Categories/controllers/categories.controller';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';
import { Category } from '@server/Categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesFetcher],
  exports: [TypeOrmModule, CategoriesFetcher],
})
export class CategoriesModule {}
