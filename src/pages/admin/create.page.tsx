import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import { editItemTranslation } from '@pages/admin/utils/translation';
import { Sidebar } from '@pages/admin/components/Sidebar/Sidebar';
import { CreateItemRequest } from '@server/Admin/dto/CreateItemRequest';
import { createAdminPageApi } from '@pages/admin/api/CreateAdminPageApi';
import { ListName } from '@pages/admin/enums/ListName';
import {
  IWithCreateAdminPageState,
  withCreateAdminPageState,
} from '@pages/admin/hocs/withCreateAdminPageState';
import { InputForm } from '@pages/admin/components/InputForm/InputForm';

interface IProps {
  type?: ListName;
}

const CreatePage: NextPage<IProps & IWithCreateAdminPageState> = ({
  type,
  addPopup,
}) => {
  const getInitialValuesState = (): Record<string, string> => {
    switch (type) {
      case 'products':
        return {
          vendor: '',
          alternativeVendor: '',
          category: '',
          fabricator: '',
          imageUrl: '',
          description: '',
          price: '0',
        };
      case 'categories':
        return {
          parentId: '',
          name: '',
          link: '/',
        };
      case 'fabricators':
        return {
          name: '',
          imageUrl: '',
          link: '/',
        };
      default:
        throw new Error('Ошибка. Неизвестный тип сущности');
    }
  };

  const [valuesState, setValuesState] = useState<Record<string, string>>(
    getInitialValuesState(),
  );
  const router = useRouter();

  if (!type) {
    return null;
  }

  const onSaveData = async (): Promise<void> => {
    const values = Object.values(valuesState);

    const isValid = values
      .filter((value) => !['imageUrl'].includes(String(value)))
      .every((value) => String(value) !== '');

    if (!isValid) {
      addPopup({
        title: 'Ошибка создания',
        description: 'Поля заполнены неверно',
      });

      return;
    }

    if (valuesState.category) {
      try {
        const category = await createAdminPageApi.getCategory(
          valuesState.category,
        );

        valuesState.category = String(category.id);
      } catch {
        addPopup({
          title: 'Ошибка создания',
          description: 'Категория не найдена',
        });

        return;
      }
    }

    if (valuesState.fabricator) {
      try {
        const fabricator = await createAdminPageApi.getFabricator(
          valuesState.fabricator || '',
        );

        valuesState.fabricator = String(fabricator.id);
      } catch {
        addPopup({
          title: 'Ошибка создания',
          description: 'Производитель не найден',
        });

        return;
      }
    }

    const request = new CreateItemRequest();

    request.itemType = type;
    request.item = valuesState;

    await createAdminPageApi.createItem({
      itemType: type,
      item: valuesState,
    });

    await router.push(`/admin?activeItem=${type}`);
  };

  return (
    <Container>
      <h1>Создание {editItemTranslation[type]}</h1>
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
