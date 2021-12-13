import { createSelector } from '@reduxjs/toolkit';

import { IRootState } from '@common/redux/store';

export const commonSelector = createSelector(
  (state: IRootState) => state.common,
  (feature) => feature,
);

export const pageIdSelector = createSelector(
  commonSelector,
  (feature) => feature.state.pageId,
);

export const categoriesSelector = createSelector(
  commonSelector,
  (feature) => feature.state.categories,
);

export const modalIdSelector = createSelector(
  commonSelector,
  (feature) => feature.modalId,
);

export const defaultModalInputValueSelector = createSelector(
  commonSelector,
  (feature) => feature.defaultModalInputValue,
);
