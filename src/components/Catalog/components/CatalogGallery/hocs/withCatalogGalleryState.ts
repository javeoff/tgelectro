import { connect, ConnectedProps } from 'react-redux';

import { ModalType } from '@components/Modal/enums/ModalType';
import { commonSlice } from '@common/duck/slice';

export const withCatalogGalleryState = connect(() => ({}), {
  openOrderModal: () => commonSlice.actions.setModalId(ModalType.ORDER_MODAL),
});

export type IWithCatalogGalleryState = ConnectedProps<
  typeof withCatalogGalleryState
>;
