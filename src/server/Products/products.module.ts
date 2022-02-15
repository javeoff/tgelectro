import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsFetcher } from '@server/Products/services/products.fetcher';
import { Product } from '@server/Products/entities/product.entity';
import { ProductController } from '@server/Products/controllers/product.contoller';
// eslint-disable-next-line import/no-cycle
import { CategoriesModule } from '@server/Categories/categories.module';
import { BreadcrumbsModule } from '@server/Breadcrumbs/breadcrumbs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => CategoriesModule),
    BreadcrumbsModule,
  ],
  providers: [ProductsFetcher],
  controllers: [ProductController],
  exports: [ProductsFetcher],
})
export class ProductsModule {}
