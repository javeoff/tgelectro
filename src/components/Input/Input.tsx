import { FC, ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { boxColor } from '@common/utils/colors';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  isFluid?: boolean;
}

const InputComponent = (
  { isFluid = false, ...props }: IProps,
  ref: ForwardedRef<HTMLInputElement>,
): JSX.Element => <SInput type='text' isFluid={isFluid} ref={ref} {...props} />;

export const Input = forwardRef(InputComponent) as FC<
  IProps & { ref?: ForwardedRef<HTMLInputElement | undefined> }
>;

const SInput = styled.input<{ isFluid: boolean }>`
  padding: 5px 15px;
  border-radius: 5px;
  border: 1px solid ${boxColor};

  ${({ isFluid }) =>
    isFluid &&
    css`
      width: 100%;
    `}
`;
