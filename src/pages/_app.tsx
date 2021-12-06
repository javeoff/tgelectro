import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { ComponentType, FC } from 'react';
import { AppProps } from 'next/app';
import { NextPage, NextPageContext } from 'next';
import { Provider } from 'react-redux';

import { store } from '@common/redux/store';
import { Modal } from '@components/Modal/Modal';

export interface IPageProps {
  title?: string;
  style?: string;
}

export interface IAppInitialProps {
  pageProps: IPageProps;
}

export type IBaseNextPage<
  Props = Record<string, unknown>,
  PageProps = IPageProps & Props,
> = ComponentType<PageProps> &
  Omit<NextPage<PageProps>, 'getInitialProps'> & {
    withoutLayout?: boolean;
  } & {
    getInitialProps?(
      context: NextPageContext,
    ): Partial<PageProps> | Promise<Partial<PageProps>>;
  };

export type IAppProps = Omit<AppProps, 'pageProps' | 'Component'> &
  IAppInitialProps & {
    Component: IBaseNextPage;
  };

const App: FC<IAppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Head>
      <title>{pageProps.title}</title>
      <style>{pageProps.style}</style>
    </Head>
    <Modal />
    <Component {...pageProps} />
  </Provider>
);

export default App;
