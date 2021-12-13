import { connect, ConnectedProps } from 'react-redux';

import { commonSlice } from '@common/duck/slice';

export const withContactsPageState = connect(() => ({}), {
  setModalId: commonSlice.actions.setModalId,
});

export type IWithContactsPageState = ConnectedProps<
  typeof withContactsPageState
>;
