import { Module } from '@nestjs/common';

import { SearchController } from '@server/Search/controllers/search.controller';
import { CategoriesModule } from '@server/Categories/categories.module';
import { ProductsModule } from '@server/Products/products.module';
import { SearchService } from '@server/Search/services/search.service';

@Module({
  providers: [SearchService],
  controllers: [SearchController],
  imports: [CategoriesModule, ProductsModule],
})
export class SearchModule {}
