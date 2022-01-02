import { connect, ConnectedProps } from 'react-redux';

import { commonSlice } from '@common/duck/slice';

export const withProductsTableState = connect(() => ({}), {
  setModalId: commonSlice.actions.setModalId,
  setDefaultModalInputValue: commonSlice.actions.setDefaultModalInputValue,
});

export type IWithProductsTableState = ConnectedProps<
  typeof withProductsTableState
>;
