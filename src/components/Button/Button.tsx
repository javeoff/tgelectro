import { ButtonHTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';

import { TButtonVariant } from '@components/Button/types/TButtonVariant';
import { mainColor } from '@common/utils/colors';
import { TButtonSize } from '@components/Button/types/TButtonSize';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFluid?: boolean;
  variant?: TButtonVariant;
  size?: TButtonSize;
}

export const Button: FC<IProps> = ({
  variant = 'primary',
  isFluid = false,
  size = 'md',
  children,
  ...props
}) => (
  <SButton
    type='button'
    variant={variant}
    isFluid={isFluid}
    size={size}
    {...props}
  >
    {children}
  </SButton>
);

const SButton = styled.button<{
  variant: TButtonVariant;
  isFluid: boolean;
  size: TButtonSize;
}>`
  border-radius: 5px;

  ${({ size }) =>
    size === 'md' &&
    css`
      padding: 5px 15px;
    `}

  ${({ size }) =>
    size === 'sm' &&
    css`
      font-size: 0.9em;
      padding: 2px 10px;
    `}

  ${({ isFluid }) =>
    isFluid &&
    css`
      width: 100%;
    `}

  ${({ variant }) =>
    variant === 'primary' &&
    css`
      color: #fff;
      border: 1px solid transparent;
      background: ${mainColor};
    `}

  ${({ variant }) =>
    variant === 'outline' &&
    css`
      color: #000;
      border: 1px solid ${mainColor};
      background: transparent;
    `}

  ${({ variant }) =>
    variant === 'transparent' &&
    css`
      color: #000;
      border: 1px solid transparent;
      background: transparent;
      padding: 0;
    `}
`;
