import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import LogoImage from '@assets/img/logo.png';

export const Logo: FC = () => (
  <div>
    <>
      <SLogo>
        <Link href='/'>
          <img src={LogoImage.src} alt='logo' width={176} height={124} />
        </Link>
      </SLogo>
      <SLabel>Продажа электроники, компонентов и оборудования</SLabel>
    </>
  </div>
);

const SLogo = styled.div`
  margin: 0;
  cursor: pointer;

  @media screen and (max-width: 992px) {
    margin: 100px auto 0;

    & img {
      width: 100%;
      height: auto;
    }
  }
`;
const SLabel = styled.div`
  font-size: 12px;

  @media screen and (max-width: 992px) {
    margin: 20px 0;
    font-size: 1.5em;
    text-align: center;
  }
`;
