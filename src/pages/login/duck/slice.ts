import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Feature } from '@common/enums/Feature';

export interface ILoginState {
  username: string;
}

export const loginSlice = createSlice({
  name: Feature.LOGIN_PAGE,
  initialState: {
    username: 'username',
  } as ILoginState,
  reducers: {
    setUsername: (draft, { payload }: PayloadAction<string>) => {
      draft.username = payload;
    },
  },
});
