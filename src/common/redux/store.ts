import {
  configureStore,
  EnhancedStore,
  Middleware,
  StateFromReducersMapObject,
  StoreEnhancer,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { commonSlice } from '@common/duck/slice';
import { Feature } from '@common/enums/Feature';
import { adminSlice } from '@pages/admin/duck/slice';
import { catalogSlice } from '@components/Catalog/duck/slice';

const reducer = {
  [Feature.COMMON]: commonSlice.reducer,
  // [Feature.AUTH]: authSlice.reducer,
  [Feature.CATALOG]: catalogSlice.reducer,
  [Feature.ADMIN]: adminSlice.reducer,
};

export const setStates = {
  [Feature.COMMON]: commonSlice.actions.setState,
  [Feature.CATALOG]: catalogSlice.actions.setState,
  [Feature.ADMIN]: adminSlice.actions.setState,
};

export type IRootState = StateFromReducersMapObject<typeof reducer>;

export const initializeStore = (
  preloadedState?: IRootState,
  middlewares: Middleware[] = [],
  enhancers: StoreEnhancer[] = [],
): EnhancedStore<IRootState> =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        // Отключена проверка осознанно - для того, чтобы пробрасывать инсансы ошибок в action'ах
        serializableCheck: false,
      }).prepend(...middlewares),
    preloadedState,
    enhancers,
  });

export const wrapper = createWrapper(() => initializeStore());
