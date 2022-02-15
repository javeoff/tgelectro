import { Controller, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import countBy from 'lodash/countBy';
import path from 'path';
import uniqBy from 'lodash/uniqBy';

import imagesMock from '@server/Fabricators/__mock__/images.json';
import { ApiGet } from '@server/Common/decorators/ApiGet';
import { FabricatorsFetcher } from '@server/Fabricators/services/fabricators.fetcher';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { PageName } from '@common/enums/PageName';
import { Page } from '@server/Common/decorators/Page';
import { siteName } from '@common/utils/constants';
import { Feature } from '@common/enums/Feature';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';
import { FabricatorsFactory } from '@server/Fabricators/factories/fabricators.factory';
import { CategoriesFactory } from '@server/Categories/factories/categories.factory';
import { ApiFabricatorsRoute } from '@server/Fabricators/enums/ApiFabricatorsRoute';
import { BreadcrumbsService } from '@server/Breadcrumbs/services/breadcrumbs.service';
import { getLinkFromText } from '@common/utils/getLinkFromText';

@Controller()
export class FabricatorController {
  public constructor(
    private readonly categoriesFetcher: CategoriesFetcher,
    private readonly fabricatorsFetcher: FabricatorsFetcher,
    private readonly fabricatorsFactory: FabricatorsFactory,
    private readonly categoriesFactory: CategoriesFactory,
    private readonly breadcrumbsService: BreadcrumbsService,
  ) {}

  @ApiGet(ApiFabricatorsRoute.FABRICATOR)
  public async getFabricator(
    @Query() query: { id: string },
  ): Promise<Fabricator> {
    return this.fabricatorsFetcher.getItem(Number(query.id));
  }

  @ApiGet(ApiFabricatorsRoute.FABRICATORS)
  public async getFabricators(
    @Query() query: { offset: string },
  ): Promise<unknown> {
    const limit = 25;

    return this.fabricatorsFetcher.fetch({
      skip: Number(query.offset),
      take: limit,
    });
  }

  @ApiGet(ApiFabricatorsRoute.IMAGE)
  public getImage(
    @Param() param: { fabricatorName: string },
    @Res() response: Response,
  ): void {
    const filePath = path.resolve(__dirname, '../img/', param.fabricatorName);

    response.sendFile(filePath);
  }

  @Page(PageName.FABRICATORS)
  public async fabricatorsPage(): Promise<unknown> {
    const fabricators = await this.fabricatorsFetcher.fetch();

    const fakeFabricators = imagesMock.map(({ name }) => ({
      name,
      imageUrl: getLinkFromText(name),
      link: '',
    }));

    const uniqueFabricators = uniqBy(
      [
        ...this.fabricatorsFactory.getFabricatorsWithLinks(fabricators),
        ...fakeFabricators,
      ],
      'name',
    );

    return {
      features: {
        [Feature.COMMON]: {
          pageId: PageName.FABRICATORS,
          categories: await this.categoriesFetcher.fetchParent(),
        },
        [Feature.CATALOG]: {
          fabricators: uniqueFabricators,
        },
      },
      title: `Производители | ${siteName}`,
    };
  }

  @Page(PageName.FABRICATOR)
  public async fabricatorPage(
    @Query() { page = '1' }: { page: string },
    @Param() param: { fabricatorLink: string },
  ): Promise<unknown> {
    const limit = 25;
    const offset = page === '1' ? 0 : Number(page) * limit;
    const fabricator = this.fabricatorsFactory.getFabricatorWithLink(
      await this.fabricatorsFetcher.getItemFromLink(param.fabricatorLink, [
        'products.fabricator',
        'products.category',
      ]),
    );

    const categories = await this.categoriesFetcher.getFabricatorCategories(
      fabricator.id,
    );

    const categoriesProductsLengths = Object.fromEntries(
      categories.map((childCategory) => [
        String(childCategory.id),
        countBy(fabricator.products, (product) => product.category.id)[
          childCategory.id
        ],
      ]),
    );

    const allProducts = [
      ...fabricator.products,
      ...categories.map(({ products }) => products),
    ].filter((item) => item !== undefined);

    const limitedProducts = allProducts.filter(
      (product, idx) => idx >= Number(offset) && idx < limit + offset,
    );

    return {
      breadcrumbs: await this.breadcrumbsService.getBreadcrumbs(fabricator),
      title: `${fabricator.name} | ${siteName}`,
      products: limitedProducts,
      fabricator: {
        ...fabricator,
        products: undefined,
      },
      categories,
      categoriesProductsLengths,
      pagesLength: Math.ceil(allProducts.length / limit),
      currentPage: page,
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
    @Query() { page = '1' }: { page: string },
    @Param() param: { fabricatorLink: string; '0': string },
  ): Promise<unknown> {
    const limit = 25;
    const offset = page === '1' ? 0 : Number(page) * limit;
    const params = param['0'].split('/');
    const currentCategory = params[params.length - 1];

    const fabricator = this.fabricatorsFactory.getFabricatorWithLink(
      await this.fabricatorsFetcher.getItemFromLink(param.fabricatorLink, [
        'products.fabricator',
        'products.category',
      ]),
    );

    const category = this.categoriesFactory.getCategoryWithLink(
      await this.categoriesFetcher.getItemFromLink(currentCategory, [
        'products.fabricator',
        'products.category',
        'parent',
      ]),
    );

    const childrenCategories = await this.categoriesFetcher.getCategoryChildren(
      category,
      [],
    );

    const categoriesProducts = this.categoriesFetcher.getCategoriesProducts([
      ...childrenCategories,
    ]);

    const categoriesProductsLengths = {
      ...childrenCategories.map((childCategory) => ({
        [String(childCategory.id)]: childCategory?.products.length || 0,
      })),
    };

    const allProducts = [...category.products, ...categoriesProducts];

    const limitedProducts = allProducts.filter(
      (product, idx) => idx >= Number(offset) && idx < limit + offset,
    );

    return {
      breadcrumbs: await this.breadcrumbsService.getBreadcrumbs(
        category,
        fabricator,
      ),
      title: `${category.name} | ${siteName}`,
      category: {
        ...category,
        products: undefined,
      },
      pagesLength: Math.ceil(allProducts.length / limit),
      currentPage: page,
      products: limitedProducts,
      params,
      categoriesProductsLengths,
      categories: childrenCategories,
      features: {
        [Feature.COMMON]: {
          pageId: PageName.INDEX,
          categories: await this.categoriesFetcher.fetchParent(),
        },
      },
    };
  }
}
