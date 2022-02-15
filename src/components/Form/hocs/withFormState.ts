import { connect, ConnectedProps } from 'react-redux';

import { commonSlice } from '@common/duck/slice';

export const withFormState = connect(() => ({}), {
  addPopup: commonSlice.actions.addPopup,
});

export type IWithFormState = ConnectedProps<typeof withFormState>;
