import { IsDefined } from 'class-validator';

import { TItemType } from '@server/Admin/types/TItemType';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { Category } from '@server/Categories/entities/category.entity';
import { Product } from '@server/Products/entities/product.entity';

export class SaveItemRequest {
  @IsDefined({
    message: 'Тип обновляемой сущности не определен.',
  })
  public itemType!: TItemType;

  @IsDefined({
    message: 'Тип обновляемой сущности не определен.',
  })
  public item!: Category | Product | Fabricator;

  @IsDefined({
    message: 'Идентификатор обновляемой сущности не определен',
  })
  public id!: string;
}
