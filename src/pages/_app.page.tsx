import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { FC } from 'react';

import { wrapper } from '@common/redux/store';
import { Modal } from '@components/Modal/Modal';
import { getPageProps } from '@common/utils/getPageProps';
import { IAppContext } from '@common/types/next/IAppContext';
import { IAppInitialProps } from '@common/types/next/IAppInitialProps';
import { IAppProps } from '@common/types/next/IAppProps';
import { setFeaturesState } from '@common/redux/utils/setFeaturesState';

type INextApp = FC<IAppProps> & {
  getInitialProps?(context: IAppContext): Promise<IAppInitialProps>;
};

const App: INextApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>{pageProps.title}</title>
      <style>{pageProps.style}</style>
    </Head>
    <Modal />
    <Component {...pageProps} />
  </>
);

App.getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
  const { Component, ctx } = context as IAppContext;

  const appProps = await getPageProps(ctx);

  setFeaturesState(appProps, store);

  if (Component.getInitialProps) {
    const pageProps = await Component.getInitialProps(ctx);

    return {
      pageProps: { ...appProps, ...pageProps },
    };
  }

  return {
    pageProps: appProps,
  };
});

export default wrapper.withRedux(App);
