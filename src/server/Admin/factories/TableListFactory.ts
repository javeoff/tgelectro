import { Injectable } from '@nestjs/common/decorators';

import { IFabricator } from '@server/Fabricators/types/IFabricator';
import { IRow, IRowLink, IValue } from '@pages/admin/components/Table/types/IRow';
import { IProduct } from '@server/Products/types/IProduct';
import { ICategory } from '@server/Categories/types/ICategory';

type TItemType = 'product' | 'category' | 'fabricator';

@Injectable()
export class TableListFactory {
  public getCategoriesList(categories: ICategory[]): IRow[] {
    const headerRow: IValue[] = [
      'Название',
      'Производители',
      'Продукты',
      'Действие',
    ];

    return [
      { values: headerRow },
      ...categories.map((category) => ({
        values: [
          category.name,
          category.fabricators,
          category.products,
          this.getLinks(category.id, 'category'),
        ] as IValue[],
      })),
    ];
  }

  public getFabricatorsList(fabricators: IFabricator[]): IRow[] {
    const headerRow: IValue[] = [
      'Идентификатор',
      'Название',
      'Категории',
      'Продукты',
      'Действие',
    ];

    return [
      { values: headerRow },
      ...fabricators.map((fabricator) => ({
        values: [
          fabricator.id,
          fabricator.name,
          fabricator.categories,
          fabricator.products,
          this.getLinks(fabricator.id, 'fabricator'),
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
              text: `${product.vendor} (${product.alternativeVendor}}`,
            },
          ],
          product.price,
          this.getLinks(product.id, 'product'),
        ] as IValue[],
      })),
    ];
  }

  private getLinks: (itemId: number, itemType: TItemType) => IRowLink[] = (
    itemId,
    itemType,
  ) => [
    { url: `admin/edit?type=${itemType}&id=${itemId}`, text: 'Редактировать' },
    { url: `admin/delete?type=${itemType}&id=${itemId}`, text: 'Удалить' },
  ];
}
