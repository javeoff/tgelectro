import { connect, ConnectedProps } from 'react-redux';

import { commonSlice } from '@common/duck/slice';

export const withAuthPageState = connect(() => ({}), {
  addPopup: commonSlice.actions.addPopup,
});

export type IWithAuthPageState = ConnectedProps<typeof withAuthPageState>;
