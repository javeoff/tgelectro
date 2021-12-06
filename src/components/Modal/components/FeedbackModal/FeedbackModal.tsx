import { FC } from 'react';
import { Button, Modal as ModalCard, ModalBody, ModalHeader } from 'reactstrap';

import { Form } from '@components/Form/Form';

interface IProps {
  toggleModal(): void;
  isActive: boolean;
}

export const FeedbackModal: FC<IProps> = ({ toggleModal, isActive }) => (
  <ModalCard toggle={toggleModal} isOpen={isActive}>
    <ModalHeader
      close={
        <Button type='button' onClick={toggleModal}>
          ×
        </Button>
      }
      toggle={toggleModal}
    >
      Заказать звонок
    </ModalHeader>
    <ModalBody>
      <Form phoneInput={true} nameInput={true} />
    </ModalBody>
  </ModalCard>
);
