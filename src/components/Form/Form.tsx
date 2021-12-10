import { FC, useState } from 'react';
import styled from 'styled-components';

import { Textarea } from '@components/Textarea/Input';
import { Input } from '@components/Input/Input';
import { Button } from '@components/Button/Button';

interface IProps {
  descriptionInput?: boolean;
  nameInput?: boolean;
  phoneInput?: boolean;
  emailInput?: boolean;
  defaultDescriptionInputValue?: string;
}

export const Form: FC<IProps> = ({
  descriptionInput,
  nameInput,
  phoneInput,
  emailInput,
  defaultDescriptionInputValue = '',
}) => {
  const [isPolicyChecked, setIsPolicyChecked] = useState<boolean>(true);

  return (
    <SFormArea>
      {descriptionInput && (
        <div>
          <Textarea
            defaultValue={defaultDescriptionInputValue}
            isFluid={true}
            placeholder='Введите артикул или описание'
          />
        </div>
      )}
      {nameInput && (
        <div>
          <Input isFluid={true} placeholder='Имя' />
        </div>
      )}
      {phoneInput && (
        <div>
          <Input isFluid={true} placeholder='Телефон' />
        </div>
      )}
      {emailInput && (
        <div>
          <Input isFluid={true} placeholder='Почта' />
        </div>
      )}

      <SPoliticsWrapper>
        <input
          type='checkbox'
          defaultChecked={isPolicyChecked}
          onClick={() => setIsPolicyChecked(!isPolicyChecked)}
        />
        <div>
          Согласие с условиями политики конфиденциальности и пользовательского
          соглашения
        </div>
      </SPoliticsWrapper>

      <Button isFluid={true}>Отправить запрос</Button>
    </SFormArea>
  );
};

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
