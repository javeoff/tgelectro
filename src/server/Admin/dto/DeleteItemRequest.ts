import { IsDefined } from 'class-validator';

import { ListName } from '@pages/admin/enums/ListName';

export class DeleteItemRequest {
  @IsDefined({
    message: 'Тип обновляемой сущности не определен.',
  })
  public itemType!: ListName;

  @IsDefined({
    message: 'Идентификатор обновляемой сущности не определен',
  })
  public id!: string;
}
