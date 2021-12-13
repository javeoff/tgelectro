import styled from 'styled-components';
import { NextPage } from 'next';
import { Container } from 'reactstrap';

import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { menuItems } from '@common/utils/menuItems';
import { siteName } from '@common/utils/constants';
import { Advantages } from '@components/Advantages/Advantages';

const pageIdx = 4;

const ForSuppliersPage: NextPage = () => (
  <>
    <SHeader>
      <Header />
    </SHeader>
    <SSection>
      <SWrapper>
        <Container>
          <h2>Поставщикам</h2>
          <SContent>
            <div>
              Мы работаем с поставщиками по всему миру и в карте наших поставок
              более 1500 производителей.
            </div>
            <div>
              Наша команда нацелена на привлечение новых поставщиков
              промышленного электронного оборудования, и проработку
              взаимовыгодных отношений с официальными дистрибьюторами разных
              брендов.
            </div>
            <div>
              Готовы дать объемы поставок и возможность бесплатного размещения
              рекламы Вашей продукции на нашем сайте, на условиях получения
              уникальных предложений от Вас.
            </div>
          </SContent>
        </Container>
      </SWrapper>
    </SSection>
    <SSection>
      <Advantages title={`Почему стоит выбрать ${siteName}`} />
    </SSection>
    <SFooter>
      <Footer />
    </SFooter>
  </>
);

ForSuppliersPage.getInitialProps = () => ({
  title: `${menuItems[pageIdx].title} - ${siteName}`,
});

export default ForSuppliersPage;

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
  margin-top: 30px;
  text-align: left;

  & div {
    margin-top: 10px;
  }
`;
