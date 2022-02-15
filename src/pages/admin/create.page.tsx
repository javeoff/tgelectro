import { NextPage } from 'next';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import { editItemTranslation } from '@pages/admin/utils/translation';
import { Sidebar } from '@pages/admin/components/Sidebar/Sidebar';
import { ListName } from '@pages/admin/enums/ListName';
import { IWithCreateAdminPageState, withCreateAdminPageState } from '@pages/admin/hocs/withCreateAdminPageState';
import { InputForm } from '@pages/admin/components/InputForm/InputForm';
import { useForm } from '@pages/admin/hooks/useForm';
import { Logo } from '@components/Logo/Logo';

interface IProps {
  type: ListName;
}

const CreatePage: NextPage<IProps & IWithCreateAdminPageState> = ({
  type,
  addPopup,
}) => {
  const { saveForm, setValuesState, valuesState } = useForm({
    addPopup,
    itemType: type,
  });

  if (!type) {
    return null;
  }

  return (
    <Container>
      <Logo />
      <SContent>
        <Row>
          <Col md={12} sm={12} xs={12} lg={3}>
            <SListGroup>
              <Sidebar redirect={true} />
            </SListGroup>
          </Col>
          <Col>
            <h1>Создание {editItemTranslation[type]}</h1>
            <SInputForm>
              <InputForm
                setValuesState={setValuesState}
                valuesState={valuesState}
                saveForm={saveForm}
                type={type}
              />
            </SInputForm>
          </Col>
        </Row>
      </SContent>
    </Container>
  );
};

export default withCreateAdminPageState(CreatePage);

const SInputForm = styled.div`
  & > * {
    margin-top: 20px;
  }
`;
const SContent = styled.div`
  margin-top: 20px;
`;
const SListGroup = styled.div`
  margin-top: 10px;
`;
