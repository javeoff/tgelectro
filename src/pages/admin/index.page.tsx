import { NextPage } from 'next';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import { Table } from '@pages/admin/components/Table/Table';
import { Sidebar } from '@pages/admin/components/Sidebar/Sidebar';
import { IWithAdminPageState, withAdminPageState } from '@pages/admin/hocs/withAdminPageState';
import { ListName } from '@pages/admin/enums/ListName';

interface IProps {
  activeItem?: ListName;
}

const AdminPage: NextPage<IProps & IWithAdminPageState> = ({
  lists,
  activeList,
}) => (
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
            <Table rows={lists[activeList]} />
          </Col>
        </Row>
      </SContent>
    </Container>
  </>
);

export default withAdminPageState(AdminPage);

const SContent = styled.div`
  margin-top: 20px;
`;
const SListGroup = styled.div`
  margin-top: 10px;
`;
