import { NextPageContext } from 'next';

import { IBasePageResponse } from '@common/types/next/IBasePageResponse';

export type INextPageContext = NextPageContext & {
  query: IBasePageResponse;
};
