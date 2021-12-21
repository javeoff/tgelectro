import { NextPage } from 'next';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import { Table } from '@pages/admin/components/Table/Table';
import { Sidebar } from '@pages/admin/components/Sidebar/Sidebar';
import {
  IWithAdminPageState,
  withAdminPageState,
} from '@pages/admin/hocs/withAdminPageState';
import { IRow } from '@pages/admin/components/Table/types/IRow';

const AdminPage: NextPage<IWithAdminPageState> = ({
  lists,
  setLists,
  activeList,
}) => {
  const setRows = (rows: IRow[]): void => {
    setLists({ ...lists, [activeList]: rows });
  };

  return (
    <>
      <Container>
        <h1>Admin page</h1>
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

const SContent = styled.div`
  margin-top: 20px;
`;
const SListGroup = styled.div`
  margin-top: 10px;
`;
