import { createSelector } from '@reduxjs/toolkit';

import { IRootState } from '@common/redux/store';

export const commonSelector = createSelector(
  (state: IRootState) => state.common,
  (feature) => feature,
);

export const modalIdSelector = createSelector(
  commonSelector,
  (state) => state.modalId,
);

export const defaultModalInputValueSelector = createSelector(
  commonSelector,
  (state) => state.defaultModalInputValue,
);
