import { FC } from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';

import { Categories } from '@components/Categories/Categories';
import { Logo } from '@components/Logo/Logo';
import { Contacts } from '@components/Contacts/Contacts';
import { darkColor } from '@common/utils/colors';

export const Footer: FC = () => (
  <SWrapper>
    <Container>
      <SCategories>
        <h2>Категории товаров</h2>
        <Categories />
      </SCategories>
      <SRow>
        <Logo />
        <SRightWrapper>
          <Contacts />
        </SRightWrapper>
      </SRow>
    </Container>
  </SWrapper>
);

const SWrapper = styled.div`
  color: #fff;
  padding: 50px 0;
  background: ${darkColor};
`;

const SRow = styled.div`
  margin-top: 50px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SRightWrapper = styled.div`
  margin-top: 10px;
  text-align: right;

  @media screen and (max-width: 1080px) {
    margin: 0 auto;
  }
`;

const SCategories = styled.div`
  font-size: 12px;
`;
