import { Injectable } from '@nestjs/common/decorators';
import { DeepPartial, InsertResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { IProduct } from '@server/Products/types/IProduct';
import { Product } from '@server/Products/entities/product.entity';

@Injectable()
export class ProductsFetcher {
  public constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public getItem(id: number): Promise<IProduct> {
    return this.productRepository.findOneOrFail({ id });
  }

  public fetch(): Promise<IProduct[]> {
    return this.productRepository.find();
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

  public create(entity: DeepPartial<Product>): Promise<InsertResult> {
    return this.productRepository.insert(entity);
  }
}
