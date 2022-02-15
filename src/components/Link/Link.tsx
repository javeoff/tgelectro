import { FC } from 'react';
import styled from 'styled-components';
import LinkComponent from 'next/link';
import { LinkProps } from 'next/dist/client/link';

import { mainColor } from '@common/utils/colors';

export const Link: FC<LinkProps> = ({ children, ...props }) => (
  <SLink>
    <LinkComponent {...props}>{children}</LinkComponent>
  </SLink>
);

const SLink = styled.div`
  & a {
    text-decoration: none;
    color: ${mainColor};

    &:hover {
      text-decoration: underline;
    }
  }
`;
