import { Injectable } from '@nestjs/common/decorators';

import { IFabricator } from '@server/Fabricators/types/IFabricator';
import { IRow, IValue } from '@pages/admin/components/Table/types/IRow';
import { IProduct } from '@server/Products/types/IProduct';
import { ICategory } from '@server/Categories/types/ICategory';
import { ILink } from '@pages/admin/components/Table/types/ILink';
import { ListName } from '@pages/admin/enums/ListName';

@Injectable()
export class TableListFactory {
  public getCategoriesList(categories: ICategory[]): IRow[] {
    const headerRow: IValue[] = [
      'Идентификатор',
      'Название',
      'Продукты',
      'Действие',
    ];

    return [
      { values: headerRow },
      ...categories.map((category) => ({
        values: [
          category.id,
          category.name,
          category.products,
          this.getLinks(category.id, ListName.CATEGORIES),
        ] as IValue[],
      })),
    ];
  }

  public getFabricatorsList(fabricators: IFabricator[]): IRow[] {
    const headerRow: IValue[] = [
      'Идентификатор',
      'Название',
      'Продукты',
      'Действие',
    ];

    return [
      { values: headerRow },
      ...fabricators.map((fabricator) => ({
        values: [
          fabricator.id,
          fabricator.name,
          fabricator.products,
          this.getLinks(fabricator.id, ListName.FABRICATORS),
        ] as IValue[],
      })),
    ];
  }

  public getProductsList(products: IProduct[]): IRow[] {
    const headerRow: IValue[] = [
      'Идентификатор',
      'Артикул',
      'Цена',
      'Действие',
    ];

    return [
      { values: headerRow },
      ...products.map((product) => ({
        values: [
          product.id,
          [
            {
              url: '#',
              text: `${product.vendor} (${product.alternativeVendor})`,
            },
          ],
          product.price,
          this.getLinks(product.id, ListName.PRODUCTS),
        ] as IValue[],
      })),
    ];
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
