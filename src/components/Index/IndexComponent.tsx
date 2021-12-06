import { FC } from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';

import { Header } from '@components/Header/Header';
import { Navbar } from '@components/Navbar/Navbar';
import { categories } from 'src/data/categories';
import { Catalog } from '@components/Index/components/Catalog/Catalog';
import { fabricators } from 'src/data/fabricators';
import { Footer } from '@components/Footer/Footer';
import { menuItems } from 'src/data/menuItems';

export const IndexComponent: FC = () => (
  <>
    <SHeader>
      <Header />
    </SHeader>
    <SNavbar>
      <Navbar menuItems={menuItems} activeItemIdx={0} />
    </SNavbar>
    <SWrapper>
      <Container>
        <h2>Каталог производителей</h2>
        <Catalog fabricators={fabricators} />
      </Container>
    </SWrapper>
    <SFooter>
      <Footer categories={categories} />
    </SFooter>
  </>
);

const SWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const SNavbar = styled.div`
  margin-top: 20px;
`;

const SHeader = styled.div`
  margin-top: 20px;
`;

const SFooter = styled.div`
  margin-top: 50px;
`;
