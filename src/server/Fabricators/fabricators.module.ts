import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FabricatorsFetcher } from '@server/Fabricators/services/fabricators.fetcher';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { FabricatorController } from '@server/Fabricators/controllers/fabricators.controller';
// eslint-disable-next-line import/no-cycle
import { ProductsModule } from '@server/Products/products.module';
// eslint-disable-next-line import/no-cycle
import { CategoriesModule } from '@server/Categories/categories.module';
import { FabricatorsFactory } from '@server/Fabricators/factories/fabricators.factory';
import { BreadcrumbsModule } from '@server/Breadcrumbs/breadcrumbs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fabricator]),
    forwardRef(() => ProductsModule),
    forwardRef(() => CategoriesModule),
    BreadcrumbsModule,
  ],
  providers: [FabricatorsFetcher, FabricatorsFactory],
  controllers: [FabricatorController],
  exports: [TypeOrmModule, FabricatorsFetcher, FabricatorsFactory],
})
export class FabricatorsModule {}
