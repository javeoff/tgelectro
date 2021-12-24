import { PayloadAction } from '@reduxjs/toolkit';

import { ModalType } from '@components/Modal/enums/ModalType';
import { PageName } from '@common/enums/PageName';
// eslint-disable-next-line import/no-cycle
import { createFeatureSlice } from '@common/redux/utils/createFeatureSlice';
import { IBaseFeatureState } from '@common/redux/types/IBaseFeatureState';
import { Feature } from '@common/enums/Feature';
import { ICategory } from '@server/Categories/types/ICategory';
import { IPopup } from '@components/Popup/types/IPopup';

export interface ICommonProps {
  pageId: PageName;
  categories: ICategory[];
}

export interface ICommon {
  modalId: ModalType | undefined;
  defaultModalInputValue: string;
  popups: IPopup[];
}

type ICommonState = ICommon & IBaseFeatureState<ICommonProps>;

export const commonSlice = createFeatureSlice({
  name: Feature.COMMON,
  initialState: {
    state: {
      pageId: PageName.INDEX,
      categories: [],
    },
    modalId: undefined,
    popups: [],
    defaultModalInputValue: '',
  } as ICommonState,
  reducers: {
    setPageId: (draft, { payload }: PayloadAction<PageName>) => {
      draft.state.pageId = payload;
    },
    setModalId: (draft, { payload }: PayloadAction<ModalType | undefined>) => {
      draft.modalId = payload;
    },
    setDefaultModalInputValue: (draft, { payload }: PayloadAction<string>) => {
      draft.defaultModalInputValue = payload;
    },
    addPopup: (draft, { payload }: PayloadAction<IPopup>) => {
      draft.popups = [...draft.popups, payload];
    },
  },
});
