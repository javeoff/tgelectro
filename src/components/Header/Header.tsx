import { FC } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import styled from 'styled-components';

import SearchIcon from '@components/Header/img/search.svg';
import { mainColor } from '@common/utils/colors';
import { Logo } from '@components/Logo/Logo';
import { Contacts } from '@components/Contacts/Contacts';
import {
  IWithHeaderState,
  withHeaderState,
} from '@components/Header/hocs/withHeaderState';

const HeaderComponent: FC<IWithHeaderState> = ({ setModalId }) => (
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
        <SInputWrapper>
          <SSearchInput placeholder='Поиск по артикулу или названию' />
          <SSearchButton>
            <SearchIcon color='#fff' width='22px' height='22px' />
          </SSearchButton>
        </SInputWrapper>
      </Col>
      <Col xs={12} sm={12} md={12} lg={6}>
        <SRightWrapper>
          <SButtonRow>
            <Button onClick={() => setModalId(0)}>Отправить запрос</Button>
            <Button onClick={() => setModalId(1)}>Заказать звонок</Button>
          </SButtonRow>
        </SRightWrapper>
      </Col>
    </Row>
  </Container>
);

export const Header = withHeaderState(HeaderComponent);

const SInputWrapper = styled.div`
  display: flex;
`;

export const SRightWrapper = styled.div`
  margin-top: 10px;
  text-align: right;
`;

const SSearchInput = styled(Input)`
  border-radius: 2px 0 0 2px;
`;

const SSearchButton = styled(Button)`
  display: inline;
  border-radius: 0 2px 2px 0;
  background: ${mainColor};
  border: 1px solid transparent;
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
