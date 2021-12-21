import { EmptyObject } from 'redux';

import { ApiServiceBase } from '@common/api/utils/ApiServiceBase';
import { AdminRoute } from '@server/Admin/enums/AdminRoute';
import { CreateItemRequest } from '@server/Admin/dto/CreateItemRequest';

class CreateAdminPageApi extends ApiServiceBase {
  public constructor() {
    super();
  }

  public createItem(dto: CreateItemRequest): Promise<EmptyObject> {
    return this.post(AdminRoute.CREATE, dto);
  }
}

export const createAdminPageApi = new CreateAdminPageApi();
