import { EmptyObject } from 'redux';
import convertToUrl from 'transliterate-cyrillic-text-to-latin-url';

import { ApiServiceBase } from '@common/api/utils/ApiServiceBase';
import { AdminRoute } from '@server/Admin/enums/AdminRoute';
import { CreateItemRequest } from '@server/Admin/dto/CreateItemRequest';
import { Category } from '@server/Categories/entities/category.entity';
import { IFabricator } from '@server/Fabricators/types/IFabricator';

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

  public getFabricator(id: string): Promise<IFabricator> {
    return this.get(AdminRoute.FABRICATOR, {
      query: {
        id,
      },
    });
  }

  public createItem(draft: CreateItemRequest): Promise<EmptyObject> {
    if ('link' in draft.item) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      draft.item.link = convertToUrl(draft.item.name);
    }

    return this.post(AdminRoute.CREATE, draft);
  }
}

export const createAdminPageApi = new CreateAdminPageApi();
