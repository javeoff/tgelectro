import styled from 'styled-components';
import { NextPage } from 'next';
import { Container } from 'reactstrap';

import { Header } from '@components/Header/Header';
import { Navbar } from '@components/Navbar/Navbar';
import { categories } from 'src/data/categories';
import { Footer } from '@components/Footer/Footer';
import { menuItems } from 'src/data/menuItems';
import { siteName } from 'src/data/common';
import { Advantages } from '@components/Advantages/Advantages';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PartnersSlider } from '@components/PartnersSlider/PartnersSlider';
import { Feedback } from '@components/Feedback/Feedback';

const pageIdx = 5;

const AboutPage: NextPage = () => (
  <>
    <SHeader>
      <Header />
    </SHeader>
    <SNavbar>
      <Navbar menuItems={menuItems} activeItemIdx={pageIdx} />
    </SNavbar>
    <SSection>
      <SWrapper>
        <Container>
          <h2>Надежный партнер Вашего Бизнеса</h2>
          <SContent>
            <div>
              Мы берем на себя решение задачи поставок любых запчастей или
              расходников из Европы, США, Японии, Кореи, Африки и даже Австралии
              с максимальной выгодой для клиента. Мы уже заключили контракты с
              производителями, принципиально не работаем с посредниками, поэтому
              у нас обычно дешевле.
            </div>
          </SContent>
        </Container>
      </SWrapper>
    </SSection>
    <SSection>
      <Advantages title={`Почему стоит выбрать ${siteName}`} />
    </SSection>
    <SSection>
      <SWrapper>
        <Container>
          <h2>Наши партнеры</h2>
          <PartnersSlider />
        </Container>
      </SWrapper>
    </SSection>
    <Feedback />
    <div>
      <Footer categories={categories} />
    </div>
  </>
);

AboutPage.getInitialProps = () => ({
  title: `${menuItems[pageIdx].title} - ${siteName}`,
});

export default AboutPage;

const SNavbar = styled.div`
  margin-top: 20px;
`;
const SHeader = styled.div`
  margin-top: 20px;
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
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
  margin-top: 30px;
  text-align: left;

  & div {
    margin-top: 10px;
  }
`;
