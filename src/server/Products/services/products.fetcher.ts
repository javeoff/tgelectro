import { Injectable } from '@nestjs/common/decorators';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AnyObject } from 'immer/dist/types/types-internal';
import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';

import { Product } from '@server/Products/entities/product.entity';
import { Category } from '@server/Categories/entities/category.entity';

@Injectable()
export class ProductsFetcher {
  public constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public getItem(id: number): Promise<Product> {
    return this.productRepository.findOneOrFail({
      relations: ['category', 'fabricator'],
      where: {
        id,
      },
    });
  }

  public async getItemFromLink(link: string): Promise<Product | undefined> {
    const product = (await this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.category', 'category')
      .leftJoinAndSelect('products.fabricator', 'fabricator')
      .where("REPLACE(vendor, '/', '-') = :link", { link })
      .getOne()) as Product & {
      categoryParent: Category['parent'];
    };

    return {
      ...product,
      category: {
        ...product.category,
        parent: product.categoryParent,
      },
      categoryParent: undefined,
    } as Product;
  }

  public getItems(filterOptions: Record<string, unknown>): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category', 'fabricator'],
      where: filterOptions,
    });
  }

  public async getCategoriesProducts(
    categories: Category[],
  ): Promise<Product[]> {
    return flatten(
      await Promise.all(
        categories.map(async (categoryChild) =>
          this.getItems({
            category: {
              id: categoryChild.id,
            },
          }),
        ),
      ),
    );
  }

  public async getCategoriesProductsWithUniqueFabricators(
    categories: Category[],
  ): Promise<Product[]> {
    return uniqBy(
      await this.getCategoriesProducts(categories),
      (product) => product.fabricator.id,
    );
  }

  public fetch(options?: AnyObject): Promise<Product[]> {
    return this.productRepository.find({ ...options });
  }

  public getLength(filterOptions?: Record<string, unknown>): Promise<number> {
    return this.productRepository.count(filterOptions);
  }

  public update(id: number, entityDraft: Product): Promise<UpdateResult> {
    return this.productRepository.update(id, entityDraft);
  }

  public remove(entity: Product): Promise<DeleteResult> {
    return this.productRepository.delete(entity.id);
  }

  public create(
    entityDraft: QueryDeepPartialEntity<Product>,
  ): Promise<InsertResult> {
    return this.productRepository.insert(entityDraft);
  }
}
