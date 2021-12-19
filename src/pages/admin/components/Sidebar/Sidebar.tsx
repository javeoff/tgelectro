import { Badge, ListGroup, ListGroupItem } from 'reactstrap';
import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { ListName } from '@pages/admin/enums/ListName';
import { IWithSidebarState, withSidebarState } from '@pages/admin/components/Sidebar/hocs/withSidebarState';

const sidebarState = [
  {
    name: 'Категории',
    listType: ListName.CATEGORIES,
  },
  {
    name: 'Товары',
    listType: ListName.PRODUCTS,
  },
  {
    name: 'Производители',
    listType: ListName.FABRICATORS,
  },
];

interface IProps {
  redirect?: boolean;
}

const SidebarComponent: FC<IProps & IWithSidebarState> = ({
  redirect = false,
  setActiveList,
  activeList,
  listLengths,
}): ReactElement => {
  const router = useRouter();

  return (
    <ListGroup>
      {sidebarState.map(({ name, listType }, idx) => (
        <SListGroupItem key={idx}>
          <ListGroupItem
            action={false}
            onClick={async () => {
              if (redirect) {
                await router.push(`/admin?activeItem=${listType}`);

                return;
              }

              setActiveList(listType);
            }}
            active={activeList === listType}
            tag='a'
          >
            {name}{' '}
            {listLengths[listType] && <Badge>{listLengths[listType]}</Badge>}
          </ListGroupItem>
        </SListGroupItem>
      ))}
    </ListGroup>
  );
};

export const Sidebar = withSidebarState(SidebarComponent);

const SListGroupItem = styled.div`
  & a {
    cursor: pointer;
  }
`;
