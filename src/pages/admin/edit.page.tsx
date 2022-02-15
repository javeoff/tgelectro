import { NextPage } from 'next';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import { editItemTranslation } from '@pages/admin/utils/translation';
import { Sidebar } from '@pages/admin/components/Sidebar/Sidebar';
import {
  IWithEditAdminPageState,
  withEditAdminPageState,
} from '@pages/admin/hocs/withEditAdminPageState';
import { InputForm } from '@pages/admin/components/InputForm/InputForm';
import { ListName } from '@pages/admin/enums/ListName';
import { useForm } from '@pages/admin/hooks/useForm';
import { Logo } from '@components/Logo/Logo';
import { TValuesState } from '@pages/admin/types/TValuesState';

interface IProps {
  type: ListName;
  id: string;
  item: TValuesState;
}

const EditPage: NextPage<IProps & IWithEditAdminPageState> = ({
  id,
  type,
  item,
  addPopup,
}) => {
  // eslint-disable-next-line no-console
  console.log(item);

  const { valuesState, setValuesState, saveForm } = useForm({
    addPopup,
    itemType: type,
    initialValuesState: item,
  });

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
            <h1>Редактирование {editItemTranslation[type]}</h1>
            <SInputForm>
              <InputForm
                setValuesState={setValuesState}
                valuesState={valuesState}
                saveForm={() => saveForm(Number(id) as unknown as number)}
                type={type}
              />
            </SInputForm>
          </Col>
        </Row>
      </SContent>
    </Container>
  );
};

export default withEditAdminPageState(EditPage);

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
