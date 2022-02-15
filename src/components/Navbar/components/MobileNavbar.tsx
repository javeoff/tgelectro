import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

import MenuIcon from '@assets/img/menu.svg';
import LogoImage from '@assets/img/logo.png';
import { IMenuItem } from '@common/types/IMenuItem';
import { mainColor } from '@common/utils/colors';

interface IProps {
  menuItems: IMenuItem[];
  currentPage: string;
}

export const MobileNavbar: FC<IProps> = ({ menuItems, currentPage }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SWrapper>
      <SMenu>
        <SLogo>
          <Link href='/'>
            <img src={LogoImage.src} alt='logo' />
          </Link>
        </SLogo>

        <SMenuIcon onClick={toggleMenu}>
          <MenuIcon />
        </SMenuIcon>
      </SMenu>
      {isExpanded && (
        <SToggleMenu>
          {menuItems.map(({ title, link, name }, idx) => (
            <Link key={idx} href={link}>
              <SMenuItem isActive={currentPage === name}>{title}</SMenuItem>
            </Link>
          ))}
        </SToggleMenu>
      )}
    </SWrapper>
  );
};

const SWrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;
const SMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  z-index: 2000;
  padding: 10px;
`;
const SToggleMenu = styled.div`
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 10px;
`;
const SLogo = styled.div`
  box-sizing: border-box;

  & img {
    max-width: 88px;
  }
`;
const SMenuIcon = styled.div`
  height: max-content;
  width: 40px;
  box-sizing: content-box;
  margin: 10px;
  padding: 2px;
  border-radius: 6px;
  color: #212130;
  border: 2px solid #eee;
`;
const SMenuItem = styled.div<{ isActive: boolean }>`
  font-size: 1.5em;
  cursor: pointer;
  color: var(--bs-body-color);
  text-decoration: none;
  border: 0;
  margin: 5px 10px;

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${mainColor};
      border-bottom: 2px solid ${mainColor};
    `}
`;
