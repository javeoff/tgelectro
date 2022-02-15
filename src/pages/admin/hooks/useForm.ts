import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';

import { TValuesState } from '@pages/admin/types/TValuesState';
import { uploadImage } from '@pages/admin/utils/uploadImage';
import { IPopup } from '@components/Popup/types/IPopup';
import { ListName } from '@pages/admin/enums/ListName';
import { SaveItemRequest } from '@server/Admin/dto/SaveItemRequest';
import { adminPageApi } from '@pages/admin/api/AdminPageApi';
import { getInitialValuesState } from '@common/utils/getInitialValuesState';

interface IParams {
  initialValuesState?: TValuesState;
  addPopup(popup: IPopup): void;
  itemType: ListName;
}

interface IResult {
  valuesState: TValuesState;
  setValuesState: Dispatch<SetStateAction<TValuesState>>;
  saveForm(id?: number): Promise<void>;
}

export const useForm = ({
  initialValuesState,
  addPopup,
  itemType,
}: IParams): IResult => {
  const [valuesState, setValuesState] = useState<TValuesState>(
    initialValuesState || getInitialValuesState(itemType),
  );

  const router = useRouter();

  const saveForm = async (id?: number): Promise<void> => {
    const requiredEntries = Object.entries(valuesState).filter(
      ([key]) => !['imageUrl', 'link', 'children'].includes(key),
    );

    const requiredValues = requiredEntries.map((item) => item[1]);

    const isValid = requiredValues.every((value) => String(value) !== '');

    if (!isValid) {
      const requiredEntryIdx = requiredValues.findIndex(
        (value) => String(value) === '',
      );

      addPopup({
        title: 'Ошибка создания',
        description: `Поле ${requiredEntries[requiredEntryIdx][0]} заполнены неверно`,
      });

      return;
    }

    const request = new SaveItemRequest();

    request.itemType = itemType;
    request.item = valuesState as unknown as typeof request.item;

    if (
      'imageUrl' in request.item &&
      typeof request.item.imageUrl !== 'string'
    ) {
      request.item.imageUrl = await uploadImage({ valuesState, request });
    }

    await router.push(`/admin?activeItem=${itemType}`);

    if (id !== undefined) {
      request.id = String(id);

      await adminPageApi.updateItem(request);

      return;
    }

    await adminPageApi.createItem(request);
  };

  return {
    valuesState,
    setValuesState,
    saveForm,
  };
};
