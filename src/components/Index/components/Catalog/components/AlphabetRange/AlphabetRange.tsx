import { FC } from 'react';
import styled, { css } from 'styled-components';

import { boxColor, mainColor } from '@common/utils/colors';

interface IProps {
  range: string[];
  activeRangeIdx: number;
  onRangeItemClick?(idx: number): void;
}

export const AlphabetRange: FC<IProps> = ({
  range,
  activeRangeIdx,
  onRangeItemClick,
}) => (
  <SWrapper>
    <SRangeWrapper>
      {range.map((rangeItem, idx) => (
        <SRangeItem
          key={idx}
          isActive={activeRangeIdx === idx}
          onClick={() => onRangeItemClick && onRangeItemClick(idx)}
        >
          {rangeItem}
        </SRangeItem>
      ))}
    </SRangeWrapper>
  </SWrapper>
);

const SWrapper = styled.div`
  background: ${boxColor};
  padding: 10px 0;
`;
const SRangeWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  & > div {
    margin: 0 10px;
    font-weight: 500;
  }

  & > div:hover {
    cursor: pointer;
    color: ${mainColor};
  }
`;
const SRangeItem = styled.div<{ isActive: boolean }>`
  ${({ isActive }) =>
    isActive &&
    css`
      color: ${mainColor};
    `}
`;
