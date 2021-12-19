import { Module } from '@nestjs/common';

import { AdminController } from '@server/Admin/controllers/admin.controller';
import { FabricatorsModule } from '@server/Fabricators/fabricators.module';
import { TableListFactory } from '@server/Admin/factories/TableListFactory';
import { ProductsModule } from '@server/Products/products.module';
import { CategoriesModule } from '@server/Categories/categories.module';
import { AdminService } from '@server/Admin/services/admin.service';

@Module({
  controllers: [AdminController],
  providers: [TableListFactory, AdminService],
  imports: [FabricatorsModule, ProductsModule, CategoriesModule],
})
export class AdminModule {}
