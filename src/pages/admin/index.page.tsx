import { NextPage } from 'next';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useState } from 'react';
import { useDebounce } from 'react-use';

import { Table } from '@pages/admin/components/Table/Table';
import { Sidebar } from '@pages/admin/components/Sidebar/Sidebar';
import {
  IWithAdminPageState,
  withAdminPageState,
} from '@pages/admin/hocs/withAdminPageState';
import { IRow } from '@pages/admin/components/Table/types/IRow';
import { Button } from '@components/Button/Button';
import { adminPageApi } from '@pages/admin/api/AdminPageApi';
import { Input } from '@components/Input/Input';
import { Logo } from '@components/Logo/Logo';

const AdminPage: NextPage<IWithAdminPageState> = ({
  lists,
  setLists,
  activeList,
}) => {
  const router = useRouter();
  const setRows = (rows: IRow[]): void => {
    setLists({ ...lists, [activeList]: rows });
  };

  const [listsOffset, setListsOffset] = useState<Record<string, number>>({});
  const [cacheLists, setCacheLists] = useState<Record<string, IRow[]>>({});

  const loadMoreData = async (): Promise<void> => {
    setRows([
      ...lists[activeList],
      ...(await adminPageApi.getRows(activeList, listsOffset[activeList] || 0)),
    ]);

    if (listsOffset[activeList] === undefined) {
      setListsOffset({ ...listsOffset, [activeList]: 1 });

      return;
    }

    setListsOffset({
      ...listsOffset,
      [activeList]: listsOffset[activeList] + 1,
    });
  };

  const [searchValue, setSearchValue] = useState<string>();

  const onListChange = (): void => {
    setSearchValue('');
    if (cacheLists[activeList]) {
      setRows(cacheLists[activeList]);
    }
  };

  const onSearch = async (): Promise<void> => {
    if (!searchValue && cacheLists[activeList]) {
      setRows(cacheLists[activeList]);

      return;
    }

    if (!searchValue) {
      return;
    }

    const list = await adminPageApi.search(activeList, searchValue);

    if (!list?.length) {
      return;
    }

    setCacheLists({ ...cacheLists, [activeList]: lists[activeList] });
    setRows(list);
  };

  useDebounce(onSearch, 500, [searchValue]);

  return (
    <>
      <Container>
        <SRow>
          <Logo />
          <div>
            <Button
              onClick={async () => {
                await router.push(
                  `admin/create?${qs.stringify({ type: activeList })}`,
                );
              }}
            >
              Создать
            </Button>
          </div>
        </SRow>
        <SContent>
          <Row>
            <Col md={12} sm={12} xs={12} lg={3}>
              <SListGroup>
                <Sidebar onListChange={onListChange} />
              </SListGroup>
            </Col>
            <Col>
              <SSearchInput>
                <Input
                  placeholder='Поиск'
                  isFluid={true}
                  onChange={(e) => setSearchValue(e.currentTarget.value)}
                />
              </SSearchInput>

              <Table
                rows={lists[activeList]}
                setRows={setRows}
                activeList={activeList}
              />

              <Button onClick={loadMoreData}>Загрузить еще</Button>
            </Col>
          </Row>
        </SContent>
      </Container>
    </>
  );
};

export default withAdminPageState(AdminPage);

const SRow = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const SContent = styled.div`
  margin-top: 20px;
`;
const SListGroup = styled.div`
  margin-top: 10px;
`;
const SSearchInput = styled.div`
  margin: 10px 0;
`;
