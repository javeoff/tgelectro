import { FC } from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';

import {
  Categories,
  ICategoriesProps,
} from '@components/Categories/Categories';
import { Logo } from '@components/Logo/Logo';
import { Contacts } from '@components/Contacts/Contacts';
import { darkColor } from '@common/utils/colors';

export const Footer: FC<ICategoriesProps> = ({ categories }) => (
  <SWrapper>
    <Container>
      <SCategories>
        <h2>Категории товаров</h2>
        <Categories categories={categories} />
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
`;

const SRightWrapper = styled.div`
  margin-top: 10px;
  text-align: right;
`;

const SCategories = styled.div`
  font-size: 12px;
`;
