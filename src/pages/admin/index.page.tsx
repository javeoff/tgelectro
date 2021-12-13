import { NextPage } from 'next';
import { Container } from 'reactstrap';
import styled from 'styled-components';

import { Input } from '@components/Input/Input';
import { siteName } from '@common/utils/constants';
import { Button } from '@components/Button/Button';

const AdminPage: NextPage = () => (
  <SWrapper>
    <Container>
      <SContent>
        <h1>Админ панель {siteName}</h1>
        <SInput>
          <Input isFluid={true} type='text' placeholder='Ваш логин' />
        </SInput>
        <SInput>
          <Input isFluid={true} type='password' placeholder='Ваш пароль' />
        </SInput>
        <SButton>
          <Button isFluid={true}>Войти</Button>
        </SButton>
      </SContent>
    </Container>
  </SWrapper>
);

const SInput = styled.div`
  margin-top: 20px;
`;
const SWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;
const SContent = styled.div`
  min-height: 400px;
`;
const SButton = styled.div`
  margin-top: 30px;
`;

export default AdminPage;
