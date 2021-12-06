import { FC } from 'react';
import { Button, Modal as ModalCard, ModalBody, ModalHeader } from 'reactstrap';
import styled from 'styled-components';

import { Form } from '@components/Form/Form';

interface IProps {
  toggleModal(): void;
  isActive: boolean;
  defaultDescriptionInputValue: string;
}

export const OrderModal: FC<IProps> = ({
  toggleModal,
  isActive,
  defaultDescriptionInputValue,
}) => (
  <ModalCard toggle={toggleModal} isOpen={isActive}>
    <ModalHeader
      close={
        <Button type='button' onClick={toggleModal}>
          ×
        </Button>
      }
      toggle={toggleModal}
    >
      Моментальный запрос по ценам и срокам
    </ModalHeader>
    <ModalBody>
      <SDescription>Ответим на ваш запрос в течение 15 минут</SDescription>
      <SForm>
        <Form
          descriptionInput={true}
          phoneInput={true}
          emailInput={true}
          defaultDescriptionInputValue={defaultDescriptionInputValue}
        />
      </SForm>
    </ModalBody>
  </ModalCard>
);

const SDescription = styled.div`
  font-size: 16px;
`;
const SForm = styled.div`
  margin-top: 20px;
`;
