import { Controller, Query } from '@nestjs/common';

import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';
import { Category } from '@server/Categories/entities/category.entity';
import { ApiGet } from '@server/Common/decorators/ApiGet';
import { ApiRoute } from '@server/Common/enums/ApiRoute';

@Controller()
export class CategoriesController {
  public constructor(private readonly categoriesFetcher: CategoriesFetcher) {}

  @ApiGet(ApiRoute.CATEGORY)
  public async getCategory(@Query() query: { id: string }): Promise<Category> {
    return this.categoriesFetcher.getItem(Number(query.id));
  }
}
