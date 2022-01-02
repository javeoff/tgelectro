import { FC, InputHTMLAttributes } from 'react';

import { Input } from '@components/Input/Input';

interface IProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'> {
  onChange?(value: string, key: string): void;
  onBlur?(value: string): void;
  isDisabled?: boolean;
  label: string;
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
}) => (
  <>
    {label && <div>{label}</div>}
    <Input
      disabled={isDisabled}
      isFluid={true}
      value={value}
      onChange={(e) => onChange && onChange(e.currentTarget.value, inputKey)}
      onBlur={(e) => onBlur && onBlur(e.currentTarget.value)}
      {...props}
    />
  </>
);
