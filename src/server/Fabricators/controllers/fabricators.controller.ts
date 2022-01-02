import { Controller, Param, Query } from '@nestjs/common';

import { ApiGet } from '@server/Common/decorators/ApiGet';
import { ApiRoute } from '@server/Common/enums/ApiRoute';
import { FabricatorsFetcher } from '@server/Fabricators/services/fabricators.fetcher';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { PageName } from '@common/enums/PageName';
import { Page } from '@server/Common/decorators/Page';
import { siteName } from '@common/utils/constants';
import { Feature } from '@common/enums/Feature';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';
import { FabricatorsFactory } from '@server/Fabricators/factories/fabricators.factory';
import { CategoriesFactory } from '@server/Categories/factories/categories.factory';

@Controller()
export class FabricatorController {
  public constructor(
    private readonly categoriesFetcher: CategoriesFetcher,
    private readonly fabricatorsFetcher: FabricatorsFetcher,
    private readonly fabricatorsFactory: FabricatorsFactory,
    private readonly categoriesFactory: CategoriesFactory,
  ) {}

  @ApiGet(ApiRoute.FABRICATOR)
  public async getFabricator(
    @Query() query: { id: string },
  ): Promise<Fabricator> {
    return this.fabricatorsFetcher.getItem(Number(query.id));
  }

  @Page(PageName.FABRICATOR)
  public async fabricatorPage(
    @Param() param: { fabricatorLink: string },
  ): Promise<unknown> {
    const fabricator = this.fabricatorsFactory.getFabricatorWithLink(
      await this.fabricatorsFetcher.getItemFromLink(param.fabricatorLink, [
        'products.fabricator',
        'products.category',
      ]),
    );

    const categories = await this.categoriesFetcher.getFabricatorCategories(
      fabricator.id,
    );

    return {
      fabricator,
      categories,
      title: `${siteName} | ${fabricator.name}`,
      features: {
        [Feature.COMMON]: {
          pageId: PageName.INDEX,
          categories: await this.categoriesFetcher.fetchParent(),
        },
      },
    };
  }

  @Page(PageName.FABRICATOR_CATEGORY)
  public async fabricatorCategoryPage(
    @Param() param: { fabricatorLink: string; '0': string },
  ): Promise<unknown> {
    const params = param['0'].split('/');
    const currentCategory = params[params.length - 1];

    const category = this.categoriesFactory.getCategoryWithLink(
      await this.categoriesFetcher.getItemFromLink(currentCategory, [
        'products.fabricator',
        'products.category',
      ]),
    );

    const childrenCategories = await this.categoriesFetcher.getCategoryChildren(
      category,
      [],
    );

    const products = this.categoriesFetcher.getCategoriesProducts([
      ...childrenCategories,
      category,
    ]);

    return {
      category,
      products,
      params,
      categories: childrenCategories,
    };
  }
}
