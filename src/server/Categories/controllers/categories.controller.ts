import { Controller } from '@nestjs/common';

import { Page } from '@server/Common/decorators/Page';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';

@Controller()
export class CategoriesController {
  public constructor(private readonly categoriesFetcher: CategoriesFetcher) {}

  @Page('categories1')
  public async categoriesPage(): Promise<unknown> {
    return {
      categories: await this.categoriesFetcher.fetch(),
    };
  }
}
