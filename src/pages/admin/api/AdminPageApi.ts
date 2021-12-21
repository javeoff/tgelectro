import { EmptyObject } from 'redux';

import { ApiServiceBase } from '@common/api/utils/ApiServiceBase';
import { DeleteItemRequest } from '@server/Admin/dto/DeleteItemRequest';
import { AdminRoute } from '@server/Admin/enums/AdminRoute';

class AdminPageApi extends ApiServiceBase {
  public deleteItem(dto: DeleteItemRequest): Promise<EmptyObject> {
    return this.post(AdminRoute.DELETE, dto);
  }
}

export const adminPageApi = new AdminPageApi();
