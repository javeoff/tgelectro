import { Injectable } from '@nestjs/common/decorators';

import { IProduct } from '@server/Products/types/IProduct';
import { products } from '@server/Products/__mock__/products';

@Injectable()
export class ProductsFetcher {
  public fetch(): IProduct[] {
    return products;
  }
}
