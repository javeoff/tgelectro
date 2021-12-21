import { NextPage } from 'next';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import qs from 'qs';

import { Table } from '@pages/admin/components/Table/Table';
import { Sidebar } from '@pages/admin/components/Sidebar/Sidebar';
import {
  IWithAdminPageState,
  withAdminPageState,
} from '@pages/admin/hocs/withAdminPageState';
import { IRow } from '@pages/admin/components/Table/types/IRow';
import { Button } from '@components/Button/Button';

const AdminPage: NextPage<IWithAdminPageState> = ({
  lists,
  setLists,
  activeList,
}) => {
  const router = useRouter();
  const setRows = (rows: IRow[]): void => {
    setLists({ ...lists, [activeList]: rows });
  };

  return (
    <>
      <Container>
        <SRow>
          <h1>Admin page</h1>
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
            <Col md={4} sm={6} xs={12} lg={3}>
              <SListGroup>
                <Sidebar />
              </SListGroup>
            </Col>
            <Col>
              <Table
                rows={lists[activeList]}
                setRows={setRows}
                activeList={activeList}
              />
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
`;
const SContent = styled.div`
  margin-top: 20px;
`;
const SListGroup = styled.div`
  margin-top: 10px;
`;
