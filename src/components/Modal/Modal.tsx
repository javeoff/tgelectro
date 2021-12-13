import { FC } from 'react';

import {
  IWithModalState,
  withModalState,
} from '@components/Modal/hocs/withHeaderState';
import { OrderModal } from '@components/Modal/components/OrderModal/OrderModal';
import { FeedbackModal } from '@components/Modal/components/FeedbackModal/FeedbackModal';
import { ModalType } from '@components/Modal/enums/ModalType';

const ModalComponent: FC<IWithModalState> = ({
  modalId,
  setModalId,
  defaultModalInputValue,
}) => {
  const toggleModal = (): void => {
    setModalId(modalId !== undefined ? undefined : modalId);
  };

  switch (modalId) {
    case ModalType.ORDER_MODAL:
      return (
        <OrderModal
          defaultDescriptionInputValue={defaultModalInputValue}
          toggleModal={toggleModal}
          isActive={modalId === 0}
        />
      );
    case ModalType.FEEDBACK_MODAL:
      return (
        <FeedbackModal toggleModal={toggleModal} isActive={modalId === 1} />
      );
    default:
      return <></>;
  }
};

export const Modal = withModalState(ModalComponent);
