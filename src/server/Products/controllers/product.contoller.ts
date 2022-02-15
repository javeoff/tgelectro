import { Controller, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import path from 'path';

import { ProductsFetcher } from '@server/Products/services/products.fetcher';
import { Page } from '@server/Common/decorators/Page';
import { ApiGet } from '@server/Common/decorators/ApiGet';
import { ApiProductsRoute } from '@server/Products/enums/ApiProductsRoute';
import { PageName } from '@common/enums/PageName';
import { siteName } from '@common/utils/constants';
import { Feature } from '@common/enums/Feature';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';
import { BreadcrumbsService } from '@server/Breadcrumbs/services/breadcrumbs.service';

@Controller()
export class ProductController {
  public constructor(
    private readonly productsFetcher: ProductsFetcher,
    private readonly categoriesFetcher: CategoriesFetcher,
    private readonly breadcrumbsService: BreadcrumbsService,
  ) {}

  @Page(PageName.PRODUCT)
  public async productPage(
    @Param() param: { productLink: string },
  ): Promise<unknown> {
    const product = await this.productsFetcher.getItemFromLink(
      param.productLink,
    );

    if (!product) {
      throw new Error('Product not found');
    }

    const category = await this.categoriesFetcher.getItem(product.category.id);

    return {
      breadcrumbs: await this.breadcrumbsService.getBreadcrumbs(
        category,
        product,
      ),
      title: `${product.vendor} | ${siteName}`,
      product,
      features: {
        [Feature.COMMON]: {
          categories: await this.categoriesFetcher.fetchParent(),
        },
      },
    };
  }

  @ApiGet(ApiProductsRoute.PRODUCTS)
  public async getProducts(
    @Query() query: { offset: string },
  ): Promise<unknown> {
    const limit = 25;

    return this.productsFetcher.fetch({
      skip: Number(query.offset),
      take: limit,
    });
  }

  @ApiGet(ApiProductsRoute.IMAGE)
  public getImage(
    @Param() param: { productName: string },
    @Res() response: Response,
  ): void {
    const filePath = path.resolve(__dirname, '../img/', param.productName);

    response.sendFile(filePath);
  }
}
