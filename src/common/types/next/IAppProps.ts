import { AppProps } from 'next/app';

import { IBaseNextPage } from '@common/types/next/IBaseNextPage';
import { IAppInitialProps } from '@common/types/next/IAppInitialProps';

export type IAppProps = Omit<AppProps, 'pageProps' | 'Component'> &
  IAppInitialProps & {
    Component: IBaseNextPage;
  };
