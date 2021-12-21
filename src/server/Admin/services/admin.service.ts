import { Injectable } from '@nestjs/common/decorators';

import { FabricatorsFetcher } from '@server/Fabricators/services/fabricators.fetcher';
import { ProductsFetcher } from '@server/Products/services/products.fetcher';
import { CategoriesFetcher } from '@server/Categories/services/categories.fetcher';
import { ListName } from '@pages/admin/enums/ListName';
import { IFabricator } from '@server/Fabricators/types/IFabricator';
import { ICategory } from '@server/Categories/types/ICategory';
import { IProduct } from '@server/Products/types/IProduct';
import { TItemType } from '@server/Admin/types/TItemType';
import { SaveItemRequest } from '@server/Admin/dto/SaveItemRequest';
import { Category } from '@server/Categories/entities/category.entity';
import { Product } from '@server/Products/entities/product.entity';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { DeleteItemRequest } from '@server/Admin/dto/DeleteItemRequest';

interface ILists {
  [ListName.PRODUCTS]: IProduct[];
  [ListName.CATEGORIES]: ICategory[];
  [ListName.FABRICATORS]: IFabricator[];
}

@Injectable()
export class AdminService {
  public constructor(
    private readonly fabricatorsFetcher: FabricatorsFetcher,
    private readonly productsFetcher: ProductsFetcher,
    private readonly categoriesFetcher: CategoriesFetcher,
  ) {}

  public getService(
    listType: TItemType | ListName,
  ): FabricatorsFetcher | ProductsFetcher | CategoriesFetcher {
    switch (listType) {
      case 'product':
      default:
        return this.productsFetcher;
      case 'category':
        return this.categoriesFetcher;
      case 'fabricator':
        return this.fabricatorsFetcher;
    }
  }

  public async getLists(): Promise<ILists> {
    return {
      [ListName.PRODUCTS]: await this.productsFetcher.fetch(),
      [ListName.CATEGORIES]: await this.categoriesFetcher.fetch(),
      [ListName.FABRICATORS]: await this.fabricatorsFetcher.fetch(),
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
    switch (dto.itemType) {
      case 'product':
      default:
        return this.productsFetcher.update(dto.item as Product);
      case 'category':
        return this.categoriesFetcher.update(dto.item as Category);
      case 'fabricator':
        return this.fabricatorsFetcher.update(dto.item as Fabricator);
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
}
