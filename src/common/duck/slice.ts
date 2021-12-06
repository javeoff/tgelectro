import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICommonState {
  modalId: number | undefined;
  defaultModalInputValue: string;
}

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    modalId: undefined,
    defaultModalInputValue: '',
  } as ICommonState,
  reducers: {
    setModalId: (draft, { payload }: PayloadAction<number | undefined>) => {
      draft.modalId = payload;
    },
    setDefaultModalInputValue: (draft, { payload }: PayloadAction<string>) => {
      draft.defaultModalInputValue = payload;
    },
  },
});
