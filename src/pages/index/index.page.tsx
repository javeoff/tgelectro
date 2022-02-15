import { NextPage } from 'next';
import styled from 'styled-components';
import { Col, Container, Row } from 'reactstrap';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { Slider } from '@pages/index/components/Slider/Slider';
import { CatalogGallery } from '@components/Catalog/components/CatalogGallery/CatalogGallery';
import { IFabricator } from '@server/Fabricators/types/IFabricator';
import { Button } from '@components/Button/Button';
import { Link } from '@components/Link/Link';
import { Feedback } from '@components/Feedback/Feedback';
import { PartnersSlider } from '@components/PartnersSlider/PartnersSlider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface IProps {
  fabricators: IFabricator[];
}

const IndexPage: NextPage<IProps> = ({ fabricators }) => {
  const [icons, setIcons] = useState<Array<typeof import('*.png')>>([]);

  useEffect(() => {
    const loadIcons = async (): Promise<void> => {
      const iconList = [
        await import('@assets/img/1.png'),
        await import('@assets/img/2.png'),
        await import('@assets/img/3.png'),
        await import('@assets/img/4.png'),
      ];

      setIcons(iconList);
    };

    void loadIcons();
  }, []);

  return (
    <SWrapper>
      <SHeader>
        <Header />
      </SHeader>

      <Slider />

      <SInfoWrapper>
        <Container>
          {icons?.length && (
            <Row>
              <Col md={4} sm={6} xs={12} lg={3}>
                <SIcon>
                  <Image src={icons[0]} alt='delivery-icon' />
                </SIcon>
                <div>{'>'} 100 000 товаровна собственном складе</div>
              </Col>
              <Col md={4} sm={6} xs={12} lg={3}>
                <SIcon>
                  <Image src={icons[1]} alt='delivery-icon' />
                </SIcon>
                <div>Подберем точный аналог с гарантией</div>
              </Col>
              <Col md={4} sm={6} xs={12} lg={3}>
                <SIcon>
                  <Image src={icons[2]} alt='delivery-icon' />
                </SIcon>
                <div>Год гарантии на всё оборудование</div>
              </Col>
              <Col md={4} sm={6} xs={12} lg={3}>
                <SIcon>
                  <Image src={icons[3]} alt='delivery-icon' />
                </SIcon>
                <div>11 лет успешной работы в области поставок</div>
              </Col>
            </Row>
          )}
        </Container>
      </SInfoWrapper>
      <SSection>
        <SContainer>
          <Container>
            <h2>1 500 производителей в каталоге</h2>
            <CatalogGallery items={fabricators} canExpand={false} />
            <SButton>
              <Link href='/fabricators'>
                <Button size='lg'>Открыть весь каталог</Button>
              </Link>
            </SButton>
          </Container>
        </SContainer>
      </SSection>

      <Feedback />

      <SSection>
        <SPartnersWrapper>
          <Container>
            <h2>Наши партнеры</h2>
            <PartnersSlider />
          </Container>
        </SPartnersWrapper>
      </SSection>

      <SFooter>
        <Footer />
      </SFooter>
    </SWrapper>
  );
};

const SHeader = styled.div`
  margin-top: 20px;
`;

const SFooter = styled.div`
  margin-top: 50px;
`;

const SIcon = styled.div``;

const SInfoWrapper = styled.div`
  padding: 50px 0;
  background-color: #212130;
  color: #fff;
  font-size: 1.2em;

  @media screen and (max-width: 992px) {
    & ${SIcon} {
      text-align: center;
      margin: 20px auto;
    }

    text-align: center;
    font-size: 1.3em;
  }
`;

const SSection = styled.div`
  margin-top: 50px;
`;

const SWrapper = styled.div`
  & h2 {
    font-size: 2.5em;
  }
`;

const SButton = styled.div``;

const SContainer = styled.div`
  margin: 50px 0;
  text-align: center;

  & ${SButton} {
    margin: 20px 0;
  }
`;

const SPartnersWrapper = styled.div`
  text-align: center;
  margin-top: 30px;

  & > div {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export default IndexPage;
