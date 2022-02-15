import { NextPage } from 'next';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { ProductsTable } from '@components/ProductsTable/ProductsTable';
import { Footer } from '@components/Footer/Footer';
import { ICategory } from '@server/Categories/types/ICategory';
import { Product } from '@server/Products/entities/product.entity';
import { Pagination } from '@components/Pagination/Pagination';
import { Link } from '@components/Link/Link';
import { Button } from '@components/Button/Button';
import { ModalType } from '@components/Modal/enums/ModalType';
import { Header } from '@components/Header/Header';
import {
  IWithFabricatorPageState,
  withFabricatorPageState,
} from '@pages/fabricators/[fabricatorId]/hocs/withFabricatorPageState';
import { Breadcrumbs, IBreadcrumb } from '@components/Breadcrumbs/Breadcrumbs';

interface IProps {
  params: string[];
  category: ICategory;
  categories: ICategory[];
  products: Product[];
  categoriesProductsLengths: Record<string, number>;
  pagesLength: number;
  currentPage: string;
  breadcrumbs: IBreadcrumb[];
}

const DeepFabricatorPage: NextPage<IProps & IWithFabricatorPageState> = ({
  setModalId,
  setDefaultModalInputValue,
  category: { name },
  categories,
  products,
  categoriesProductsLengths,
  pagesLength,
  currentPage,
  breadcrumbs,
}) => {
  const onPurchaseClick = (): void => {
    setModalId(ModalType.ORDER_MODAL);
    setDefaultModalInputValue(name);
  };
  const router = useRouter();

  return (
    <>
      <SHeader>
        <Header />
      </SHeader>

      <SWrapper>
        <Container>
          {breadcrumbs?.length && <Breadcrumbs items={breadcrumbs} />}
          <Row>
            <Col md={4} sm={6} xs={12} lg={3}>
              <h1>{name}</h1>
              <b>Категории</b>
              <div>
                {categories.map(({ name: categoryName, link, id }, idx) => (
                  <Link key={idx} href={`${router.asPath}/${link}`}>
                    {`${categoryName} ${categoriesProductsLengths[id] || 0}`}
                  </Link>
                ))}
              </div>
            </Col>
            <Col>
              <SButtonRow>
                <Button onClick={onPurchaseClick} size='sm'>
                  Заказать {name}
                </Button>
              </SButtonRow>

              <SProductsTable>
                <ProductsTable products={products} />
              </SProductsTable>
              <div>
                <Pagination
                  pagesLength={pagesLength}
                  currentPage={currentPage}
                />
              </div>
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

export default withFabricatorPageState(DeepFabricatorPage);

const SHeader = styled.div`
  margin-top: 20px;
`;
const SWrapper = styled.div`
  margin-top: 20px;
`;
const SButtonRow = styled.div`
  width: 100%;
  text-align: right;
`;
const SProductsTable = styled.div`
  margin-top: 50px;
`;
const SFooter = styled.div`
  margin-top: 50px;
`
