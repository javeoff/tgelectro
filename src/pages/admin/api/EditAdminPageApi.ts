import { EmptyObject } from 'redux';
import convertToUrl from 'transliterate-cyrillic-text-to-latin-url';

import { ApiServiceBase } from '@common/api/utils/ApiServiceBase';
import { SaveItemRequest } from '@server/Admin/dto/SaveItemRequest';
import { AdminRoute } from '@server/Admin/enums/AdminRoute';
import { IFabricator } from '@server/Fabricators/types/IFabricator';
import { ICategory } from '@server/Categories/types/ICategory';

class EditAdminPageApi extends ApiServiceBase {
  public constructor() {
    super();
  }

  public saveItem(draft: SaveItemRequest): Promise<EmptyObject> {
    if ('link' in draft.item) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      draft.item.link = convertToUrl(draft.item.name);
    }

    return this.post(AdminRoute.SAVE, draft);
  }

  public getCategory(id: string): Promise<ICategory> {
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
}

export const editAdminPageApi = new EditAdminPageApi();
