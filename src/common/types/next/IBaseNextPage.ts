import { ComponentType } from 'react';
import { NextPage } from 'next';

import { IPageProps } from '@common/types/next/IPageProps';
import { INextPageContext } from '@common/types/next/INextPageContext';

export type IBaseNextPage<
  Props = Record<string, unknown>,
  PageProps = IPageProps & Props,
> = ComponentType<PageProps> &
  Omit<NextPage<PageProps>, 'getInitialProps'> & {
    withoutLayout?: boolean;
  } & {
    getInitialProps?(
      context: INextPageContext,
    ): Partial<PageProps> | Promise<Partial<PageProps>>;
  };
