import { FC } from 'react';
import styled from 'styled-components';
import { Card, Col, Row } from 'reactstrap';
import { useRouter } from 'next/router';

import { IFabricator } from '@server/Fabricators/types/IFabricator';

export interface ICatalogGalleryProps {
  fabricators: IFabricator[];
}

export const CatalogGallery: FC<ICatalogGalleryProps> = ({ fabricators }) => {
  const router = useRouter();

  return (
    <Row>
      {fabricators.map(({ imageUrl, link }, idx) => (
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
            <img src={imageUrl} alt={`catalog${idx}`} />
          </Card>
        </SCol>
      ))}
    </Row>
  );
};

const SCol = styled(Col)`
  cursor: pointer;
  margin-top: 10px;
`;
