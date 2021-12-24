import { connect, ConnectedProps } from 'react-redux';

import { commonSlice } from '@common/duck/slice';

export const withEditAdminPageState = connect(() => ({}), {
  addPopup: commonSlice.actions.addPopup,
});

export type IWithEditAdminPageState = ConnectedProps<
  typeof withEditAdminPageState
>;
