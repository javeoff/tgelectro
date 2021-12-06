import { ButtonHTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';

import { TButtonVariant } from '@components/Button/types/TButtonVariant';
import { mainColor } from '@common/utils/colors';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFluid?: boolean;
  variant?: TButtonVariant;
}

export const Button: FC<IProps> = ({
  variant = 'primary',
  isFluid = false,
  children,
  ...props
}) => (
  <SButton type='button' variant={variant} isFluid={isFluid} {...props}>
    {children}
  </SButton>
);

const SButton = styled.button<{ variant: TButtonVariant; isFluid: boolean }>`
  padding: 5px 15px;
  border-radius: 5px;

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
`;
