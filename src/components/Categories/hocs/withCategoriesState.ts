import { connect, ConnectedProps } from 'react-redux';

import { IRootState } from '@common/redux/store';
import { categoriesSelector } from '@common/duck/selectors';

export const withCategoriesState = connect(
  (state: IRootState) => ({
    categories: categoriesSelector(state),
  }),
  () => ({}),
);

export type IWithCategoriesState = ConnectedProps<typeof withCategoriesState>;
