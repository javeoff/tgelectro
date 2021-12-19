import { EmptyObject } from 'redux';

import { ApiServiceBase } from '@common/api/utils/ApiServiceBase';
import { SaveItemRequest } from '@server/Admin/dto/SaveItemRequest';
import { AdminRoute } from '@server/Admin/enums/AdminRoute';

class EditAdminPageApi extends ApiServiceBase {
  public constructor() {
    super();
  }

  public saveItem(dto: SaveItemRequest): Promise<EmptyObject> {
    return this.post(AdminRoute.SAVE, dto);
  }
}

export const editAdminPageApi = new EditAdminPageApi();
