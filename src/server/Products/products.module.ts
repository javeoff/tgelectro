import { Module } from '@nestjs/common';

import { ProductsFetcher } from '@server/Products/services/products.fetcher';

@Module({
  providers: [ProductsFetcher],
})
export class ProductsModule {}
