import { NextPage } from 'next';

import { IndexComponent } from '@components/Index/IndexComponent';

const IndexPage: NextPage = () => <IndexComponent />;

// IndexPage.getInitialProps = () => ({
//   title: `Главная страница - ${siteName}`,
// });

export default IndexPage;
