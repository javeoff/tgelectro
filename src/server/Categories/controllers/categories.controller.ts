import { Controller, Param, Query } from '@nestjs/common';

import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';
import { Category } from '@server/Categories/entities/category.entity';
import { ApiGet } from '@server/Common/decorators/ApiGet';
import { ApiRoute } from '@server/Common/enums/ApiRoute';
import { PageName } from '@common/enums/PageName';
import { Page } from '@server/Common/decorators/Page';
import { Feature } from '@common/enums/Feature';
import { siteName } from '@common/utils/constants';
import { FabricatorsFetcher } from '@server/Fabricators/services/fabricators.fetcher';

@Controller()
export class CategoriesController {
  public constructor(
    private readonly categoriesFetcher: CategoriesFetcher,
    private readonly fabricatorsFetcher: FabricatorsFetcher,
  ) {}

  @Page(PageName.CATEGORIES)
  public async categoriesPage(): Promise<unknown> {
    return {
      features: {
        [Feature.COMMON]: {
          pageId: PageName.CATEGORIES,
          categories: await this.categoriesFetcher.fetchParent(),
        },
      },
      title: `${siteName} | Категории`,
    };
  }

  @Page(PageName.CATEGORY)
  public async categoryPage(
    @Param() param: { categoryLink: string },
  ): Promise<unknown> {
    // eslint-disable-next-line no-console
    console.log(param.categoryLink);

    const category = await this.categoriesFetcher.getItemFromLink(
      param.categoryLink,
      ['products.fabricator'],
    );

    const fabricators = await this.fabricatorsFetcher.getCategoryFabricators(
      category.id,
    );

    return {
      category,
      fabricators,
      title: `${siteName} | ${category.name}`,
      features: {
        [Feature.COMMON]: {
          pageId: PageName.CATEGORIES,
          categories: await this.categoriesFetcher.fetchParent(),
        },
      },
    };
  }

  @ApiGet(ApiRoute.CATEGORY)
  public async getCategory(@Query() query: { id: string }): Promise<Category> {
    return this.categoriesFetcher.getItem(Number(query.id));
  }
}
