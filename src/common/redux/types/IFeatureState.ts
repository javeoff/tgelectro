import { IRootState } from '@common/redux/store';
import { Feature } from '@common/enums/Feature';

export type IFeatureState<FeatureName extends Feature> =
  IRootState[FeatureName]['state'];
