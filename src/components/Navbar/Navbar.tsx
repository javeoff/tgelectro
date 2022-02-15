import { FC, useContext } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { createPortal } from 'react-dom';

import { mainColor } from '@common/utils/colors';
import { IMenuItem } from '@common/types/IMenuItem';
import {
  TWithNavbarState,
  withNavbarState,
} from '@components/Navbar/hocs/withNavbarState';
import { AdaptiveContext } from '@common/contexts/adaptiveContext';
import { usePortal } from '@common/hooks/usePortal';
import { MobileNavbar } from '@components/Navbar/components/MobileNavbar';

interface IProps {
  menuItems: IMenuItem[];
}

const NavbarComponent: FC<TWithNavbarState & IProps> = ({
  currentPage,
  menuItems,
}) => {
  const isMobile = useContext(AdaptiveContext);
  const portalElement = usePortal(true);

  if (isMobile && portalElement) {
    return createPortal(
      <MobileNavbar menuItems={menuItems} currentPage={currentPage} />,
      portalElement,
    );
  }

  return (
    <>
      <SWrapper>
        {menuItems.map(({ title, link, name }, idx) => (
          <Link key={idx} href={link}>
            <MenuItem isActive={currentPage === name}>{title}</MenuItem>
          </Link>
        ))}
      </SWrapper>
    </>
  );
};

export const Navbar = withNavbarState(NavbarComponent);

const SWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 5px 0;
  background-color: #eee;

  ${({ theme }) =>
    theme.isMobile &&
    css`
      @media (max-width: 992px) {
        display: none;
      }
    `}
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
