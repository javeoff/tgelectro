import { NextPage } from 'next';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { IProduct } from '@server/Products/types/IProduct';
import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { Button } from '@components/Button/Button';
import { ModalType } from '@components/Modal/enums/ModalType';
import {
  IWithProductPageState,
  withProductPageState,
} from '@pages/products/hocs/withProductPageState';
import { Feedback } from '@components/Feedback/Feedback';

interface IProps {
  product: IProduct;
}

const ProductPage: NextPage<IProps & IWithProductPageState> = ({
  setModalId,
  setDefaultModalInputValue,
  product: {
    vendor,
    alternativeVendor,
    description,
    fabricator,
    price,
    imageUrl,
  },
}) => {
  const router = useRouter();
  const onPurchaseClick = (): void => {
    setModalId(ModalType.ORDER_MODAL);
    setDefaultModalInputValue(vendor);
  };

  const onSetOrderClick = (): void => {
    setModalId(ModalType.FEEDBACK_MODAL);
  };

  return (
    <>
      <SHeader>
        <Header />
      </SHeader>

      <SWrapper>
        <Container>
          <SHistoryButton>
            <Button variant='transparent' onClick={() => router.back()}>
              ← Назад
            </Button>
          </SHistoryButton>

          <Row>
            <Col md={6} sm={6} xs={12} lg={5}>
              <h1>
                {vendor} {fabricator.name}
              </h1>
              <SAttribute>
                <b>Артикул</b>
                <div>{vendor}</div>
              </SAttribute>
              <SAttribute>
                <b>Альтернативный Артикул</b>
                <div>{alternativeVendor}</div>
              </SAttribute>
              <SAttribute>
                <b>Производитель</b>
                <div>{fabricator.name}</div>
              </SAttribute>
              <SAttribute>
                <b>Описание</b>
                <div>{description}</div>
              </SAttribute>
              <SAttribute>
                <b>Цена</b>
                <div>{price}</div>
              </SAttribute>
              <SButtonRow>
                <Button isFluid={true} onClick={onPurchaseClick}>
                  Купить
                </Button>
                <Button
                  isFluid={true}
                  variant='outline'
                  onClick={onSetOrderClick}
                >
                  Оставить заявку
                </Button>
              </SButtonRow>
            </Col>
            <Col>
              <img src={imageUrl} alt={imageUrl} />
            </Col>
          </Row>

          <SNotice>
            В связи с резкими скачками курса валют, цены на товары, выложенные
            на сайте, могут отличаться, как в большую, так и в меньшую сторону.
            Пожалуйста, уточняйте актуальные цены у менеджеров. Приведённые цены
            не являются публичной офертой.
          </SNotice>
        </Container>
      </SWrapper>

      <Feedback initialValue={vendor} />

      <SFooter>
        <Footer />
      </SFooter>
    </>
  );
};

export default withProductPageState(ProductPage);

const SHeader = styled.div`
  margin-top: 20px;
`;
const SWrapper = styled.div`
  margin-top: 20px;
`;
const SFooter = styled.div`
  margin-top: 50px;
`;
const SAttribute = styled.div`
  margin-top: 10px;

  & b {
    font-size: 1.1em;
  }
`;
const SButtonRow = styled.div`
  width: 70%;

  & > * {
    margin-top: 10px;
  }
`;
const SNotice = styled.div`
  margin: 50px 0;
  font-size: 1.2em;
`;
const SHistoryButton = styled.div`
  margin: 10px 0;
`;
