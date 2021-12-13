import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';

import { mainColor } from '@common/utils/colors';
import {
  IWithCategoriesState,
  withCategoriesState,
} from '@components/Categories/hocs/withCategoriesState';

const CategoriesComponent: FC<IWithCategoriesState> = ({ categories }) => {
  const splitCount = 18;
  const columnCount = 4;

  return (
    <div>
      <SCategoryList>
        <Row>
          {Array.from({ length: columnCount })
            .fill(null)
            .map((_, columnIdx) => (
              <Col key={columnIdx} lg={4} md={12}>
                {categories.map(({ name, link }, idx) =>
                  idx < splitCount * (columnIdx + 1) &&
                  idx >= splitCount * columnIdx ? (
                    <Link key={idx} href={link}>
                      {name}
                    </Link>
                  ) : null,
                )}
              </Col>
            ))}
        </Row>
      </SCategoryList>
    </div>
  );
};

export const Categories = withCategoriesState(CategoriesComponent);

const SCategoryList = styled.div`
  margin-top: 30px;

  & a {
    width: fit-content;
    margin-top: 5px;
    display: block;
    font-size: inherit;
    text-decoration: none;
    color: inherit;
  }

  & a:hover {
    cursor: pointer;
    color: ${mainColor};
  }
`;
