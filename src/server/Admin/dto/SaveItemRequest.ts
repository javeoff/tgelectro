import { IsDefined } from 'class-validator';
import { ListName } from '@pages/admin/enums/ListName';

export class SaveItemRequest {
  @IsDefined({
    message: 'Тип обновляемой сущности не определен.',
  })
  public itemType!: ListName;

  @IsDefined({
    message: 'Тип обновляемой сущности не определен.',
  })
  public item!: Record<string, unknown>;

  @IsDefined({
    message: 'Идентификатор обновляемой сущности не определен',
  })
  public id!: string;
}
