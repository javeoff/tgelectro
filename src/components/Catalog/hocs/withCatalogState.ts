import { connect, ConnectedProps } from 'react-redux';

import { fabricatorsSelector } from '@components/Catalog/duck/selectors';
import { IRootState } from '@common/redux/store';

export const withCatalogState = connect(
  (state: IRootState) => ({
    fabricators: fabricatorsSelector(state),
  }),
  () => ({}),
);

export type IWithCatalogState = ConnectedProps<typeof withCatalogState>;
