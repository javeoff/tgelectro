import { Controller } from '@nestjs/common';

import { Page } from '@server/Common/decorators/Page';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';

@Controller()
export class CategoriesController {
  public constructor(private readonly categoriesFetcher: CategoriesFetcher) {}

  @Page('categories')
  public categoriesPage(): unknown {
    return {
      categories: this.categoriesFetcher.get(),
    };
  }
}
