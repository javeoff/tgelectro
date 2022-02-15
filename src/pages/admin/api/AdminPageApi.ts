import { EmptyObject } from 'redux';
import convertToUrl from 'transliterate-cyrillic-text-to-latin-url';

import { ApiServiceBase } from '@common/api/utils/ApiServiceBase';
import { DeleteItemRequest } from '@server/Admin/dto/DeleteItemRequest';
import { AdminRoute } from '@server/Admin/enums/AdminRoute';
import { ListName } from '@pages/admin/enums/ListName';
import { IRow } from '@pages/admin/components/Table/types/IRow';
import { TEntityValue } from '@pages/admin/components/InputForm/types/TEntityValue';
import { SaveItemRequest } from '@server/Admin/dto/SaveItemRequest';
import { IUploadImageResponse } from '@pages/admin/types/IUploadImageResponse';

class AdminPageApi extends ApiServiceBase {
  public deleteItem(dto: DeleteItemRequest): Promise<EmptyObject> {
    return this.post(AdminRoute.DELETE, dto);
  }

  public getRows(listName: ListName, offset: number): Promise<IRow[]> {
    return this.get(AdminRoute.LIST, {
      query: {
        listName,
        offset: String(offset),
      },
    });
  }

  public search(listName: ListName, value: string): Promise<IRow[]> {
    return this.get(AdminRoute.SEARCH, {
      query: {
        listName,
        value,
      },
    });
  }

  public updateItem(draft: SaveItemRequest): Promise<EmptyObject> {
    if ('link' in draft.item) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      draft.item.link = convertToUrl(draft.item.name);
    }

    return this.post(AdminRoute.SAVE, draft);
  }

  public createItem(draft: SaveItemRequest): Promise<EmptyObject> {
    if ('link' in draft.item) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      draft.item.link = convertToUrl(draft.item.name);
    }

    return this.post(AdminRoute.CREATE, draft);
  }

  public getFieldData(
    listName: ListName,
    fieldName: string,
    searchValue?: string,
  ): Promise<TEntityValue[]> {
    const query: {
      listName: ListName;
      fieldName: string;
      searchValue?: string;
    } = {
      listName,
      fieldName,
    };

    if (searchValue) {
      query.searchValue = searchValue;
    }

    return this.get(AdminRoute.FIELD_DATA, {
      query,
    });
  }

  public uploadImage(dto: FormData): Promise<IUploadImageResponse> {
    return this.post<FormData, IUploadImageResponse>(AdminRoute.UPLOAD, dto);
  }
}

export const adminPageApi = new AdminPageApi();
