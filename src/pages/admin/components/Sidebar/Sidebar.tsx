import { Badge, ListGroup, ListGroupItem } from 'reactstrap';
import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { ListName } from '@pages/admin/enums/ListName';
import {
  IWithSidebarState,
  withSidebarState,
} from '@pages/admin/components/Sidebar/hocs/withSidebarState';
import { bgColor, darkColor, mainColor } from '@common/utils/colors';

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
  onListChange?(): void;
}

const SidebarComponent: FC<IProps & IWithSidebarState> = ({
  redirect = false,
  setActiveList,
  activeList,
  listLengths,
  onListChange,
}): ReactElement => {
  const router = useRouter();

  return (
    <ListGroup flush={true}>
      {sidebarState.map(({ name, listType }, idx) => (
        <SListGroupItem key={idx}>
          <ListGroupItem
            action={false}
            onClick={async () => {
              if (onListChange) {
                onListChange();
              }
              setActiveList(listType);

              if (redirect) {
                await router.push(`/admin?activeItem=${listType}`);
              }
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

  & > .active {
    background: #fff;
    color: #000;
    border: 2px solid ${mainColor};
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
  }

  & > a {
    background: #fff;
    color: #000;
  }
`;
