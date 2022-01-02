import { NextPage } from 'next';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import Link from 'next/link';

import { Category } from '@server/Categories/entities/category.entity';
import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { Button } from '@components/Button/Button';
import { CatalogGallery } from '@pages/index/components/Catalog/components/CatalogGallery/CatalogGallery';
import {
  IWithCategoryPageState,
  withCategoryPageState,
} from '@pages/categories/hocs/withCategoryPageState';
import { ModalType } from '@components/Modal/enums/ModalType';
import { IFabricator } from '@server/Fabricators/types/IFabricator';

interface IProps {
  category: Category;
  fabricators: Fabricator[];
}

const CategoryPage: NextPage<IProps & IWithCategoryPageState> = ({
  setModalId,
  setDefaultModalInputValue,
  category: { name },
  fabricators,
}) => {
  const onPurchaseClick = (): void => {
    setModalId(ModalType.ORDER_MODAL);
    setDefaultModalInputValue(name);
  };

  const getCatalogItems = (): IFabricator[] =>
    fabricators.map((fabricator) => ({
      ...fabricator,
      name: `${name} ${fabricator.name}`,
    }));

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
              <b>Производители</b>
              <div>
                {fabricators.map(({ name: fabricatorName, link }, idx) => (
                  <Link key={idx} href={link}>
                    {fabricatorName}
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
              <CatalogGallery items={getCatalogItems()} showTitle={true} />
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

export default withCategoryPageState(CategoryPage);

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
