import { PayloadAction } from '@reduxjs/toolkit';

import { Feature } from '@common/enums/Feature';
import { ListName } from '@pages/admin/enums/ListName';
import { IRow } from '@pages/admin/components/Table/types/IRow';
import { createFeatureSlice } from '@common/redux/utils/createFeatureSlice';
import { IBaseFeatureState } from '@common/redux/types/IBaseFeatureState';

type IAdminState = IBaseFeatureState<{
  activeList: ListName;
  lists: Record<ListName, IRow[]>;
  listLengths: Record<ListName, number>;
}>;

export const adminSlice = createFeatureSlice({
  name: Feature.ADMIN,
  initialState: {
    state: {
      activeList: ListName.CATEGORIES,
      lists: {},
      listLengths: {},
    },
  } as IAdminState,
  reducers: {
    setActiveList: (draft, { payload }: PayloadAction<ListName>) => {
      draft.state.activeList = payload;
    },
  },
});
