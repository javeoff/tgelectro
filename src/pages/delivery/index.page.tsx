import styled from 'styled-components';
import { NextPage } from 'next';
import { Col, Container, Row } from 'reactstrap';
import Image from 'next/image';

import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { menuItems } from '@common/utils/menuItems';
import { siteName } from '@common/utils/constants';
import { Advantages } from '@components/Advantages/Advantages';
import Tk1 from '@assets/img/tk1.jpg';
import Tk2 from '@assets/img/tk2.jpg';
import Tk3 from '@assets/img/tk3.jpg';
import Tk4 from '@assets/img/tk4.jpg';
import Tk5 from '@assets/img/tk5.jpg';

const pageIdx = 2;

const DeliveryPage: NextPage = () => (
  <>
    <SHeader>
      <Header />
    </SHeader>
    <SSection>
      <SWrapper>
        <Container>
          <h2>Доставка и оплата</h2>
          <SContent>
            <h3>1. Оставьте свой запрос</h3>
            <div>
              Отправьте заявку на оборудование, которое планируете приобрести.
            </div>
            <div>
              Если вы обращаетесь к нам впервые, то в заявке укажите реквизиты
              вашего юридического лица / Индивидуального Предпринимателя и
              контактные данные.
            </div>
            <h3>2. Получите ответ</h3>
            <div>
              Менеджер компании даст детальный ответ на ваш запрос в течение 10
              минут.
            </div>
            <div>
              Проконсультирует по всем вопросам, предоставит полную информацию о
              наличии товара на складе, цене, условиях оплаты, возможных сроках
              поставки и других параметрах сделки.
            </div>
            <h3>3. Оформление и оплата</h3>
            <div>
              После оформления заявки мы отправим вам счет на оплату в евро.
            </div>
            <div>
              Оплата товара производится на основании полученного счета по курсу
              Центрального банка Российской Федерации на день оплаты.
            </div>
            <div>
              Мы работаем только по безналичной оплате с юридическими лицами и
              ИП, зарегистрированными в странах Таможенного союза – России,
              Белоруссии, Казахстане и Армении.
            </div>
          </SContent>
        </Container>
      </SWrapper>
    </SSection>
    <SSection>
      <Advantages />
    </SSection>
    <SSection>
      <SWrapper>
        <Container>
          <h2>ТК для доставки по России</h2>
          <Row>
            <Col>
              <Image src={Tk1} alt='tk1' />
            </Col>
            <Col>
              <Image src={Tk2} alt='tk2' />
            </Col>
            <Col>
              <Image src={Tk3} alt='tk3' />
            </Col>
            <Col>
              <Image src={Tk4} alt='tk4' />
            </Col>
            <Col>
              <Image src={Tk5} alt='tk5' />
            </Col>
          </Row>
        </Container>
      </SWrapper>
    </SSection>
    <SSection>
      <SWrapper>
        <Container>
          <h2>Как оплатить</h2>
          <SContent>
            <h3>Юридическим лицам</h3>
            <div>
              Выставляем счет на оплату после оформления заказа. Оплатить его
              можно в отделении вашего банка, в терминале самообслуживания или
              через интернет-банк. Счета в валюте (евро, доллары) оплачиваются в
              рублях по курсу ЦБ на день оплаты.
            </div>
            <div>
              Даем беспроцентную отсрочку платежа. При заказе вносится
              предоплата 30–50%, остальная сумма — когда заказ прибыл на наш
              склад в России.
            </div>
            <h3>Физическим лицам</h3>
            <div>
              Наличными или банковской картой. Заказ оплачивается курьеру во
              время доставки.
            </div>
            <div>
              Если вы хотите заплатить картой — предупредите вашего менеджера.
              Он проследит, чтобы транспортная компания отправила курьера с
              терминалом. Платежи в валюте (евро, доллары) — в рублях по курсу
              ЦБ на день оплаты.
            </div>
          </SContent>
        </Container>
      </SWrapper>
    </SSection>
    <SFooter>
      <Footer />
    </SFooter>
  </>
);

DeliveryPage.getInitialProps = () => ({
  title: `${menuItems[pageIdx].title} - ${siteName}`,
});

export default DeliveryPage;

const SHeader = styled.div`
  margin-top: 20px;
`;
const SSection = styled.div`
  margin: 50px 0;
`;
const SWrapper = styled.div`
  text-align: center;
  margin-top: 30px;

  & > div {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
const SFooter = styled.div`
  margin-top: 50px;
`;
const SContent = styled.div`
  text-align: left;

  & h3 {
    margin-top: 30px;
  }
`;
