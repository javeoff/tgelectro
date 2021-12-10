import { AppContext } from 'next/app';

import { IBaseNextPage } from '@common/types/next/IBaseNextPage';
import { INextPageContext } from '@common/types/next/INextPageContext';

export interface IAppContext extends Omit<AppContext, 'Component' | 'ctx'> {
  ctx: INextPageContext;
  Component: IBaseNextPage;
}
