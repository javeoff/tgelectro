import { connect, ConnectedProps } from 'react-redux';

import { commonSlice } from '@common/duck/slice';

export const withHeaderState = connect(() => ({}), {
  setModalId: commonSlice.actions.setModalId,
});

export type IWithHeaderState = ConnectedProps<typeof withHeaderState>;
