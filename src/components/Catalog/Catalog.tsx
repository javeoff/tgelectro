import { FC } from 'react';
import styled from 'styled-components';

import { CatalogGallery } from '@components/Catalog/components/CatalogGallery/CatalogGallery';
import { AlphabetRange } from '@components/Catalog/components/AlphabetRange/AlphabetRange';
import { range } from '@components/Catalog/components/AlphabetRange/utils/range';
import {
  IWithCatalogState,
  withCatalogState,
} from '@components/Catalog/hocs/withCatalogState';
import { useCatalog } from '@components/Catalog/hooks/useCatalog';

const CatalogComponent: FC<IWithCatalogState> = ({ fabricators }) => {
  const {
    catalogItems,
    activeRangeIdx,
    setActiveRangeIdx,
    onLoadMoreItems,
    canExpand,
  } = useCatalog(fabricators);

  return (
    <div>
      <SAlphabetRange>
        <AlphabetRange
          range={range}
          activeRangeIdx={activeRangeIdx}
          onRangeItemClick={setActiveRangeIdx}
        />
      </SAlphabetRange>
      <SWrapper>
        <CatalogGallery
          items={catalogItems}
          onLoadMoreItems={onLoadMoreItems}
          canExpand={canExpand}
        />
      </SWrapper>
    </div>
  );
};

export const Catalog = withCatalogState(CatalogComponent);

const SAlphabetRange = styled.div`
  margin-top: 20px;
`;
const SWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
`;
