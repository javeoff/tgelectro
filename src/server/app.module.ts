import { Module } from '@nestjs/common';

import { ConfigModule } from '@server/Config/config.module';
import { AppController } from '@server/app.controllers';
import { ErrorModule } from '@server/Error/error.module';
import { CategoriesModule } from '@server/Categories/categories.module';
import { CommonModule } from '@server/Common/common.module';
import { FabricatorsModule } from '@server/Fabricators/fabricators.module';
import { ProductsModule } from '@server/Products/products.module';
import { AuthModule } from '@server/Auth/auth.module';
import { UsersModule } from '@server/Users/users.module';
import { SystemErrorModule } from '@server/SystemError/SystemErrorModule';
import { AdminModule } from '@server/Admin/admin.module';
import { SearchModule } from '@server/Search/search.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule,
    ErrorModule,
    CategoriesModule,
    FabricatorsModule,
    ProductsModule,
    AuthModule,
    UsersModule,
    SystemErrorModule,
    AdminModule,
    SearchModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
