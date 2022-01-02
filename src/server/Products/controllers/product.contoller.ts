import { Controller, Param } from '@nestjs/common';

import { ProductsFetcher } from '@server/Products/services/products.fetcher';
import { Page } from '@server/Common/decorators/Page';
import { PageName } from '@common/enums/PageName';

@Controller()
export class ProductController {
  public constructor(private readonly productsFetcher: ProductsFetcher) {}

  @Page(PageName.PRODUCT)
  public async productPage(
    @Param() param: { productLink: string },
  ): Promise<unknown> {

    // eslint-disable-next-line no-console
    console.log(await this.productsFetcher.getItemFromLink(param.productLink));

    return {
      product: await this.productsFetcher.getItemFromLink(param.productLink),
    };
  }
}
