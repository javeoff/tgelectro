import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { useClickAway, useDebounce, useEffectOnce } from 'react-use';

import { Input } from '@components/Input/Input';
import { mainColor } from '@common/utils/colors';
import { TEntityValue } from '@pages/admin/components/InputForm/types/TEntityValue';

interface IProps {
  initialName: string | undefined;
  onActiveValueChange?: (entity: TEntityValue | null) => void;
  label?: string;
  getValues(searchValue?: string): Promise<TEntityValue[]>;
}
export const EntityInput: FC<IProps> = ({
  initialName,
  onActiveValueChange,
  label,
  getValues,
}) => {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [isToggle, setIsToggle] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useClickAway(wrapperRef, () => {
    setIsToggle(false);
  });

  const [values, setValues] = useState<TEntityValue[] | undefined>([]);
  const [activeValue, setActiveValue] = useState<TEntityValue | null>();

  useEffectOnce(() => {
    (async () => {
      const loadedValues = await getValues();
      const initialActiveValue =
        loadedValues.find((item) => item.name === initialName) || null;

      setSearchValue(initialActiveValue?.name);
      setValues(loadedValues);
      setActiveValue(initialActiveValue);

      if (onActiveValueChange) {
        onActiveValueChange(initialActiveValue);
      }
    })();
  });

  // eslint-disable-next-line no-console
  console.log('active', activeValue);

  const onChange = (idx: number): void => {
    if (!values) {
      return;
    }

    const value = values[idx];

    setIsToggle(false);
    setActiveValue(value);
    setSearchValue(value.name);

    if (onActiveValueChange) {
      onActiveValueChange(value);
    }
  };

  useDebounce(
    async () => {
      setValues(await getValues(searchValue));
    },
    500,
    [searchValue],
  );

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;

    if (onActiveValueChange && value === '') {
      onActiveValueChange(null);
    }

    setSearchValue(value);
  };

  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      onChange(0);
    }
  };

  return (
    <SWrapper>
      {label && <div>{label}</div>}
      <div ref={wrapperRef}>
        <Input
          isFluid={true}
          value={searchValue}
          onChange={(e) => onSearchInputChange(e)}
          onKeyPress={(e) => onEnterPress(e)}
          onFocus={() => setIsToggle(true)}
          onClick={() => setIsToggle(true)}
        />
        {isToggle && (
          <SDropdown>
            {values?.length &&
              values.map((value, idx) => (
                <SDropdownItem
                  role='radio'
                  tabIndex={0}
                  aria-checked={value.name === activeValue?.name}
                  key={idx}
                  onKeyDown={() => onChange(idx)}
                  onClick={() => onChange(idx)}
                >
                  {value.name}
                </SDropdownItem>
              ))}
          </SDropdown>
        )}
      </div>
    </SWrapper>
  );
};

const SWrapper = styled.div`
  position: relative;
`;
const SDropdown = styled.div`
  margin-top: 5px;
  border-radius: 5px;
  position: absolute;
  z-index: 2;
  width: 100%;
  background: #fff;
  display: block;
  border: 1px solid #eee;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
`;
const SDropdownItem = styled.div`
  padding: 2px 5px;
  border-radius: 5px;
  border-bottom: 1px solid #eee;

  &:hover {
    background: ${mainColor};
    color: #fff;
    cursor: pointer;
  }
`;
