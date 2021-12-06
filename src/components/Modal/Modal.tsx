import { FC } from 'react';

import {
  IWithModalState,
  withModalState,
} from '@components/Modal/hocs/withHeaderState';
import { OrderModal } from '@components/Modal/components/OrderModal/OrderModal';
import { FeedbackModal } from '@components/Modal/components/FeedbackModal/FeedbackModal';

const ModalComponent: FC<IWithModalState> = ({
  modalId,
  setModalId,
  defaultModalInputValue,
}) => {
  const toggleModal = (): void => {
    setModalId(modalId !== undefined ? undefined : modalId);
  };

  switch (modalId) {
    case 0:
      return (
        <OrderModal
          defaultDescriptionInputValue={defaultModalInputValue}
          toggleModal={toggleModal}
          isActive={modalId === 0}
        />
      );
    case 1:
      return (
        <FeedbackModal toggleModal={toggleModal} isActive={modalId === 1} />
      );
    default:
      return <></>;
  }
};

export const Modal = withModalState(ModalComponent);
