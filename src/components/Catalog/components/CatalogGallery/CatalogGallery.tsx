import { FC } from 'react';
import styled from 'styled-components';
import { Card, Col, Row } from 'reactstrap';
import { useRouter } from 'next/router';

import { mainColor } from '@common/utils/colors';
import { Button } from '@components/Button/Button';
import { getFabricatorImageUrl } from '@common/utils/getFabricatorImageUrl';
import {
  IWithCatalogGalleryState,
  withCatalogGalleryState,
} from '@components/Catalog/components/CatalogGallery/hocs/withCatalogGalleryState';

interface IItem {
  imageUrl: string;
  link: string;
  name?: string;
}

export interface ICatalogGalleryProps {
  showTitle?: boolean;
  items: IItem[];
  onLoadMoreItems?(): void;
  canExpand?: boolean;
}

const CatalogGalleryComponent: FC<
  ICatalogGalleryProps & IWithCatalogGalleryState
> = ({
  items,
  showTitle = false,
  onLoadMoreItems,
  canExpand = false,
  openOrderModal,
}) => {
  const router = useRouter();

  return (
    <Row>
      {items.map(({ link, name, imageUrl }, idx) => (
        <SCol
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2}
          key={idx}
          onClick={() => (link ? router.push(link) : openOrderModal())}
        >
          <Card>
            {name && (
              <img src={getFabricatorImageUrl(imageUrl)} alt={`${name}-${idx}`} />
            )}
          </Card>
          {showTitle && <STitle>{name}</STitle>}
        </SCol>
      ))}
      {canExpand && <Button onClick={onLoadMoreItems}>Загрузить больше</Button>}
    </Row>
  );
};

export const CatalogGallery = withCatalogGalleryState(CatalogGalleryComponent);

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
