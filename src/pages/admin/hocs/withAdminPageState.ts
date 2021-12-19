import { connect, ConnectedProps } from 'react-redux';

import { activeListSelector, listsSelector } from '@pages/admin/duck/selectors';
import { IRootState } from '@common/redux/store';

export const withAdminPageState = connect(
  (state: IRootState) => ({
    activeList: activeListSelector(state),
    lists: listsSelector(state),
  }),
  {},
);

export type IWithAdminPageState = ConnectedProps<typeof withAdminPageState>;
