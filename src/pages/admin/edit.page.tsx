import { NextPage } from 'next';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import convertToUrl from 'transliterate-cyrillic-text-to-latin-url';

import { Input } from '@components/Input/Input';
import { Button } from '@components/Button/Button';
import {
  editItemTranslation,
  fieldTypeTranslation,
} from '@pages/admin/utils/translation';
import { Sidebar } from '@pages/admin/components/Sidebar/Sidebar';
import { editAdminPageApi } from '@pages/admin/api/EditAdminPageApi';
import { SaveItemRequest } from '@server/Admin/dto/SaveItemRequest';
import { TItemType } from '@server/Admin/types/TItemType';
import { IProduct } from '@server/Products/types/IProduct';
import { IFabricator } from '@server/Fabricators/types/IFabricator';
import { ICategory } from '@server/Categories/types/ICategory';
import {
  IWithEditAdminPageState,
  withEditAdminPageState,
} from '@pages/admin/hocs/withEditAdminPageState';

interface IProps {
  type?: TItemType;
  id?: string;
  item: IProduct | ICategory | IFabricator;
}

const EditPage: NextPage<IProps & IWithEditAdminPageState> = ({
  type,
  id,
  item,
  addPopup,
}) => {
  const [valuesState, setValuesState] = useState(item);
  const router = useRouter();
  const linkIsAutoEditable = useRef(true);

  if (!item || !type || !id) {
    return null;
  }

  const onInputChange = (value: string, valuesKey: string): void => {
    if (
      value !== '' &&
      !('price' in valuesState) &&
      valuesKey === 'name' &&
      linkIsAutoEditable.current
    ) {
      void setValuesState({
        ...valuesState,
        link: convertToUrl(value),
        name: value,
      });

      return;
    }

    void setValuesState({
      ...valuesState,
      [valuesKey]: value,
    });
  };

  const onSaveData = async (): Promise<void> => {
    const request = new SaveItemRequest();

    if ('category' in valuesState) {
      try {
        valuesState.category = await editAdminPageApi.getCategory(
          String(valuesState.category.id) || '',
        );
      } catch {
        addPopup({
          title: 'Ошибка создания',
          description: 'Категория не найдена',
        });

        return;
      }
    }

    if ('fabricator' in valuesState) {
      try {
        valuesState.fabricator = await editAdminPageApi.getFabricator(
          String(valuesState.fabricator.id) || '',
        );
      } catch {
        addPopup({
          title: 'Ошибка создания',
          description: 'Производитель не найден',
        });

        return;
      }
    }

    request.itemType = type;
    request.id = id;
    request.item = valuesState;

    await editAdminPageApi.saveItem(request);
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
                    {key === 'fabricator' || key === 'category' ? (
                      <Input
                        disabled={false}
                        isFluid={true}
                        defaultValue={(valuesState as IProduct)[key]?.id}
                        onChange={(e) =>
                          onInputChange(
                            {
                              ...valuesState[key],
                              id: e.currentTarget.value,
                            },
                            key,
                          )
                        }
                      />
                    ) : (
                      <Input
                        disabled={key === 'id'}
                        isFluid={true}
                        value={valuesState[key]}
                        onChange={(e) =>
                          onInputChange(e.currentTarget.value, key)
                        }
                        onBlur={(e) => {
                          // eslint-disable-next-line no-console
                          console.log(
                            key === 'link',
                            e.currentTarget.value === '',
                          );
                          if (key === 'link' && e.currentTarget.value === '') {
                            linkIsAutoEditable.current = true;
                          }

                          if (key === 'name') {
                            linkIsAutoEditable.current = false;
                          }
                        }}
                      />
                    )}
                  </SInput>
                ))}
              <Button onClick={onSaveData}>Сохранить данные</Button>
              {JSON.stringify(item, null, 2)}
            </SFormWrapper>
          </Col>
        </Row>
      </SContent>
    </Container>
  );
};

export default withEditAdminPageState(EditPage);

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
