import { connect, ConnectedProps } from 'react-redux';

import { IRootState } from '@common/redux/store';
import { adminSlice } from '@pages/admin/duck/slice';
import { activeListSelector, listLengthSelector } from '@pages/admin/duck/selectors';

export const withSidebarState = connect(
  (state: IRootState) => ({
    activeList: activeListSelector(state),
    listLengths: listLengthSelector(state),
  }),
  {
    setActiveList: adminSlice.actions.setActiveList,
  },
);

export type IWithSidebarState = ConnectedProps<typeof withSidebarState>;
