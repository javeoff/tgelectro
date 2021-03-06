import { IRootState } from '@common/redux/store';
import { Feature } from '@common/enums/Feature';

export const getFeatureSelector =
  <FeatureName extends Feature>(feature: FeatureName) =>
  (state: IRootState): IRootState[FeatureName] =>
    state[feature];
