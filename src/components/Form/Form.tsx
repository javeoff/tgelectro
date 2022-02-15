import { FC } from 'react';
import styled from 'styled-components';
import { useSetState } from 'react-use';

import { Textarea } from '@components/Textarea/Input';
import { Input } from '@components/Input/Input';
import { Button } from '@components/Button/Button';
import { apiForm } from '@components/Form/api/ApiForm';
import { SendEmailRequest } from '@server/Email/dto/SendEmailRequest';
import {
  IWithFormState,
  withFormState,
} from '@components/Form/hocs/withFormState';

interface IProps {
  onSend?: VoidFunction;
  showInputs?: {
    description?: boolean;
    name?: boolean;
    phone?: boolean;
    email?: boolean;
  };
  defaultDescriptionInputValue?: string;
}

const FormComponent: FC<IProps & IWithFormState> = ({
  onSend,
  showInputs,
  defaultDescriptionInputValue = '',
  addPopup,
}) => {
  const [formState, setFormState] = useSetState<
    SendEmailRequest & { isPolicyChecked: boolean; file?: File }
  >({
    description: defaultDescriptionInputValue,
    name: '',
    phone: '',
    email: '',
    file: undefined,
    isPolicyChecked: true,
  });

  const onFormSubmit = async (): Promise<void> => {
    if (!formState.isPolicyChecked) {
      return;
    }

    const { file, isPolicyChecked, ...dto } = formState;

    if (showInputs) {
      // eslint-disable-next-line no-restricted-syntax
      for (const inputName in showInputs) {
        if (showInputs[inputName] && !dto[inputName]) {
          addPopup({
            title: 'Ошибка',
            description: `Поле ${inputName} пустое`,
          });

          return;
        }
      }
    }

    await apiForm.emailSend(dto, file);

    addPopup({
      title: 'Успешно',
      description: 'Сообщение отправлено',
    });

    if (onSend) {
      onSend();
    }
  };

  return (
    <SFormArea>
      {showInputs?.description && (
        <div>
          <Textarea
            value={formState.description}
            onChange={(e) => setFormState({ description: e.target.value })}
            isFluid={true}
            placeholder='Введите артикул или описание'
          />
        </div>
      )}
      {showInputs?.name && (
        <div>
          <Input
            value={formState.name}
            onChange={(e) => setFormState({ name: e.target.value })}
            isFluid={true}
            placeholder='Имя'
          />
        </div>
      )}
      {showInputs?.phone && (
        <div>
          <Input
            value={formState.phone}
            onChange={(e) => setFormState({ phone: e.target.value })}
            isFluid={true}
            placeholder='Телефон'
          />
        </div>
      )}
      {showInputs?.email && (
        <div>
          <Input
            value={formState.email}
            onChange={(e) => setFormState({ email: e.target.value })}
            isFluid={true}
            placeholder='Почта'
          />
        </div>
      )}

      <div>
        <Input
          onChange={(e) =>
            e.target.files && setFormState({ file: e.target.files[0] })
          }
          type='file'
          isFluid={true}
        />
      </div>

      <SPoliticsWrapper>
        <input
          type='checkbox'
          checked={formState.isPolicyChecked}
          onChange={() =>
            setFormState({ isPolicyChecked: !formState.isPolicyChecked })
          }
        />
        <div>
          Согласие с условиями политики конфиденциальности и пользовательского
          соглашения
        </div>
      </SPoliticsWrapper>

      <Button isFluid={true} onClick={onFormSubmit}>
        Отправить запрос
      </Button>
    </SFormArea>
  );
};

export const Form = withFormState(FormComponent);

const SPoliticsWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: flex-start;

  & input {
    cursor: pointer;
    margin-top: 5px;
    width: 15px;
    height: 15px;
  }

  & div {
    margin-left: 10px;
    font-size: 12px;
    width: 300px;
  }
`;
const SFormArea = styled.div`
  & > div {
    margin-top: 10px;
  }
`;
