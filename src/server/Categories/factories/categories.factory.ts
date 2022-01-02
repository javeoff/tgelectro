import { Injectable } from '@nestjs/common/decorators';

import { Category } from '@server/Categories/entities/category.entity';

@Injectable()
export class CategoriesFactory {
  public getCategoryWithLink(category: Category): Category {
    return {
      ...category,
      link: `/categories/${category.link}`,
    };
  }

  public getCategoriesWithLink(categories: Category[]): Category[] {
    return categories.map((category) => this.getCategoryWithLink(category));
  }
}
