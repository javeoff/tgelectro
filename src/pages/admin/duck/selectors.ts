import { createSelector } from '@reduxjs/toolkit';

import { getFeatureSelector } from '@common/redux/selectors/getFeatureSelector';
import { Feature } from '@common/enums/Feature';

export const adminPageSelector = getFeatureSelector(Feature.ADMIN);

export const activeListSelector = createSelector(
  adminPageSelector,
  (feature) => feature.state.activeList,
);

export const listsSelector = createSelector(
  adminPageSelector,
  (feature) => feature.state.lists,
);

export const listLengthSelector = createSelector(
  adminPageSelector,
  (feature) => feature.state.listLengths,
);
