import { FC } from 'react';
import styled from 'styled-components';

import { Link } from '@components/Link/Link';

export interface IBreadcrumb {
  link: string;
  text: string;
}

interface IProps {
  items: IBreadcrumb[];
}

export const Breadcrumbs: FC<IProps> = ({ items }) => (
  <SWrapper>
    {items.map((item, idx) => (
      <>
        <Link href={item.link} key={idx}>
          {item.text}
        </Link>
        {idx !== items.length - 1 && <SSeparator>{'>'}</SSeparator>}
      </>
    ))}
  </SWrapper>
);

const SWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const SSeparator = styled.div`
  margin: 0 5px;
`;
