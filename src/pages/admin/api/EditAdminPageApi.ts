import { EmptyObject } from 'redux';

import { ApiServiceBase } from '@common/api/utils/ApiServiceBase';
import { SaveItemRequest } from '@server/Admin/dto/SaveItemRequest';
import { AdminRoute } from '@server/Admin/enums/AdminRoute';
import { Category } from '@server/Categories/entities/category.entity';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';

class EditAdminPageApi extends ApiServiceBase {
  public constructor() {
    super();
  }

  public saveItem(dto: SaveItemRequest): Promise<EmptyObject> {
    return this.post(AdminRoute.SAVE, dto);
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
}

export const editAdminPageApi = new EditAdminPageApi();
