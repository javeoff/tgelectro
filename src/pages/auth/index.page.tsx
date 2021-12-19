import { NextPage } from 'next';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/router';

import { Input } from '@components/Input/Input';
import { siteName } from '@common/utils/constants';
import { Button } from '@components/Button/Button';
import { apiAuth } from '@pages/auth/api/ApiAuth';
import {
  IWithAuthPageState,
  withAuthPageState,
} from '@pages/auth/hocs/withAuthPageState';

const AuthPage: NextPage<IWithAuthPageState> = ({ addPopup }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<{ login: string; password: string }>(
    {
      login: '',
      password: '',
    },
  );

  const onLogin = async (): Promise<void> => {
    if (!formData.password || !formData.login) {
      addPopup({
        title: 'Ошибка авторизации',
        description: 'Проверьте, ввели ли вы логин и пароль в поля',
      });

      return;
    }

    try {
      await apiAuth.login(formData);

      await router.push('/admin');
    } catch (error) {
      addPopup({
        title: 'Ошибка авторизации',
        description: (error as Error).message,
      });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const onEnterPress = async (
    e: KeyboardEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e.key === 'Enter') {
      e.preventDefault();

      await onLogin();
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
              onKeyPress={onEnterPress}
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
              onKeyPress={onEnterPress}
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

export default withAuthPageState(AuthPage);
