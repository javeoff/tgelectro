import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from '@server/Categories/controllers/categories.controller';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';
import { Category } from '@server/Categories/entities/category.entity';
// eslint-disable-next-line import/no-cycle
import { ProductsModule } from '@server/Products/products.module';
// eslint-disable-next-line import/no-cycle
import { FabricatorsModule } from '@server/Fabricators/fabricators.module';
import { CategoriesFactory } from '@server/Categories/factories/categories.factory';
import { BreadcrumbsModule } from '@server/Breadcrumbs/breadcrumbs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    forwardRef(() => ProductsModule),
    forwardRef(() => FabricatorsModule),
    BreadcrumbsModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesFetcher, CategoriesFactory],
  exports: [TypeOrmModule, CategoriesFetcher, CategoriesFactory],
})
export class CategoriesModule {}
