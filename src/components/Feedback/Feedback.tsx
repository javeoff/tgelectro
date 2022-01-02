import { FC } from 'react';
import styled from 'styled-components';
import { Col, Container, Row } from 'reactstrap';
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
      <Row>
        <Col>
          <SContent>
            <h2>Узнайте стоимость прямо сейчас</h2>

            <SFeedbackDescription>
              Отправьте заявку и мы ответим в течение 15 минут
            </SFeedbackDescription>

            <SForm>
              <Form
                defaultDescriptionInputValue={initialValue}
                descriptionInput={true}
                phoneInput={true}
                emailInput={true}
              />
            </SForm>
          </SContent>
        </Col>
        <Col>
          <SConsultant>
            <Image src={ConsultantImg} alt='consultant' />
          </SConsultant>
        </Col>
      </Row>
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
  max-width: 500px;
  height: 500px;
`;

const SFeedbackDescription = styled.div`
  font-size: 1.2em;
  max-width: 290px;
  width: 100%;
`;
const SForm = styled.div`
  margin-top: 20px;
`;
