import { FC } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import { mainColor } from '@common/utils/colors';
import { Logo } from '@components/Logo/Logo';
import { Contacts } from '@components/Contacts/Contacts';
import { IWithHeaderState, withHeaderState } from '@components/Header/hocs/withHeaderState';
import { Navbar } from '@components/Navbar/Navbar';
import { menuItems } from '@common/utils/menuItems';
import { ModalType } from '@components/Modal/enums/ModalType';
import { SearchInput } from '@components/SearchInput/SearchInput';

const HeaderComponent: FC<IWithHeaderState> = ({ setModalId }) => (
  <div>
    <Container>
      <Row>
        <Col xs={12} sm={12} md={12} lg={6}>
          <Logo />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6}>
          <SRightWrapper>
            <Contacts />
          </SRightWrapper>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6}>
          <SearchInput />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6}>
          <SRightWrapper>
            <SButtonRow>
              <Button onClick={() => setModalId(ModalType.ORDER_MODAL)}>
                Отправить запрос
              </Button>
              <Button onClick={() => setModalId(ModalType.FEEDBACK_MODAL)}>
                Заказать звонок
              </Button>
            </SButtonRow>
          </SRightWrapper>
        </Col>
      </Row>
    </Container>
    <SNavbar>
      <Navbar menuItems={menuItems} />
    </SNavbar>
  </div>
);

export const Header = withHeaderState(HeaderComponent);

const SNavbar = styled.div`
  margin-top: 20px;
`;

export const SRightWrapper = styled.div`
  margin-top: 10px;
  text-align: right;
`;

export const SButtonRow = styled.div`
  text-align: right;
  justify-content: right;
  display: flex;

  & > * {
    margin-left: 20px;
    background: ${mainColor};
    border: 1px solid transparent;
  }
`;
