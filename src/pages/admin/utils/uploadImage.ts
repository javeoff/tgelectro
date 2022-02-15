import convertToUrl from 'transliterate-cyrillic-text-to-latin-url';

import { CreateItemRequest } from '@server/Admin/dto/CreateItemRequest';
import { SaveItemRequest } from '@server/Admin/dto/SaveItemRequest';
import { adminPageApi } from '@pages/admin/api/AdminPageApi';

interface IImageValueState {
  imageUrl?: string;
}

interface IParams<ValuesState> {
  valuesState: ValuesState;
  request: CreateItemRequest | SaveItemRequest;
}

export const uploadImage = async <ValuesState extends IImageValueState>({
  valuesState,
  request,
}: IParams<ValuesState>): Promise<string> => {
  if ('imageUrl' in valuesState && valuesState.imageUrl) {
    const dto = new FormData();

    dto.append('itemType', request.itemType);

    if ('imageUrl' in request.item) {
      dto.append('image', request.item.imageUrl as Blob);
    }

    if ('vendor' in request.item) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const fileName = convertToUrl(request.item.vendor) as string;

      dto.append('fileName', fileName);
    }

    if ('name' in request.item) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const fileName = convertToUrl(request.item.name) as string;

      dto.append('fileName', fileName);
    }

    const response = await adminPageApi.uploadImage(dto);

    return response.filePath;
  }

  return '';
};
