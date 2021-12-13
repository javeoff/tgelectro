import { EnhancedStore } from '@reduxjs/toolkit';

import { IRootState, setStates } from '@common/redux/store';
import { IPageProps } from '@common/types/next/IPageProps';
import { Feature } from '@common/enums/Feature';

export const setFeaturesState = (
  appProps: IPageProps,
  store: EnhancedStore<IRootState>,
): void => {
  if (!appProps || !('features' in appProps)) {
    return;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const feature of Object.keys(appProps.features || {})) {
    const setState = setStates[feature as Feature];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const state = appProps.features[feature];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    store.dispatch(setState(state));
  }
};
