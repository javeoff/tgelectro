import {
  configureStore,
  EnhancedStore,
  Middleware,
  StateFromReducersMapObject,
  StoreEnhancer,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

// eslint-disable-next-line import/no-cycle
import { commonSlice } from '@common/duck/slice';
import { loginSlice } from '@pages/login/duck/slice';
import { Feature } from '@common/enums/Feature';

const reducer = {
  [commonSlice.name]: commonSlice.reducer,
  [Feature.LOGIN_PAGE]: loginSlice.reducer,
};

export const setStates = {
  [commonSlice.name]: commonSlice.actions.setState,
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
