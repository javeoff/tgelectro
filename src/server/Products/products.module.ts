import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsFetcher } from '@server/Products/services/products.fetcher';
import { Product } from '@server/Products/entities/product.entity';
import { ProductController } from '@server/Products/controllers/product.contoller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsFetcher],
  controllers: [ProductController],
  exports: [ProductsFetcher],
})
export class ProductsModule {}
