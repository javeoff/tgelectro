import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/browser/query-builder/QueryPartialEntity';

import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { ProductsFetcher } from '@server/Products/services/products.fetcher';
import { Product } from '@server/Products/entities/product.entity';
import { FabricatorsFactory } from '@server/Fabricators/factories/fabricators.factory';

@Injectable()
export class FabricatorsFetcher {
  public constructor(
    @InjectRepository(Fabricator)
    private readonly fabricatorsRepository: Repository<Fabricator>,
    private readonly productsFetcher: ProductsFetcher,
    private readonly fabricatorsFactory: FabricatorsFactory,
  ) {}

  public getItem(id: number): Promise<Fabricator> {
    return this.fabricatorsRepository.findOneOrFail({ id });
  }

  public getItemFromLink(
    link: string,
    optionalRelations?: string[],
  ): Promise<Fabricator> {
    const relations = ['products'];

    if (optionalRelations) {
      relations.push(...optionalRelations);
    }

    return this.fabricatorsRepository.findOneOrFail({
      relations,
      where: {
        link,
      },
    });
  }

  public async getCategoryFabricators(
    categoryId: number,
  ): Promise<Fabricator[]> {
    const products = await this.productsFetcher.getItems({
      category: { id: categoryId },
    });

    const idsCollection = new Set(
      products.map((product) => product.fabricator.id),
    );
    const ids = [...idsCollection];

    const fabricators = ids.map(
      (id) =>
        (products.find((product) => product.fabricator.id === id) as Product)
          .fabricator,
    );

    return this.fabricatorsFactory.getFabricatorsWithLinks(fabricators);
  }

  public fetch(): Promise<Fabricator[]> {
    return this.fabricatorsRepository.find();
  }

  public getLength(): Promise<number> {
    return this.fabricatorsRepository.count();
  }

  public update(entity: Fabricator): Promise<Fabricator> {
    return this.fabricatorsRepository.save(entity);
  }

  public remove(entity: Fabricator): Promise<Fabricator> {
    return this.fabricatorsRepository.remove(entity);
  }

  public create(
    entity: QueryDeepPartialEntity<Fabricator>,
  ): Promise<InsertResult> {
    return this.fabricatorsRepository.insert(entity);
  }
}
