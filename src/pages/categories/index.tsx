import styled from 'styled-components';
import { NextPage } from 'next';
import { Container } from 'reactstrap';

import { Header } from '@components/Header/Header';
import { Navbar } from '@components/Navbar/Navbar';
import { categories } from 'src/data/categories';
import { Footer } from '@components/Footer/Footer';
import { menuItems } from 'src/data/menuItems';
import { siteName } from 'src/data/common';
import { Categories } from '@components/Categories/Categories';

const pageIdx = 1;

const CategoriesPage: NextPage = () => (
  <>
    <SHeader>
      <Header />
    </SHeader>
    <SNavbar>
      <Navbar menuItems={menuItems} activeItemIdx={pageIdx} />
    </SNavbar>
    <SWrapper>
      <Container>
        <h2>Категории товаров</h2>
        <SCategories>
          <Categories categories={categories} />
        </SCategories>
      </Container>
    </SWrapper>
    <SFooter>
      <Footer categories={categories} />
    </SFooter>
  </>
);

CategoriesPage.getInitialProps = () => ({
  title: `${menuItems[pageIdx].title} - ${siteName}`,
});

export default CategoriesPage;

const SNavbar = styled.div`
  margin-top: 20px;
`;
const SHeader = styled.div`
  margin-top: 20px;
`;
const SWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;
const SFooter = styled.div`
  margin-top: 50px;
`;
const SCategories = styled.div`
  text-align: left;
`;
