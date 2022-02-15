import { Dispatch, FC, SetStateAction, useRef } from 'react';
import styled from 'styled-components';

import { InputField } from '@pages/admin/components/InputField/InputField';
import {
  editItemTranslation,
  fieldTypeTranslation,
} from '@pages/admin/utils/translation';
import { Button } from '@components/Button/Button';
import { TValue, TValuesState } from '@pages/admin/types/TValuesState';
import { EntityInput } from '@pages/admin/components/InputForm/components/EntityInput';
import { TEntityValue } from '@pages/admin/components/InputForm/types/TEntityValue';
import { adminPageApi } from '@pages/admin/api/AdminPageApi';
import { ListName } from '@pages/admin/enums/ListName';
import { isFile } from '@pages/admin/components/InputForm/guards/isFile';
import { isEntity } from '@pages/admin/components/InputForm/guards/isEntity';

interface IProps {
  setValuesState: Dispatch<SetStateAction<TValuesState>>;
  valuesState: TValuesState;
  saveForm(): Promise<void>;
  type: ListName;
}

export const InputForm: FC<IProps> = ({
  setValuesState,
  valuesState,
  saveForm,
  type,
}) => {
  const linkIsAutoEditable = useRef(true);

  const onInputChange = (value: TValue, valuesKey: string): void => {
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

  const getInputList = (): JSX.Element[] =>
    Object.keys(valuesState).map((valueKey, idx) => {
      const value = valuesState[valueKey];

      if (valueKey === 'link' || valueKey === 'id' || valueKey === 'children') {
        return <></>;
      }

      if (isEntity(value)) {
        const onActiveValueChange = (
          activeValue: Record<string, unknown> | null,
        ): void => {
          onInputChange(activeValue, valueKey);
          // eslint-disable-next-line no-console
          console.log('change', activeValue, valueKey, valuesState);
        };

        const getEntityValues = (
          searchValue?: string,
        ): Promise<TEntityValue[]> =>
          adminPageApi.getFieldData(type, valueKey, searchValue);

        return (
          <EntityInput
            key={idx}
            getValues={getEntityValues}
            label={`${fieldTypeTranslation[valueKey]} ${editItemTranslation[type]}`}
            initialName={
              value && typeof value === 'object' && 'name' in value
                ? (value?.name as string)
                : undefined
            }
            onActiveValueChange={onActiveValueChange}
          />
        );
      }

      if (isFile(value) || typeof value === 'string') {
        return (
          <InputField
            key={idx}
            value={isFile(value) ? value.name : value}
            isDisabled={valueKey === 'id'}
            label={`${fieldTypeTranslation[valueKey]} ${editItemTranslation[type]}`}
            onChange={onInputChange}
            onBlur={(blurValue) => onInputBlur(blurValue, valueKey)}
            inputKey={valueKey}
          />
        );
      }

      return <></>;
    });

  return (
    <>
      {valuesState &&
        getInputList().map((inputField, idx) => (
          <SInputField key={idx}>{inputField}</SInputField>
        ))}
      <Button onClick={() => saveForm()}>Сохранить данные</Button>
    </>
  );
};

const SInputField = styled.div`
  margin-top: 10px;
`;
