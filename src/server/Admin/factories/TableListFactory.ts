import { Injectable } from '@nestjs/common/decorators';

import { IFabricator } from '@server/Fabricators/types/IFabricator';
import { IRow, IValue } from '@pages/admin/components/Table/types/IRow';
import { IProduct } from '@server/Products/types/IProduct';
import { ICategory } from '@server/Categories/types/ICategory';
import { ILink } from '@pages/admin/components/Table/types/ILink';
import { ListName } from '@pages/admin/enums/ListName';

@Injectable()
export class TableListFactory {
  private readonly headerRow: IValue[] = [
    'Идентификатор',
    'Название',
    'Продукты',
    'Действие',
  ];

  public getCategoriesList(
    categories: ICategory[],
    withHeaderRow?: boolean,
  ): IRow[] {
    const list: IRow[] = [];

    if (withHeaderRow) {
      list.push({ values: this.headerRow });
    }

    list.push(
      ...categories.map((category) => ({
        values: [
          category.id,
          category.name,
          category.products,
          this.getLinks(category.id, ListName.CATEGORIES),
        ] as IValue[],
      })),
    );

    return list;
  }

  public getFabricatorsList(
    fabricators: IFabricator[],
    withHeaderRow?: boolean,
  ): IRow[] {
    const list: IRow[] = [];

    if (withHeaderRow) {
      list.push({ values: this.headerRow });
    }

    list.push(
      ...fabricators.map((fabricator) => ({
        values: [
          fabricator.id,
          fabricator.name,
          fabricator.products,
          this.getLinks(fabricator.id, ListName.FABRICATORS),
        ] as IValue[],
      })),
    );

    return list;
  }

  public getProductsList(
    products: IProduct[],
    withHeaderRow?: boolean,
  ): IRow[] {
    const list: IRow[] = [];
    const headerRow: IValue[] = [
      'Идентификатор',
      'Артикул',
      'Цена',
      'Действие',
    ];

    if (withHeaderRow) {
      list.push({ values: headerRow });
    }

    list.push(
      ...products.map((product) => ({
        values: [
          product.id,
          [
            {
              url: `/products/${product.vendor}`,
              text: `${product.vendor} (${product.alternativeVendor})`,
            },
          ],
          product.price,
          this.getLinks(product.id, ListName.PRODUCTS),
        ] as IValue[],
      })),
    );

    return list;
  }

  private getLinks: (itemId: number, itemType: ListName) => ILink[] = (
    itemId,
    itemType,
  ) => [
    {
      id: String(itemId),
      url: `admin/edit?type=${itemType}&id=${itemId}`,
      text: 'Редактировать',
    },
    {
      id: String(itemId),
      action: 'delete',
      text: 'Удалить',
    },
  ];
}
