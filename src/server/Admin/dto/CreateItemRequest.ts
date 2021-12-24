import { IsDefined } from 'class-validator';
import { Primitive } from 'type-fest';

import { ListName } from '@pages/admin/enums/ListName';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { Category } from '@server/Categories/entities/category.entity';

export class CreateItemRequest {
  @IsDefined({
    message: 'Тип обновляемой сущности не определен.',
  })
  public itemType!: ListName;

  @IsDefined({
    message: 'Тип обновляемой сущности не определен.',
  })
  public item!: Record<string, Primitive | Category | Fabricator>;
}
