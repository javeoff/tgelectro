import { Injectable } from '@nestjs/common/decorators';

import { FabricatorsFetcher } from '@server/Fabricators/services/fabricators.fetcher';
import { ProductsFetcher } from '@server/Products/services/products.fetcher';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';
import { ListName } from '@pages/admin/enums/ListName';
import { SaveItemRequest } from '@server/Admin/dto/SaveItemRequest';
import { Category } from '@server/Categories/entities/category.entity';
import { Product } from '@server/Products/entities/product.entity';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { DeleteItemRequest } from '@server/Admin/dto/DeleteItemRequest';
import { CreateItemRequest } from '@server/Admin/dto/CreateItemRequest';

interface ILists {
  [ListName.PRODUCTS]: Product[];
  [ListName.CATEGORIES]: Category[];
  [ListName.FABRICATORS]: Fabricator[];
}

@Injectable()
export class AdminService {
  public constructor(
    private readonly fabricatorsFetcher: FabricatorsFetcher,
    private readonly productsFetcher: ProductsFetcher,
    private readonly categoriesFetcher: CategoriesFetcher,
  ) {}

  public getService(
    listType: ListName,
  ): FabricatorsFetcher | ProductsFetcher | CategoriesFetcher {
    switch (listType) {
      case ListName.PRODUCTS:
      default:
        return this.productsFetcher;
      case ListName.CATEGORIES:
        return this.categoriesFetcher;
      case ListName.FABRICATORS:
        return this.fabricatorsFetcher;
    }
  }

  public async getLists(): Promise<ILists> {
    return {
      [ListName.PRODUCTS]: await this.productsFetcher.fetch({
        skip: 0,
        take: 25,
      }),
      [ListName.CATEGORIES]: await this.categoriesFetcher.fetch({
        skip: 0,
        take: 25,
      }),
      [ListName.FABRICATORS]: await this.fabricatorsFetcher.fetch({
        skip: 0,
        take: 25,
      }),
    };
  }

  public async getListLengths(): Promise<Record<ListName, number>> {
    return {
      [ListName.PRODUCTS]: await this.productsFetcher.getLength(),
      [ListName.CATEGORIES]: await this.categoriesFetcher.getLength(),
      [ListName.FABRICATORS]: await this.fabricatorsFetcher.getLength(),
    };
  }

  public update(dto: SaveItemRequest): Promise<unknown> {
    const id = Number(dto.id);

    switch (dto.itemType) {
      case ListName.PRODUCTS:
      default:
        return this.productsFetcher.update(id, dto.item as unknown as Product);
      case ListName.CATEGORIES:
        return this.categoriesFetcher.update(
          id,
          dto.item as unknown as Category,
        );
      case ListName.FABRICATORS:
        return this.fabricatorsFetcher.update(
          id,
          dto.item as unknown as Fabricator,
        );
    }
  }

  public async delete(dto: DeleteItemRequest): Promise<unknown> {
    switch (dto.itemType) {
      case ListName.PRODUCTS:
      default:
        return this.productsFetcher.remove(
          await this.productsFetcher.getItem(Number(dto.id)),
        );
      case ListName.CATEGORIES:
        return this.categoriesFetcher.remove(
          await this.categoriesFetcher.getItem(Number(dto.id)),
        );
      case ListName.FABRICATORS:
        return this.fabricatorsFetcher.remove(
          await this.fabricatorsFetcher.getItem(Number(dto.id)),
        );
    }
  }

  public create(dto: CreateItemRequest): unknown {
    switch (dto.itemType) {
      case ListName.PRODUCTS:
      default:
        return this.productsFetcher.create(dto.item);
      case ListName.CATEGORIES:
        return this.categoriesFetcher.create(dto.item);
      case ListName.FABRICATORS:
        return this.fabricatorsFetcher.create(dto.item);
    }
  }
}
