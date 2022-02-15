import { Injectable } from '@nestjs/common/decorators';

import { ListName } from '@pages/admin/enums/ListName';

@Injectable()
export class AdminFieldDataFactory {
  public getListNameByFieldName(
    fieldName: string,
    listName: ListName,
  ): ListName {
    switch (fieldName) {
      case 'fabricator':
      default:
        return ListName.FABRICATORS;
      case 'parent':
      case 'children':
        return listName;
      case 'category':
        return ListName.CATEGORIES;
    }
  }
}
