import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import { Primitive } from 'type-fest';

import { Input } from '@components/Input/Input';
import { Button } from '@components/Button/Button';
import {
  editItemTranslation,
  fieldTypeTranslation,
} from '@pages/admin/utils/translation';
import { Sidebar } from '@pages/admin/components/Sidebar/Sidebar';
import { CreateItemRequest } from '@server/Admin/dto/CreateItemRequest';
import { createAdminPageApi } from '@pages/admin/api/CreateAdminPageApi';
import { ListName } from '@pages/admin/enums/ListName';
import {
  IWithCreateAdminPageState,
  withCreateAdminPageState,
} from '@pages/admin/hocs/withCreateAdminPageState';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { Category } from '@server/Categories/entities/category.entity';

interface IProps {
  type?: ListName;
}

const CreatePage: NextPage<IProps & IWithCreateAdminPageState> = ({
  type,
  addPopup,
}) => {
  const getInitialValuesState = (): Record<string, Primitive> => {
    switch (type) {
      case 'products':
        return {
          vendor: '',
          alternativeVendor: '',
          category: '',
          fabricator: '',
          imageUrl: '',
          description: '',
          price: 0,
        };
      case 'categories':
        return {
          name: '',
          link: '',
        };
      case 'fabricators':
        return {
          name: '',
          imageUrl: '',
          link: '',
        };
      default:
        throw new Error('Ошибка. Неизвестный тип сущности');
    }
  };

  const [valuesState, setValuesState] = useState<
    Record<string, Primitive | Category | Fabricator>
  >(getInitialValuesState());
  const router = useRouter();

  if (!type) {
    return null;
  }

  const onInputChange = (value: string, valuesKey: string): void => {
    void setValuesState({
      ...valuesState,
      [valuesKey]: value,
    });
  };

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

    try {
      valuesState.category = await createAdminPageApi
        .getCategory((valuesState.category as string) || '')
    } catch {
      addPopup({
        title: 'Ошибка создания',
        description: 'Категория не найдена',
      });

      return;
    }

    try {
      valuesState.fabricator = await createAdminPageApi.getFabricator(
        (valuesState.fabricator as string) || '',
      );
    } catch {
      addPopup({
        title: 'Ошибка создания',
        description: 'Производитель не найден',
      });

      return;
    }

    const request = new CreateItemRequest();

    request.itemType = type;
    request.item = valuesState;

    await createAdminPageApi.createItem({
      itemType: type,
      item: valuesState,
    });

    router.back();
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
            <SFormWrapper>
              {valuesState &&
                Object.keys(valuesState).map((key, idx) => (
                  <SInput key={idx}>
                    <div>
                      {fieldTypeTranslation[key]} {editItemTranslation[type]}
                    </div>
                    <Input
                      disabled={key === 'id'}
                      isFluid={true}
                      defaultValue={String(valuesState[key])}
                      onChange={(e) =>
                        onInputChange(e.currentTarget.value, key)
                      }
                    />
                  </SInput>
                ))}
              <Button onClick={onSaveData}>Сохранить данные</Button>
            </SFormWrapper>
          </Col>
        </Row>
      </SContent>
    </Container>
  );
};

export default withCreateAdminPageState(CreatePage);

const SFormWrapper = styled.div`
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
const SInput = styled.div`
  margin-top: 10px;
`;
