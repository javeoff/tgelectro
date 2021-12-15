import { NextPage } from 'next';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { Input } from '@components/Input/Input';
import { siteName } from '@common/utils/constants';
import { Button } from '@components/Button/Button';
import { apiAuth } from '@pages/auth/api/ApiAuth';

const AuthPage: NextPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<{ login: string; password: string }>(
    {
      login: '',
      password: '',
    },
  );

  const onLogin = async (): Promise<void> => {
    if (!formData.login || !formData.password) {
      return;
    }

    try {
      // eslint-disable-next-line no-console
      console.log('Авторизация fdfsdf');
      await apiAuth.login(formData);

      // eslint-disable-next-line no-console
      console.log('Авторизация прошла');

      await router.push('/admin');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <SWrapper>
      <Container>
        <SContent>
          <h1>Авторизация в админ панель {siteName}</h1>
          <SInput>
            <Input
              isFluid={true}
              type='text'
              placeholder='Ваш логин'
              defaultValue={formData.login}
              onChange={(event) =>
                setFormData({ ...formData, login: event.currentTarget.value })
              }
            />
          </SInput>
          <SInput>
            <Input
              isFluid={true}
              type='password'
              placeholder='Ваш пароль'
              defaultValue={formData.password}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  password: event.currentTarget.value,
                })
              }
            />
          </SInput>
          <SButton>
            <Button isFluid={true} onClick={onLogin}>
              Войти
            </Button>
          </SButton>
        </SContent>
      </Container>
    </SWrapper>
  );
};

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

export default AuthPage;
