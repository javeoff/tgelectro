import { NextPage } from 'next';
import { Container } from 'reactstrap';
import styled from 'styled-components';

import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { SearchInput } from '@components/SearchInput/SearchInput';
import { ICategory } from '@server/Categories/types/ICategory';
import { IProduct } from '@server/Products/types/IProduct';
import { ProductsTable } from '@components/ProductsTable/ProductsTable';

interface IProps {
  searchQuery: string;
  categories: ICategory[];
  products: IProduct[];
}

const SearchPage: NextPage<IProps> = ({
  searchQuery,
  categories,
  products,
}) => (
  <>
    <SHeader>
      <Header />
    </SHeader>

    <SWrapper>
      <Container>
        <SearchInput searchQuery={searchQuery} />
        <SResult>
          {products.length > 0 && (
            <>
              <b>Найдено товаров: {products.length}</b>
              <ProductsTable products={products} />
            </>
          )}
          {categories.length > 0 && (
            <>
              <b>Найдено категорий: {categories.length}</b>
              <div>
                {categories.map((category, idx) => (
                  <a key={idx} href={category.link}>
                    {category.name}
                  </a>
                ))}
              </div>
            </>
          )}
        </SResult>
      </Container>
    </SWrapper>
    <SFooter>
      <Footer />
    </SFooter>
  </>
);

export default SearchPage;

const SHeader = styled.div`
  margin-top: 20px;
`;

const SWrapper = styled.div`
  margin-top: 20px;
`;

const SFooter = styled.div`
  margin-top: 50px;
`;

const SResult = styled.div`
  margin-top: 20px;
`;
