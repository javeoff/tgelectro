import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  InsertResult,
  IsNull,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import uniqBy from 'lodash/uniqBy';

import { Category } from '@server/Categories/entities/category.entity';
import { ProductsFetcher } from '@server/Products/services/products.fetcher';
import { Product } from '@server/Products/entities/product.entity';
import { CategoriesFactory } from '@server/Categories/factories/categories.factory';
import { IProduct } from '@server/Products/types/IProduct';
import { FabricatorsFetcher } from '@server/Fabricators/services/fabricators.fetcher';

@Injectable()
export class CategoriesFetcher {
  public constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    private readonly productsFetcher: ProductsFetcher,
    private readonly categoriesFactory: CategoriesFactory,
    private readonly fabricatorsFetcher: FabricatorsFetcher,
  ) {}

  public getItem(id: number, relations = []): Promise<Category> {
    return this.categoriesRepository.findOneOrFail({
      where: { id },
      relations: ['parent', ...relations],
    });
  }

  public getItemFromLink(
    link: string,
    additionalRelations?: string[],
  ): Promise<Category> {
    const relations = ['products'];

    if (additionalRelations) {
      relations.push(...additionalRelations);
    }

    return this.categoriesRepository.findOneOrFail({
      relations,
      where: {
        link,
      },
    });
  }

  public async getCategoryTree(
    category: Category,
    parentTree: Category[],
  ): Promise<Category[]> {
    if (category.parent === null) {
      return parentTree;
    }

    const parent = await this.getItem(category.parent.id);

    if (parent.parent === null || parent.parent.id === 0) {
      return parentTree.reverse();
    }

    parentTree.push(parent);

    return this.getCategoryTree(parent, parentTree);
  }

  public async getCategoryChild(category: Category): Promise<Category[]> {
    return this.categoriesRepository.find({
      where: {
        parent: {
          id: category.id,
        },
      },
      relations: ['products'],
    });
  }

  public async getCategoryChildren(
    category: Category,
    acc: Category[],
  ): Promise<Category[]> {
    const childrenCategories = await this.getCategoryChild(category);

    acc.push(...childrenCategories);

    if (childrenCategories.length > 0) {
      await Promise.all(
        childrenCategories.map((currentCategory) =>
          this.getCategoryChildren(currentCategory, acc),
        ),
      );
    }

    return acc;
  }

  public getCategoriesProducts(categories: Category[]): Product[] {
    const products: IProduct[] = [];

    categories.forEach((category) => {
      products.push(...category.products);
    });

    return products;
  }

  public async getFabricatorCategories(
    fabricatorId: number,
  ): Promise<Category[]> {
    const products = await this.productsFetcher.getItems({
      fabricator: { id: fabricatorId },
    });

    const uniqProductsByCategoryId = uniqBy(
      products,
      (item) => item.category.id,
    );

    return uniqProductsByCategoryId.map((product) => product.category);
  }

  public async fetchParent(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find({
      where: { parent: IsNull() },
    });

    return this.categoriesFactory.getCategoriesWithLink(categories);
  }

  public async fetch(options?: Record<string, unknown>): Promise<Category[]> {
    return this.categoriesRepository.find({ ...options });
  }

  public getLength(): Promise<number> {
    return this.categoriesRepository.count();
  }

  public update(id: number, entity: Category): Promise<UpdateResult> {
    return this.categoriesRepository.update(id, entity);
  }

  public remove(entity: Category): Promise<DeleteResult> {
    return this.categoriesRepository.delete(entity.id);
  }

  public create(
    entity: QueryDeepPartialEntity<Category>,
  ): Promise<InsertResult> {
    return this.categoriesRepository.insert(entity);
  }
}
