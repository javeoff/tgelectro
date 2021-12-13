import styled from 'styled-components';
import { Button, Col, Container, Row } from 'reactstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FC } from 'react';

import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { Feedback } from '@components/Feedback/Feedback';
import { mainColor } from '@common/utils/colors';
import { Map } from '@components/Map/Map';
import {
  IWithContactsPageState,
  withContactsPageState,
} from '@pages/contacts/hocs/withContactsPageState';
import { ModalType } from '@components/Modal/enums/ModalType';

const Contacts: FC<IWithContactsPageState> = ({ setModalId }) => (
  <>
    <SHeader>
      <Header />
    </SHeader>
    <SSection>
      <SWrapper>
        <Container>
          <h2>Контактные данные</h2>
          <SRow>
            <Row>
              <Col md={4}>
                <div>
                  <SButtonRow>
                    <Button onClick={() => setModalId(ModalType.ORDER_MODAL)}>
                      Отправить запрос
                    </Button>
                    <Button
                      onClick={() => setModalId(ModalType.FEEDBACK_MODAL)}
                    >
                      Заказать звонок
                    </Button>
                  </SButtonRow>
                </div>
                <SContactInfo>
                  <SContent>
                    <h3>Телефон</h3>
                    <div>+7 (999) 999 99-99</div>
                    <div>+7 (999) 999 99-99</div>
                  </SContent>
                  <SContent>
                    <h3>Почта</h3>
                    <div>info@website.com</div>
                  </SContent>
                  <SContent>
                    <h3>Офис и склад</h3>
                    <div>1234 Выдуманный, ул. Новая, 12/3</div>
                  </SContent>
                  <SContent>
                    <h3>Склад в Рязани</h3>
                    <div>1234 Выдуманный, ул. Новая, 12/3</div>
                  </SContent>
                  <SContent>
                    <h3>Время работы</h3>
                    <div>пн-пт с 8:00 до 18:00</div>
                  </SContent>
                </SContactInfo>
              </Col>
              <Col md={4}>
                <Map />
              </Col>
            </Row>
          </SRow>
        </Container>
      </SWrapper>
    </SSection>

    <Feedback />

    <div>
      <Footer />
    </div>
  </>
);

export default withContactsPageState(Contacts);

const SHeader = styled.div`
  margin-top: 20px;
`;
const SSection = styled.div`
  margin: 50px 0;
`;
const SRow = styled.div`
  margin-top: 50px;
`;
const SWrapper = styled.div`
  text-align: center;
  margin-top: 30px;

  & > div {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
const SContactInfo = styled.div`
  margin-top: 50px;
`;
const SButtonRow = styled.div`
  text-align: left;
  justify-content: left;
  display: flex;

  & > * {
    margin-right: 20px;
    background: ${mainColor};
    border: 1px solid transparent;
  }
`;
const SContent = styled.div`
  margin-top: 20px;
  text-align: left;
`;
