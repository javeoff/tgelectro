import { forwardRef, Module } from '@nestjs/common';

import { BreadcrumbsService } from '@server/Breadcrumbs/services/breadcrumbs.service';
// eslint-disable-next-line import/no-cycle
import { CategoriesModule } from '@server/Categories/categories.module';

@Module({
  providers: [BreadcrumbsService],
  exports: [BreadcrumbsService],
  imports: [forwardRef(() => CategoriesModule)],
})
export class BreadcrumbsModule {}
