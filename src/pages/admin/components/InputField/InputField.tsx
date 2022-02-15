import { FC, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { Input } from '@components/Input/Input';
import { Button } from '@components/Button/Button';

interface IProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'> {
  onChange?(value: string | File, key: string): void;
  onBlur?(value: string): void;
  isDisabled?: boolean;
  label?: string;
  inputKey: string;
}

export const InputField: FC<IProps> = ({
  onChange,
  onBlur,
  isDisabled,
  label,
  value,
  inputKey,
  ...props
}) => {
  const firstMount = useRef(0);
  const inputRef = useRef<HTMLInputElement>();
  const [isHidden, setIsHidden] = useState<boolean>(!!firstMount && !!value);

  useEffect(() => {
    if (!firstMount.current) {
      firstMount.current = 1;
    }
  }, []);

  const onLoadImage = (): void => {
    setIsHidden(false);
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      {label && <div>{label}</div>}
      {inputKey === 'imageUrl' && (
        <>
          {isHidden && (
            <>
              <SImage onClick={onLoadImage}>
                <img src={value as string} alt='entity' height={60} />
              </SImage>
            </>
          )}
          <SFileInput hidden={isHidden}>
            <Input
              ref={inputRef}
              type='file'
              accept='image/*'
              onChange={(e) =>
                onChange &&
                e.currentTarget.files &&
                e.currentTarget.files.length > 0 &&
                onChange(e.currentTarget.files[0], inputKey)
              }
            />
          </SFileInput>
        </>
      )}
      {inputKey !== 'imageUrl' && (
        <Input
          disabled={isDisabled}
          isFluid={true}
          value={value}
          onChange={(e) =>
            onChange && onChange(e.currentTarget.value, inputKey)
          }
          onBlur={(e) => onBlur && onBlur(e.currentTarget.value)}
          {...props}
        />
      )}
    </>
  );
};

const SFileInput = styled.div<{ hidden: boolean }>`
  ${({ hidden }) =>
    hidden &&
    css`
      display: none;
    `}
`;
const SImage = styled.div`
  position: relative;
  width: max-content;
  margin: 10px 0;
  cursor: pointer;
  z-index: 0;

  &:hover:after {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    content: '✎';
    color: #fff;
  }
`;
