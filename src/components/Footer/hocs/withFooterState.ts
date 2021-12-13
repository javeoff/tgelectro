import { connect, ConnectedProps } from 'react-redux';

import { IRootState } from '@common/redux/store';
import { categoriesSelector } from '@common/duck/selectors';

export const withFooterState = connect(
  (state: IRootState) => ({
    categories: categoriesSelector(state),
  }),
  () => ({}),
);

export type IWithFooterState = ConnectedProps<typeof withFooterState>;
