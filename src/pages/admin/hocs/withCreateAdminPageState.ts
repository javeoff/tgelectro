import { connect, ConnectedProps } from 'react-redux';

import { commonSlice } from '@common/duck/slice';

export const withCreateAdminPageState = connect(() => ({}), {
  addPopup: commonSlice.actions.addPopup,
});

export type IWithCreateAdminPageState = ConnectedProps<
  typeof withCreateAdminPageState
>;
