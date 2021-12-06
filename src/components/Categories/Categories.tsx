import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';

import { ICategory } from '@common/types/ICategory';
import { mainColor } from '@common/utils/colors';

export interface ICategoriesProps {
  categories: ICategory[];
}

export const Categories: FC<ICategoriesProps> = ({ categories }) => {
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
