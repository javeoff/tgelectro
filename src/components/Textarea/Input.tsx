import { FC, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { boxColor } from '@common/utils/colors';

interface IProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  isFluid?: boolean;
}

export const Textarea: FC<IProps> = ({ isFluid = false, ...props }) => (
  <STextarea isFluid={isFluid} {...props} />
);

const STextarea = styled.textarea<{ isFluid: boolean }>`
  padding: 5px 15px;
  border-radius: 5px;
  border: 1px solid ${boxColor};
  resize: none;

  ${({ isFluid }) =>
    isFluid &&
    css`
      width: 100%;
    `}
`;
