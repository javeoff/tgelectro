import { Dispatch, FC, SetStateAction, useRef } from 'react';
import styled from 'styled-components';

import { InputField } from '@pages/admin/components/InputField/InputField';
import {
  editItemTranslation,
  fieldTypeTranslation,
} from '@pages/admin/utils/translation';
import { Button } from '@components/Button/Button';

interface IProps {
  setValuesState: Dispatch<SetStateAction<Record<string, string>>>;
  valuesState: Record<string, string>;
  onSaveData(): Promise<void>;
  type: string;
}

export const InputForm: FC<IProps> = ({
  setValuesState,
  valuesState,
  onSaveData,
  type,
}) => {
  const linkIsAutoEditable = useRef(true);

  const onInputChange = (value: string, valuesKey: string): void => {
    void setValuesState({
      ...valuesState,
      [valuesKey]: value,
    });
  };

  const onInputBlur = (value: string, key): void => {
    if (key === 'link' && value === '') {
      linkIsAutoEditable.current = true;
    }

    if (key === 'name') {
      linkIsAutoEditable.current = false;
    }
  };

  return (
    <>
      {valuesState &&
        Object.keys(valuesState).map(
          (key, idx) =>
            key !== 'link' && (
              <SInputField key={idx}>
                <InputField
                  value={valuesState[key]}
                  isDisabled={key === 'id'}
                  label={`${fieldTypeTranslation[key]} ${editItemTranslation[type]}`}
                  onChange={onInputChange}
                  onBlur={(value) => onInputBlur(value, key)}
                  inputKey={key}
                />
              </SInputField>
            ),
        )}
      <Button onClick={onSaveData}>Сохранить данные</Button>
    </>
  );
};

const SInputField = styled.div`
  margin-top: 10px;
`;
