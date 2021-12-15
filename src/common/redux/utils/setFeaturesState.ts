import { EnhancedStore } from '@reduxjs/toolkit';

import { IRootState, setStates } from '@common/redux/store';
import { Feature } from '@common/enums/Feature';
import { IBasePageResponse } from '@common/types/next/IBasePageResponse';
import { IPageProps } from '@common/types/next/IPageProps';

export const setFeaturesState = (
  appProps: IBasePageResponse | IPageProps,
  store: EnhancedStore<IRootState>,
): void => {
  if ('features' in appProps) {
    Object.keys(appProps.features || {}).forEach((feature) => {
      const setState = setStates[feature as Feature];

      const state = appProps.features[feature];

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      store.dispatch(setState(state));
    });
  }
};
