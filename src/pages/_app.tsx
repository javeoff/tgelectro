import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { FC } from 'react';
import { Provider } from 'react-redux';

import { store } from '@common/redux/store';
import { Modal } from '@components/Modal/Modal';
import { getPageProps } from '@common/utils/getPageProps';
import { IAppProps } from '@common/types/next/IAppProps';
import { IAppContext } from '@common/types/next/IAppContext';
import { IAppInitialProps } from '@common/types/next/IAppInitialProps';

type INextApp = FC<IAppProps> & {
  getInitialProps?(context: IAppContext): Promise<IAppInitialProps>;
};

const App: INextApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Head>
      <title>{pageProps.title}</title>
      <style>{pageProps.style}</style>
    </Head>
    <Modal />
    <Component {...pageProps} />
  </Provider>
);

App.getInitialProps = async ({ ctx, Component }) => {
  const appProps = await getPageProps(ctx);

  if (Component.getInitialProps) {
    return {
      pageProps: { ...appProps, ...(await Component.getInitialProps(ctx)) },
    };
  }

  return {
    pageProps: appProps,
  };
};

export default App;
