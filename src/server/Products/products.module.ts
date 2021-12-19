import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsFetcher } from '@server/Products/services/products.fetcher';
import { Product } from '@server/Products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsFetcher],
  exports: [ProductsFetcher],
})
export class ProductsModule {}
