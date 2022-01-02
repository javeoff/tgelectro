import { FC, useState } from 'react';
import styled from 'styled-components';

import { filterFabricators } from '@pages/index/components/Catalog/utils/filterFabricators';
import { CatalogGallery } from '@pages/index/components/Catalog/components/CatalogGallery/CatalogGallery';
import { AlphabetRange } from '@pages/index/components/Catalog/components/AlphabetRange/AlphabetRange';
import { range } from '@pages/index/components/Catalog/components/AlphabetRange/utils/range';
import {
  IWithCatalogState,
  withCatalogState,
} from '@pages/index/components/Catalog/hocs/withCatalogState';

const CatalogComponent: FC<IWithCatalogState> = ({ fabricators }) => {
  const [activeRangeIdx, setActiveRangeIdx] = useState<number>(0);
  const filteredFabricators = filterFabricators(
    fabricators,
    range[activeRangeIdx],
  );

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
        <CatalogGallery items={filteredFabricators} />
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
