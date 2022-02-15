import { NextPage } from 'next';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { IFabricator } from '@server/Fabricators/types/IFabricator';
import { ICategory } from '@server/Categories/types/ICategory';
import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { ProductsTable } from '@components/ProductsTable/ProductsTable';
import { Product } from '@server/Products/entities/product.entity';
import { Pagination } from '@components/Pagination/Pagination';
import { Link } from '@components/Link/Link';
import { Button } from '@components/Button/Button';
import { ModalType } from '@components/Modal/enums/ModalType';
import {
  IWithFabricatorPageState,
  withFabricatorPageState,
} from '@pages/fabricators/[fabricatorId]/hocs/withFabricatorPageState';
import { Breadcrumbs, IBreadcrumb } from '@components/Breadcrumbs/Breadcrumbs';

interface IProps {
  fabricator: IFabricator;
  products: Product[];
  categories: ICategory[];
  categoriesProductsLengths: Record<string, number>;
  currentPage: string;
  pagesLength: number;
  breadcrumbs: IBreadcrumb[];
}

const FabricatorPage: NextPage<IProps & IWithFabricatorPageState> = ({
  setModalId,
  setDefaultModalInputValue,
  fabricator: { name },
  categories,
  products,
  categoriesProductsLengths,
  currentPage,
  pagesLength,
  breadcrumbs,
}) => {
  const onPurchaseClick = (): void => {
    setModalId(ModalType.ORDER_MODAL);
    setDefaultModalInputValue(name);
  };
  const router = useRouter();
  const route = router.asPath.replace(/\?.*/, '');

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
                  <Link key={idx} href={`${route}/${link}`}>
                    {`${categoryName} (${
                      categoriesProductsLengths[String(id)]
                    })`}
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

              {products?.length > 0 && (
                <SProductsTable>
                  <ProductsTable products={products} />
                </SProductsTable>
              )}
              <Pagination currentPage={currentPage} pagesLength={pagesLength} />
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

export default withFabricatorPageState(FabricatorPage);

const SHeader = styled.div`
  margin-top: 20px;
`;
const SWrapper = styled.div`
  margin-top: 20px;
`;
const SFooter = styled.div`
  margin-top: 50px;
`;
const SButtonRow = styled.div`
  width: 100%;
  text-align: right;
`;
const SProductsTable = styled.div`
  margin-top: 80px;
`;
