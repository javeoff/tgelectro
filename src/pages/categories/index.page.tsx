import styled from 'styled-components';
import { NextPage } from 'next';
import { Container } from 'reactstrap';

import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { Categories } from '@components/Categories/Categories';

const CategoriesPage: NextPage = () => (
  <>
    <SHeader>
      <Header />
    </SHeader>

    <SWrapper>
      <Container>
        <h2>Категории товаров</h2>
        <SCategories>
          <Categories />
        </SCategories>
      </Container>
    </SWrapper>
    <SFooter>
      <Footer />
    </SFooter>
  </>
);

export default CategoriesPage;

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
