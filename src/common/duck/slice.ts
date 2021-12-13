import { PayloadAction } from '@reduxjs/toolkit';

import { ModalType } from '@components/Modal/enums/ModalType';
import { PageName } from '@common/enums/PageName';
import { createFeatureSlice } from '@common/redux/utils/createFeatureSlice';
import { IBaseFeatureState } from '@common/redux/types/IBaseFeatureState';
import { Feature } from '@common/enums/Feature';
import { ICategory } from '@server/Categories/types/ICategory';

export interface ICommonProps {
  pageId: PageName;
  categories: ICategory[];
}

export interface ICommonState extends IBaseFeatureState<ICommonProps> {
  modalId: ModalType | undefined;
  defaultModalInputValue: string;
}

export const commonSlice = createFeatureSlice({
  name: Feature.COMMON,
  initialState: {
    state: {
      pageId: PageName.INDEX,
      categories: [],
    },
    modalId: undefined,
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
  },
});
