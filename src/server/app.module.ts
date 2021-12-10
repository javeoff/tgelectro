import { Module } from '@nestjs/common';

import { ConfigModule } from '@server/Config/config.module';
import { AppController } from '@server/app.controllers';
import { ErrorModule } from '@server/Error/error.module';
import { CategoriesModule } from '@server/Categories/categories.module';
import { CommonModule } from '@server/Common/common.module';

@Module({
  imports: [CommonModule, ConfigModule, ErrorModule, CategoriesModule],
  controllers: [AppController],
})
export class AppModule {}
