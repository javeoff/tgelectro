import { FC, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { boxColor } from '@common/utils/colors';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  isFluid?: boolean;
}

export const Input: FC<IProps> = ({ isFluid = false, ...props }) => (
  <SInput type='text' isFluid={isFluid} {...props} />
);

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
