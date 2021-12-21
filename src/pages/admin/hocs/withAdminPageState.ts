import { connect, ConnectedProps } from 'react-redux';

import { activeListSelector, listsSelector } from '@pages/admin/duck/selectors';
import { IRootState } from '@common/redux/store';
import { adminSlice } from '@pages/admin/duck/slice';

export const withAdminPageState = connect(
  (state: IRootState) => ({
    activeList: activeListSelector(state),
    lists: listsSelector(state),
  }),
  {
    setLists: adminSlice.actions.setLists,
  },
);

export type IWithAdminPageState = ConnectedProps<typeof withAdminPageState>;
