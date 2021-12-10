import { NextPageContext } from 'next';

import { IPageProps } from '@common/types/next/IPageProps';

export type INextPageContext = NextPageContext & {
  query: IPageProps;
};
