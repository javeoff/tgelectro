import { NextPage } from 'next';
import { Card, Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
import { getFabricatorImageUrl } from '@common/utils/getFabricatorImageUrl';
import { Breadcrumbs, IBreadcrumb } from '@components/Breadcrumbs/Breadcrumbs';

interface IProps {
  product: IProduct;
  breadcrumbs: IBreadcrumb[];
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
  breadcrumbs,
}) => {
  const [defaultPhoto, setDefaultPhoto] = useState<
    typeof import('*.jpg') | string
  >('');

  useEffect(() => {
    const loadDefaultPhoto = async (): Promise<void> => {
      const photo = await import('@assets/img/default.jpg');

      setDefaultPhoto(photo);
    };

    if (!imageUrl) {
      void loadDefaultPhoto();
    }
  }, [imageUrl]);

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
          {breadcrumbs?.length && <Breadcrumbs items={breadcrumbs} />}

          <SHistoryButton>
            <Button variant='transparent' onClick={() => router.back()}>
              ← Назад
            </Button>
          </SHistoryButton>

          <Row>
            <Col md={6} sm={6} xs={12} lg={7}>
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
                <SImageCard>
                  <Card>
                    <img
                      src={getFabricatorImageUrl(fabricator.link)}
                      alt={fabricator.name}
                    />
                  </Card>
                </SImageCard>
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
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt='product-image'
                  width={500}
                  height={500}
                />
              ) : (
                defaultPhoto && (
                  <Image
                    src={defaultPhoto}
                    alt='product-image'
                    width={500}
                    height={500}
                  />
                )
              )}
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

      <div>
        <Footer />
      </div>
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
const SImageCard = styled.div`
  width: 30%;
  height: 30%;
`;
