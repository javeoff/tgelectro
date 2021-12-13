import { connect, ConnectedProps } from 'react-redux';

import { pageIdSelector } from '@common/duck/selectors';
import { IRootState } from '@common/redux/store';

export const withNavbarState = connect(
  (state: IRootState) => ({
    currentPage: pageIdSelector(state),
  }),
  () => ({}),
);

export type TWithNavbarState = ConnectedProps<typeof withNavbarState>;
