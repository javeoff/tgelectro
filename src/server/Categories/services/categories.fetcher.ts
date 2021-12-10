import { Injectable } from '@nestjs/common';

import { categories } from 'src/data/categories';
import { ICategory } from '@common/types/ICategory';

@Injectable()
export class CategoriesFetcher {
  public get(): ICategory[] {
    return categories;
  }
}
