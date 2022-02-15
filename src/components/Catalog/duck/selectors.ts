import { createSelector } from '@reduxjs/toolkit';

import { getFeatureSelector } from '@common/redux/selectors/getFeatureSelector';
import { Feature } from '@common/enums/Feature';

export const catalogSelector = getFeatureSelector(Feature.CATALOG);

export const fabricatorsSelector = createSelector(
  catalogSelector,
  (feature) => feature.state.fabricators,
);
