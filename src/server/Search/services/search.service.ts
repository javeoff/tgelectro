import { Injectable } from '@nestjs/common/decorators';

import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';
import { ProductsFetcher } from '@server/Products/services/products.fetcher';
import { IProduct } from '@server/Products/types/IProduct';
import { ICategory } from '@server/Categories/types/ICategory';

@Injectable()
export class SearchService {
  public constructor(
    private readonly productsFetcher: ProductsFetcher,
    private readonly categoriesFetcher: CategoriesFetcher,
  ) {}

  public searchProducts(query: string): Promise<IProduct[]> {
    return this.productsFetcher.fetch({
      where: { vendor: query },
      relations: ['fabricator'],
    });
  }

  public searchCategories(query: string): Promise<ICategory[]> {
    return this.categoriesFetcher.fetch({ where: { name: query } });
  }
}
