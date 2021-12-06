import { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Image from 'next/image';
import styled from 'styled-components';

interface IProps {
  title?: string;
}

export const Advantages: FC<IProps> = ({ title = '' }) => {
  const [icons, setIcons] = useState<Array<typeof import('*.png')>>([]);

  useEffect(() => {
    const loadIcons = async (): Promise<void> => {
      const iconList = [
        await import('@assets/img/1.png'),
        await import('@assets/img/2.png'),
        await import('@assets/img/3.png'),
        await import('@assets/img/4.png'),
        await import('@assets/img/5.png'),
        await import('@assets/img/6.png'),
        await import('@assets/img/7.png'),
        await import('@assets/img/8.png'),
      ];

      setIcons(iconList);
    };

    void loadIcons();
  }, []);

  if (icons.length === 0) {
    return <></>;
  }

  return (
    <SWrapper>
      <Container>
        <h2>{title}</h2>
        <SAdvantagesRow>
          <Col md={4} sm={6} xs={12} lg={3}>
            <Image src={icons[0]} alt='delivery-icon' />
            <div>Бесплатная доставка до терминала в Екатеринбурге</div>
          </Col>
          <Col md={4} sm={6} xs={12} lg={3}>
            <Image src={icons[1]} alt='delivery-icon' />
            <div>Экспресс-доставка за 24 часа</div>
          </Col>
          <Col md={4} sm={6} xs={12} lg={3}>
            <Image src={icons[2]} alt='delivery-icon' />
            <div>Бесплатная доставка до двери, при заказе от 3 000 евро</div>
          </Col>
          <Col md={4} sm={6} xs={12} lg={3}>
            <Image src={icons[3]} alt='delivery-icon' />
            <div>Пункты выдачи в 170 городах России</div>
          </Col>
          <Col md={4} sm={6} xs={12} lg={3}>
            <Image src={icons[4]} alt='delivery-icon' />
            <div>Предоставление отсрочки платежа клиентам</div>
          </Col>
          <Col md={4} sm={6} xs={12} lg={3}>
            <Image src={icons[5]} alt='delivery-icon' />
            <div>Персональный менеджер от заявки до отгрузки</div>
          </Col>
          <Col md={4} sm={6} xs={12} lg={3}>
            <Image src={icons[6]} alt='delivery-icon' />
            <div>Поставляем оборудование снятое с производства</div>
          </Col>
          <Col md={4} sm={6} xs={12} lg={3}>
            <Image src={icons[7]} alt='delivery-icon' />
            <div>Более 10 000 брендов в каталоге компании</div>
          </Col>
        </SAdvantagesRow>
      </Container>
    </SWrapper>
  );
};

const SWrapper = styled.div`
  text-align: center;
  margin-top: 30px;

  & > div {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
const SAdvantagesRow = styled(Row)`
  & > div {
    margin: 20px 0;
    text-align: center;

    & > div {
      font-size: 18px;
      margin: 15px auto;
      max-width: 300px;
      width: 100%;
    }
  }
`;
