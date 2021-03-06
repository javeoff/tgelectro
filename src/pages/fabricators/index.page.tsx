import { NextPage } from 'next';
import { Container } from 'reactstrap';
import styled from 'styled-components';

import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { Catalog } from '@components/Catalog/Catalog';

const FabricatorsPage: NextPage = () => (
  <>
    <SHeader>
      <Header />
    </SHeader>
    <SWrapper>
      <Container>
        <h2>Каталог производителей</h2>
        <Catalog />
      </Container>
    </SWrapper>
    <SFooter>
      <Footer />
    </SFooter>
  </>
);

export default FabricatorsPage;

const SWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const SHeader = styled.div`
  margin-top: 20px;
`;

const SFooter = styled.div`
  margin-top: 50px;
`;
