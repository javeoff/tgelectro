import { Injectable } from '@nestjs/common/decorators';
import { InsertResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AnyObject } from 'immer/dist/types/types-internal';

import { Product } from '@server/Products/entities/product.entity';

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

  public getItemFromLink(link: string): Promise<Product> {
    return this.productRepository.findOneOrFail({
      relations: ['category', 'fabricator'],
      where: {
        vendor: link,
      },
    });
  }

  public getItems(filterOptions: Record<string, unknown>): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category', 'fabricator'],
      where: filterOptions,
    });
  }

  public fetch(options?: AnyObject): Promise<Product[]> {
    return this.productRepository.find({ ...options });
  }

  public getLength(): Promise<number> {
    return this.productRepository.count();
  }

  public update(entity: Product): Promise<Product> {
    return this.productRepository.save(entity);
  }

  public remove(entity: Product): Promise<Product> {
    return this.productRepository.remove(entity);
  }

  public create(
    entity: QueryDeepPartialEntity<Product>,
  ): Promise<InsertResult> {
    return this.productRepository.insert(entity);
  }
}
