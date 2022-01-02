import { connect, ConnectedProps } from 'react-redux';

import { commonSlice } from '@common/duck/slice';

export const withProductPageState = connect(() => ({}), {
  setModalId: commonSlice.actions.setModalId,
  setDefaultModalInputValue: commonSlice.actions.setDefaultModalInputValue,
});

export type IWithProductPageState = ConnectedProps<typeof withProductPageState>;
