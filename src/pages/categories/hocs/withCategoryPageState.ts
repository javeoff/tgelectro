import { connect, ConnectedProps } from 'react-redux';

import { commonSlice } from '@common/duck/slice';

export const withCategoryPageState = connect(() => ({}), {
  setModalId: commonSlice.actions.setModalId,
  setDefaultModalInputValue: commonSlice.actions.setDefaultModalInputValue,
});

export type IWithCategoryPageState = ConnectedProps<
  typeof withCategoryPageState
>;
