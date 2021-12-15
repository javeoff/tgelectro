import { IPageProps } from '@common/types/next/IPageProps';
import { IPageContext } from '@common/types/next/IPageContext';
import { IS_SERVER } from '@common/utils/constants';
import { IResponse } from '@common/api/types/IResponse';
import { IBasePageResponse } from '@common/types/next/IBasePageResponse';

export const getPageProps = async (
  ctx: IPageContext,
): Promise<IPageProps | IBasePageResponse> => {
  if (IS_SERVER) {
    return ctx.query;
  }

  if (!ctx.asPath) {
    return {};
  }

  const response = await fetch(`/api/page${ctx.asPath}`);
  const pageProps: IResponse = await response.json();

  return pageProps.payload as IPageProps;
};
