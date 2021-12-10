import { NextPageContext } from 'next';

import { IPageProps } from '@common/types/next/IPageProps';

export interface IPageContext extends Omit<NextPageContext, 'query'> {
  query: IPageProps;
}
