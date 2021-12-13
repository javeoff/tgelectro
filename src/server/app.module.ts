import { Module } from '@nestjs/common';

import { ConfigModule } from '@server/Config/config.module';
import { AppController } from '@server/app.controllers';
import { ErrorModule } from '@server/Error/error.module';
import { CategoriesModule } from '@server/Categories/categories.module';
import { CommonModule } from '@server/Common/common.module';
import { FabricatorsModule } from '@server/Fabricators/fabricators.module';
import { ProductsModule } from '@server/Products/products.module';
import { FabricatorsFetcher } from '@server/Fabricators/services/fabricators.fetcher';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';

@Module({
  imports: [
    CommonModule,
    ConfigModule,
    ErrorModule,
    CategoriesModule,
    FabricatorsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [FabricatorsFetcher, CategoriesFetcher],
})
export class AppModule {}
