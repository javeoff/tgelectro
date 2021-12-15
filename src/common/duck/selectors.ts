import { createSelector } from '@reduxjs/toolkit';

import { getFeatureSelector } from '@common/redux/selectors/getFeatureSelector';
import { Feature } from '@common/enums/Feature';

export const commonSelector = getFeatureSelector(Feature.COMMON);

export const categoriesSelector = createSelector(
  commonSelector,
  (feature) => feature.state.categories,
);

export const pageIdSelector = createSelector(
  commonSelector,
  (feature) => feature.state.pageId,
);

export const modalIdSelector = createSelector(
  commonSelector,
  (feature) => feature.modalId,
);

export const defaultModalInputValueSelector = createSelector(
  commonSelector,
  (feature) => feature.defaultModalInputValue,
);
