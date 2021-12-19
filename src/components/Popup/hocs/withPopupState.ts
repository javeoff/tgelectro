import { connect, ConnectedProps } from 'react-redux';

import { IRootState } from '@common/redux/store';
import { popupsSelector } from '@common/duck/selectors';

export const withPopupState = connect(
  (state: IRootState) => ({
    popups: popupsSelector(state),
  }),
  () => ({}),
);

export type IWithPopupState = ConnectedProps<typeof withPopupState>;
