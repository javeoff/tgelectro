import { FC } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

import { mainColor } from '@common/utils/colors';
import { IMenuItem } from '@common/types/IMenuItem';

interface IProps {
  menuItems: IMenuItem[];
  activeItemIdx: number;
}

export const Navbar: FC<IProps> = ({ menuItems, activeItemIdx }) => (
  <SWrapper>
    {menuItems.map(({ title, link }, idx) => (
      <Link key={idx} href={link}>
        <MenuItem isActive={activeItemIdx === idx}>{title}</MenuItem>
      </Link>
    ))}
  </SWrapper>
);

const SWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 5px 0;
  background-color: #eee;
`;
const MenuItem = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  color: var(--bs-body-color);
  text-decoration: none;
  border: 0;
  margin: 0 10px;

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${mainColor};
      border-bottom: 1px solid ${mainColor};
    `}

  &:hover {
    color: ${mainColor};
  }
`;
