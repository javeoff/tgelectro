import { Controller, Param, Query } from '@nestjs/common';
import uniqBy from 'lodash/uniqBy';
import countBy from 'lodash/countBy';

import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';
import { Category } from '@server/Categories/entities/category.entity';
import { ApiGet } from '@server/Common/decorators/ApiGet';
import { PageName } from '@common/enums/PageName';
import { Page } from '@server/Common/decorators/Page';
import { Feature } from '@common/enums/Feature';
import { siteName } from '@common/utils/constants';
import { FabricatorsFetcher } from '@server/Fabricators/services/fabricators.fetcher';
import { ProductsFetcher } from '@server/Products/services/products.fetcher';
import { FabricatorsFactory } from '@server/Fabricators/factories/fabricators.factory';
import { ApiCategoriesRoute } from '@server/Categories/enums/ApiCategoriesRoute';
import { BreadcrumbsService } from '@server/Breadcrumbs/services/breadcrumbs.service';

@Controller()
export class CategoriesController {
  public constructor(
    private readonly categoriesFetcher: CategoriesFetcher,
    private readonly fabricatorsFetcher: FabricatorsFetcher,
    private readonly productsFetcher: ProductsFetcher,
    private readonly fabricatorsFactory: FabricatorsFactory,
    private readonly breadcrumbsService: BreadcrumbsService,
  ) {}

  @ApiGet(ApiCategoriesRoute.CATEGORY)
  public async getCategory(@Query() query: { id: string }): Promise<Category> {
    return this.categoriesFetcher.getItem(Number(query.id));
  }

  @ApiGet(ApiCategoriesRoute.CATEGORIES)
  public async getCategories(
    @Query() query: { offset: string },
  ): Promise<Category[]> {
    const limit = 25;

    return this.categoriesFetcher.fetch({
      skip: Number(query.offset),
      take: limit,
    });
  }

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
    const category = await this.categoriesFetcher.getItemFromLink(
      param.categoryLink,
      ['products.fabricator', 'products.category', 'parent'],
    );

    const categoryChildren = await this.categoriesFetcher.getCategoryChildren(
      category,
      [category],
    );

    const categoriesProducts = await this.productsFetcher.getCategoriesProducts(
      categoryChildren,
    );

    const productsCountWithUniqueFabricators = countBy(
      categoriesProducts,
      (product) => product.fabricator.id,
    );

    const productsWithUniqueFabricators = uniqBy(
      categoriesProducts,
      (product) => product.fabricator.id,
    );

    const fabricators = productsWithUniqueFabricators.map(
      (product) => product.fabricator,
    );

    return {
      breadcrumbs: await this.breadcrumbsService.getBreadcrumbs(category),
      category,
      fabricatorsProductsLengths: productsCountWithUniqueFabricators,
      fabricators: this.fabricatorsFactory.getFabricatorsWithLinks(fabricators),
      title: `${siteName} | ${category.name}`,
      features: {
        [Feature.COMMON]: {
          pageId: PageName.CATEGORIES,
          categories: await this.categoriesFetcher.fetchParent(),
        },
      },
    };
  }
}
