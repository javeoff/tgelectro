import { NextPage } from 'next';

import { IndexComponent } from '@components/Index/IndexComponent';
import { siteName } from 'src/data/common';

const IndexPage: NextPage = () => <IndexComponent />;

IndexPage.getInitialProps = () => ({
  title: `Главная страница - ${siteName}`,
});

export default IndexPage;
