import { Injectable } from '@nestjs/common/decorators';

import { IBreadcrumb } from '@components/Breadcrumbs/Breadcrumbs';
import { siteName } from '@common/utils/constants';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';
import { Category } from '@server/Categories/entities/category.entity';
import { Product } from '@server/Products/entities/product.entity';
import { getLinkFromText } from '@common/utils/getLinkFromText';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { isProduct } from '@server/Breadcrumbs/guards/isProduct';
import { isFabricator } from '@server/Breadcrumbs/guards/isFabricator';

@Injectable()
export class BreadcrumbsService {
  public constructor(private readonly categoriesFetcher: CategoriesFetcher) {}

  public async getBreadcrumbs(
    entity: Category | Fabricator,
    lastEntity?: Fabricator | Product,
  ): Promise<IBreadcrumb[]> {
    const breadcrumbs: IBreadcrumb[] = [
      {
        link: '/',
        text: siteName,
      },
    ];

    if (lastEntity && !isProduct(lastEntity)) {
      breadcrumbs.push({
        link: lastEntity.link,
        text: lastEntity.name,
      });
    }

    if (isFabricator(entity)) {
      breadcrumbs.push({
        text: entity.name,
        link:
          lastEntity && !isProduct(lastEntity)
            ? entity.link.replace('categories', '')
            : entity.link,
      });
    }

    if (isProduct(entity) || ('parent' in entity && !isFabricator(entity))) {
      const category = isProduct(entity) ? entity.category : entity;

      const categoryTree = await this.categoriesFetcher.getCategoryTree(
        category,
        [category],
      );

      // eslint-disable-next-line no-console
      console.log('parentTree', categoryTree);

      if (lastEntity) {
        breadcrumbs.push(
          ...categoryTree.map((treeItem) => ({
            text: treeItem.name,
            link: isProduct(lastEntity)
              ? `/categories/${treeItem.link}`
              : treeItem.link,
          })),
        );
      }

      if (!lastEntity) {
        breadcrumbs.push(
          ...categoryTree.map((treeItem) => ({
            text: treeItem.name,
            link: treeItem.link,
          })),
        );
      }
    }

    if (lastEntity && isProduct(lastEntity)) {
      breadcrumbs.push({
        link: getLinkFromText(lastEntity.vendor),
        text: lastEntity.vendor,
      });
    }

    // eslint-disable-next-line no-console
    console.log(breadcrumbs);

    return breadcrumbs;
  }
}
