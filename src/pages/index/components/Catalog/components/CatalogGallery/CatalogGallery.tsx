import { FC } from 'react';
import styled from 'styled-components';
import { Card, Col, Row } from 'reactstrap';
import { useRouter } from 'next/router';

import { mainColor } from '@common/utils/colors';

interface IItem {
  imageUrl: string;
  link: string;
  name?: string;
}

export interface ICatalogGalleryProps {
  showTitle?: boolean;
  items: IItem[];
}

export const CatalogGallery: FC<ICatalogGalleryProps> = ({
  items,
  showTitle = false,
}) => {
  const router = useRouter();

  return (
    <Row>
      {items.map(({ imageUrl, link, name }, idx) => (
        <SCol
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2}
          key={idx}
          onClick={() => router.push(link)}
        >
          <Card>
            <img src={imageUrl} alt={`${imageUrl}-${idx}`} />
          </Card>
          {showTitle && <STitle>{name}</STitle>}
        </SCol>
      ))}
    </Row>
  );
};

const STitle = styled.div`
  font-size: 0.9em;
`;
const SCol = styled(Col)`
  cursor: pointer;
  margin: 10px 0;

  &:hover ${STitle} {
    text-decoration: underline;
    color: ${mainColor};
  }
`;
