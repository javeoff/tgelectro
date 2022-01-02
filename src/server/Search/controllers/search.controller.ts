import { Controller, Query } from '@nestjs/common';

import { PageName } from '@common/enums/PageName';
import { Page } from '@server/Common/decorators/Page';
import { SearchService } from '@server/Search/services/search.service';
import { Feature } from '@common/enums/Feature';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';

@Controller()
export class SearchController {
  public constructor(
    private readonly searchService: SearchService,
    private readonly categoriesFetcher: CategoriesFetcher,
  ) {}

  @Page(PageName.SEARCH)
  public async searchPage(@Query() query: { text: string }): Promise<unknown> {
    return {
      features: {
        [Feature.COMMON]: {
          pageId: PageName.INDEX,
          categories: await this.categoriesFetcher.fetchParent(),
        },
      },
      searchQuery: query.text,
      products: await this.searchService.searchProducts(query.text),
      categories: await this.searchService.searchCategories(query.text),
    };
  }
}
