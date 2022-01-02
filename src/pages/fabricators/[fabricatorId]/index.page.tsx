import { NextPage } from 'next';
import { Col, Container, Row } from 'reactstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { IFabricator } from '@server/Fabricators/types/IFabricator';
import { ICategory } from '@server/Categories/types/ICategory';
import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { ProductsTable } from '@components/ProductsTable/ProductsTable';

interface IProps {
  fabricator: IFabricator;
  categories: ICategory[];
}

const FabricatorPage: NextPage<IProps> = ({
  fabricator: { name, products },
  categories,
}) => {
  const router = useRouter();

  return (
    <>
      <SHeader>
        <Header />
      </SHeader>

      <SWrapper>
        <Container>
          <Row>
            <Col md={4} sm={6} xs={12} lg={3}>
              <h1>{name}</h1>
              <b>Категории</b>
              <div>
                {categories.map(({ name: categoryName, link }, idx) => (
                  <div key={idx}>
                    <Link href={`${router.asPath}/${link}`}>
                      {categoryName}
                    </Link>
                  </div>
                ))}
              </div>
            </Col>
            <Col>
              <ProductsTable products={products} />
            </Col>
          </Row>
        </Container>
      </SWrapper>
      <SFooter>
        <Footer />
      </SFooter>
    </>
  );
};

export default FabricatorPage;

const SHeader = styled.div`
  margin-top: 20px;
`;
const SWrapper = styled.div`
  margin-top: 20px;
`;
const SFooter = styled.div`
  margin-top: 50px;
`;
