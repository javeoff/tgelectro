import { connect, ConnectedProps } from 'react-redux';

import { commonSlice } from '@common/duck/slice';

export const withFabricatorPageState = connect(() => ({}), {
  setModalId: commonSlice.actions.setModalId,
  setDefaultModalInputValue: commonSlice.actions.setDefaultModalInputValue,
});

export type IWithFabricatorPageState = ConnectedProps<
  typeof withFabricatorPageState
>;
