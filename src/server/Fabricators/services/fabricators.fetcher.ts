import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/browser/query-builder/QueryPartialEntity';
import uniqBy from 'lodash/uniqBy';

import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { ProductsFetcher } from '@server/Products/services/products.fetcher';
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

    const uniqProductsByFabricatorId = uniqBy(
      products,
      (item) => item.fabricator.id,
    );

    return this.fabricatorsFactory.getFabricatorsWithLinks(
      uniqProductsByFabricatorId.map((product) => product.fabricator),
    );
  }

  public fetch(options?: Record<string, unknown>): Promise<Fabricator[]> {
    return this.fabricatorsRepository.find({ ...options });
  }

  public getLength(): Promise<number> {
    return this.fabricatorsRepository.count();
  }

  public update(id: number, entity: Fabricator): Promise<UpdateResult> {
    return this.fabricatorsRepository.update(id, entity);
  }

  public remove(entity: Fabricator): Promise<DeleteResult> {
    return this.fabricatorsRepository.delete(entity.id);
  }

  public create(
    entity: QueryDeepPartialEntity<Fabricator>,
  ): Promise<InsertResult> {
    return this.fabricatorsRepository.insert(entity);
  }
}
