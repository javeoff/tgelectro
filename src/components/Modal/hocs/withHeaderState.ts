import { connect, ConnectedProps } from 'react-redux';

import { IRootState } from '@common/redux/store';
import { commonSlice } from '@common/duck/slice';
import {
  defaultModalInputValueSelector,
  modalIdSelector,
} from '@common/duck/selectors';

export const withModalState = connect(
  (state: IRootState) => ({
    modalId: modalIdSelector(state),
    defaultModalInputValue: defaultModalInputValueSelector(state),
  }),
  {
    closeModal: () => commonSlice.actions.setModalId(undefined),
    setModalId: commonSlice.actions.setModalId,
  },
);

export type IWithModalState = ConnectedProps<typeof withModalState>;
