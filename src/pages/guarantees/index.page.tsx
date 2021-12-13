import styled from 'styled-components';
import { NextPage } from 'next';
import { Container } from 'reactstrap';

import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { menuItems } from '@common/utils/menuItems';
import { siteName } from '@common/utils/constants';

const pageIdx = 3;

const GuaranteesPage: NextPage = () => (
  <>
    <SHeader>
      <Header />
    </SHeader>
    <SSection>
      <SWrapper>
        <Container>
          <h1>Гарантийные обязательства</h1>
          <SContent>
            <h2>1. Связь с менеджером</h2>
            <div>
              Напишите вашему менеджеру или обратитесь к дежурному специалисту
              через форму на сайте. Расскажите о проблеме, с которой вы
              столкнулись.
            </div>
            <h2>2. Составление акта</h2>
            <div>
              После получения вашего запроса и обсуждения деталей будет
              составлен акт. Скажите менеджеру, как именно вам будет удобно
              отправить нам товар на диагностику.
            </div>
            <h2>3. Результаты диагностики</h2>
            <div>
              При мелкой неисправности — отремонтируем бесплатно. В случае
              заводского брака — отправим оборудование производителю или
              поставщику либо заменим Ваш товар. Если оборудование исправно —
              предоставим заключение диагностов, поможем в устранении неполадок
              или подключении.
            </div>
          </SContent>
        </Container>
      </SWrapper>
    </SSection>
    <SFooter>
      <Footer />
    </SFooter>
  </>
);

GuaranteesPage.getInitialProps = () => ({
  title: `${menuItems[pageIdx].title} - ${siteName}`,
});

export default GuaranteesPage;

const SHeader = styled.div`
  margin-top: 20px;
`;
const SFooter = styled.div`
  margin-top: 50px;
`;
const SSection = styled.div`
  margin: 50px 0;
`;
const SWrapper = styled.div`
  text-align: center;
  margin-top: 30px;

  & > div {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
const SContent = styled.div`
  text-align: left;

  & h2 {
    margin-top: 30px;
  }
`;
