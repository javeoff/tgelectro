import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { FC } from 'react';
import MobileDetect from 'mobile-detect';

import { wrapper } from '@common/redux/store';
import { Modal } from '@components/Modal/Modal';
import { getPageProps } from '@common/utils/getPageProps';
import { IAppContext } from '@common/types/next/IAppContext';
import { IAppInitialProps } from '@common/types/next/IAppInitialProps';
import { IAppProps } from '@common/types/next/IAppProps';
import { setFeaturesState } from '@common/redux/utils/setFeaturesState';
import { Popup } from '@components/Popup/Popup';
import { IPageProps } from '@common/types/next/IPageProps';
import { AdaptiveContextProvider } from '@common/contexts/adaptiveContext';

type INextApp = FC<IAppProps> & {
  getInitialProps?(context: IAppContext): Promise<IAppInitialProps>;
};

const App: INextApp = ({ Component, pageProps }) => {
  if (pageProps.isMobile !== undefined) {
    global.isMobile = pageProps.isMobile;
  }

  return (
    <AdaptiveContextProvider>
      <Head>
        <title>{pageProps?.title}</title>
        <style>{pageProps?.style}</style>
      </Head>
      <Popup />
      <Modal />
      <Component {...pageProps} />
    </AdaptiveContextProvider>
  );
};

App.getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
  const { Component, ctx } = context as IAppContext;

  const appProps = await getPageProps(ctx);

  const pageProps = { ...appProps } as IPageProps;

  if (ctx?.req?.headers['user-agent']) {
    const md = new MobileDetect(ctx.req.headers['user-agent']);

    pageProps.isMobile = !!md.mobile();
  }

  setFeaturesState(appProps, store);

  if (Component.getInitialProps) {
    return {
      pageProps: { ...pageProps, ...Component.getInitialProps(ctx) },
    };
  }

  return {
    pageProps,
  };
});

export default wrapper.withRedux(App);
