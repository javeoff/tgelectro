import { IPageProps } from '@common/types/next/IPageProps';
import { IPageContext } from '@common/types/next/IPageContext';
import { IS_SERVER } from '@common/utils/constants';
import { IResponse } from '@common/api/types/IResponse';

export const getPageProps = async (ctx: IPageContext): Promise<IPageProps> => {
  if (IS_SERVER) {
    return ctx.query;
  }

  if (!ctx.asPath) {
    return {};
  }

  const response = await fetch(`${ctx.asPath}?api=true`);
  const pageProps: IResponse = await response.json();

  return pageProps.payload as IPageProps;
};