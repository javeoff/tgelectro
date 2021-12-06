import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';

import { commonSlice } from '@common/duck/slice';
import { loginSlice } from '@pages/login/duck/slice';
import { Feature } from '@common/enums/Feature';

const reducer = {
  [commonSlice.name]: commonSlice.reducer,
  [Feature.LOGIN_PAGE]: loginSlice.reducer,
};

export type IRootState = StateFromReducersMapObject<typeof reducer>;

export const store = configureStore({ reducer });
