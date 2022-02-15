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
          <h2>Контактные данные ООО &quot;Снабжение от А до Я&quot;</h2>
          <SRow>
            <SFlex>
              <SRightWrapper>
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
                    <div>8 (800) 700-95-55</div>
                    <div>+7 (4912) 307-300</div>
                    <div>+7 (953) 749-19-19</div>
                  </SContent>
                  <SContent>
                    <h3>Почта</h3>
                    <div>aleks-k1984@ya.ru</div>
                  </SContent>
                  <SContent>
                    <h3>Офис и склад</h3>
                    <div>г. Рязань, ул. Щорса 38/11, строение 1, офис 206 </div>
                  </SContent>
                  <SContent>
                    <h3>Время работы</h3>
                    <div>пн-пт с 8:00 до 18:00</div>
                  </SContent>
                </SContactInfo>
              </SRightWrapper>
              <Map />
            </SFlex>
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
const SFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const SRightWrapper = styled.div`
  margin-bottom: 30px;
`
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
