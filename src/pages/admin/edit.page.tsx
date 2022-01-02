import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import { editItemTranslation } from '@pages/admin/utils/translation';
import { Sidebar } from '@pages/admin/components/Sidebar/Sidebar';
import { editAdminPageApi } from '@pages/admin/api/EditAdminPageApi';
import { SaveItemRequest } from '@server/Admin/dto/SaveItemRequest';
import {
  IWithEditAdminPageState,
  withEditAdminPageState,
} from '@pages/admin/hocs/withEditAdminPageState';
import { InputForm } from '@pages/admin/components/InputForm/InputForm';
import { ListName } from '@pages/admin/enums/ListName';

interface IProps {
  type?: ListName;
  id?: string;
  item: Record<string, string>;
}

const EditPage: NextPage<IProps & IWithEditAdminPageState> = ({
  type,
  id,
  item,
  addPopup,
}) => {
  const [valuesState, setValuesState] = useState(item);
  const router = useRouter();

  if (!item || !type || !id) {
    return null;
  }

  const onSaveData = async (): Promise<void> => {
    const request = new SaveItemRequest();

    request.item = {};

    if ('category' in valuesState && 'fabricator' in valuesState) {
      try {
        request.item.category = await editAdminPageApi.getCategory(
          String(valuesState.category) || '',
        );

        request.item.fabricator = await editAdminPageApi.getFabricator(
          String(valuesState.fabricator) || '',
        );
      } catch (error) {
        if (error instanceof Error) {
          addPopup({
            title: 'Ошибка создания',
            description: error.message,
          });

          return;
        }
      }
    }

    request.itemType = type;
    request.id = id;
    request.item = { ...valuesState, ...request.item };

    await editAdminPageApi.saveItem(request);
    await router.push(`/admin?activeItem=${type}`);
  };

  return (
    <Container>
      <h1>Редактирование {editItemTranslation[type]}</h1>
      <SContent>
        <Row>
          <Col md={4} sm={6} xs={12} lg={3}>
            <SListGroup>
              <Sidebar redirect={true} />
            </SListGroup>
          </Col>
          <Col>
            <SInputForm>
              <InputForm
                setValuesState={setValuesState}
                valuesState={valuesState}
                onSaveData={onSaveData}
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
