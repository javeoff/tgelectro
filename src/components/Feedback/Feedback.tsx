import { FC } from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import Image from 'next/image';

import { boxColor } from '@common/utils/colors';
import ConsultantImg from '@assets/img/consultant.png';
import { Form } from '@components/Form/Form';

interface IProps {
  initialValue?: string;
}

export const Feedback: FC<IProps> = ({ initialValue }) => (
  <SWrapper>
    <Container>
      <SFlex>
        <SContent>
          <h2>Узнайте стоимость прямо сейчас</h2>

          <SFeedbackDescription>
            Отправьте заявку и мы ответим в течение 15 минут
          </SFeedbackDescription>

          <SForm>
            <Form
              defaultDescriptionInputValue={initialValue}
              showInputs={{
                description: true,
                phone: true,
                email: true,
              }}
            />
          </SForm>
        </SContent>
        <SConsultant>
          <Image src={ConsultantImg} alt='consultant' />
        </SConsultant>
      </SFlex>
    </Container>
  </SWrapper>
);

const SWrapper = styled.div`
  overflow: hidden;
  padding: 50px 0;
  background: ${boxColor};

  & h2 {
    max-width: 350px;
    width: 100%;
  }
`;
const SContent = styled.div`
  width: 400px;
`;

const SConsultant = styled.div`
  margin-top: -80px;
  width: 100%;
  max-width: 500px;
  height: 500px;

  @media screen and (max-width: 993px) {
    display: none;
  }
`;

const SFeedbackDescription = styled.div`
  font-size: 1.2em;
  max-width: 290px;
  width: 100%;
`;

const SForm = styled.div`
  margin-top: 20px;
`;

const SFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;
