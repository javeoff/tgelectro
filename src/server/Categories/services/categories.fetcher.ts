import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Category } from '@server/Categories/entities/category.entity';
import { ProductsFetcher } from '@server/Products/services/products.fetcher';
import { Product } from '@server/Products/entities/product.entity';
import { CategoriesFactory } from '@server/Categories/factories/categories.factory';
import { IProduct } from '@server/Products/types/IProduct';

@Injectable()
export class CategoriesFetcher {
  public constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    private readonly productsFetcher: ProductsFetcher,
    private readonly categoriesFactory: CategoriesFactory,
  ) {}

  public getItem(id: number): Promise<Category> {
    return this.categoriesRepository.findOneOrFail({ id });
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

  public async getCategoryChildren(
    category: Category,
    acc: Category[],
  ): Promise<Category[]> {
    const childrenCategories = await this.categoriesRepository.find({
      where: {
        parentId: category.id,
      },
      relations: ['products'],
    });

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

    const idsCollection = new Set(
      products.map((product) => product.category.id),
    );
    const ids = [...idsCollection];

    return ids
      .map((id) => {
        const product = products.find(
          ({ category }) => category.id === id,
        ) as Product;

        return product.category;
      })
      .filter((category) => category.parentId === 0);
  }

  public async fetchParent(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find({
      where: { parentId: 0 },
    });

    return this.categoriesFactory.getCategoriesWithLink(categories);
  }

  public async fetch(options?: Record<string, unknown>): Promise<Category[]> {
    return this.categoriesRepository.find({ ...options });
  }

  public getLength(): Promise<number> {
    return this.categoriesRepository.count();
  }

  public update(entity: Category): Promise<Category> {
    return this.categoriesRepository.save(entity);
  }

  public remove(entity: Category): Promise<Category> {
    return this.categoriesRepository.remove(entity);
  }

  public create(
    entity: QueryDeepPartialEntity<Category>,
  ): Promise<InsertResult> {
    return this.categoriesRepository.insert(entity);
  }
}
