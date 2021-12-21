import { IsDefined } from 'class-validator';
import { Primitive } from 'type-fest';

import { ListName } from '@pages/admin/enums/ListName';

export class CreateItemRequest {
  @IsDefined({
    message: 'Тип обновляемой сущности не определен.',
  })
  public itemType!: ListName;

  @IsDefined({
    message: 'Тип обновляемой сущности не определен.',
  })
  public item!: Record<string, Primitive>;
}
