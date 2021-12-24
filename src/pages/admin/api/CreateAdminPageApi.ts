import { EmptyObject } from 'redux';

import { ApiServiceBase } from '@common/api/utils/ApiServiceBase';
import { AdminRoute } from '@server/Admin/enums/AdminRoute';
import { CreateItemRequest } from '@server/Admin/dto/CreateItemRequest';
import { Category } from '@server/Categories/entities/category.entity';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';

class CreateAdminPageApi extends ApiServiceBase {
  public constructor() {
    super();
  }

  public getCategory(id: string): Promise<Category> {
    return this.get(AdminRoute.CATEGORY, {
      query: {
        id,
      },
    });
  }

  public getFabricator(id: string): Promise<Fabricator> {
    return this.get(AdminRoute.FABRICATOR, {
      query: {
        id,
      },
    });
  }

  public createItem(dto: CreateItemRequest): Promise<EmptyObject> {
    return this.post(AdminRoute.CREATE, dto);
  }
}

export const createAdminPageApi = new CreateAdminPageApi();
